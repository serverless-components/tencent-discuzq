<?php

/**
 * Copyright (C) 2020 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace App\Listeners\Post;

use App\Commands\RedPacket\CountLikedMakeRedPacket;
use App\Events\Post\Deleted;
use App\Events\Post\Saving;
use App\Notifications\Liked;
use Carbon\Carbon;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Auth\Exception\NotAuthenticatedException;
use Discuz\Auth\Exception\PermissionDeniedException;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;
use Illuminate\Support\Arr;

/**
 * @property Dispatcher events
 */
class SaveLikesToDatabase
{
    /**
     * @var Dispatcher
     */
    protected $bus;

    use AssertPermissionTrait;

    public function __construct(BusDispatcher $bus)
    {
        $this->bus = $bus;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $this->events = $events;
        $events->listen(Saving::class, [$this, 'whenPostIsSaving']);
        $events->listen(Deleted::class, [$this, 'whenPostIsDeleted']);
    }

    /**
     * @param Saving $event
     * @param BusDispatcher $bus
     * @throws NotAuthenticatedException
     * @throws PermissionDeniedException
     */
    public function whenPostIsSaving(Saving $event)
    {
        $post = $event->post;
        $actor = $event->actor;
        $data = $event->data;

        $this->assertRegistered($actor);

        if ($post->exists && isset($data['attributes']['isLiked'])) {
            $this->assertCan($actor, 'like', $post);

            $isLiked = $actor->likedPosts()->where('post_id', $post->id)->exists();

            if ($isLiked) {
                // ???????????? isLiked ??? false ??????????????????
                if (! $data['attributes']['isLiked']) {
                    $actor->likedPosts()->detach($post->id);

                    $post->refreshLikeCount()->save();
                }
            } else {
                // ???????????? isLiked ??? true ??????????????????
                if ($data['attributes']['isLiked']) {
                    $actor->likedPosts()->attach($post->id, ['created_at' => Carbon::now()]);

                    $post->refreshLikeCount()->save();

                    //???????????????????????????
                    $this->bus->dispatch(new CountLikedMakeRedPacket($event->post->thread->user,$event->post->user,$event->actor,$event->post));

                    // ?????????????????????????????????????????????????????????????????????
                    if ($post->user->id != $actor->id) {
                        // Tag ????????????
                        $post->user->notify(new Liked($actor, clone $post));
                    }
                }
            }

            // ?????????????????????
            $actor->refreshUserLiked();
            $actor->save();
        }
    }

    /**
     * @param Deleted $event
     */
    public function whenPostIsDeleted(Deleted $event)
    {
        $event->post->likedUsers()->detach();
    }
}
