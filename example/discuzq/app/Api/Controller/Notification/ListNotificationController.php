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

namespace App\Api\Controller\Notification;

use App\Api\Serializer\NotificationSerializer;
use App\Models\Thread;
use App\Models\User;
use App\Repositories\NotificationRepository;
use Discuz\Api\Controller\AbstractListController;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Http\UrlGenerator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListNotificationController extends AbstractListController
{
    use AssertPermissionTrait;

    /**
     * {@inheritdoc}
     */
    public $serializer = NotificationSerializer::class;

    /**
     * @var NotificationRepository
     */
    protected $notifications;

    /**
     * @var UrlGenerator
     */
    protected $url;

    /**
     * @var int|null
     */
    public $notificationCount;

    /**
     * @param NotificationRepository $notifications
     * @param UrlGenerator $url
     */
    public function __construct(NotificationRepository $notifications, UrlGenerator $url)
    {
        $this->notifications = $notifications;
        $this->url = $url;
    }

    /**
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     * @throws \Discuz\Auth\Exception\NotAuthenticatedException
     * @throws \Tobscure\JsonApi\Exception\InvalidParameterException
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $this->assertRegistered($actor);

        $filter = $this->extractFilter($request);
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        $notifications = $this->search($actor, $filter, $limit, $offset);

        $document->addPaginationLinks(
            $this->url->route('notification.list'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $this->notificationCount
        );

        $document->setMeta([
            'total' => $this->notificationCount,
            'pageCount' => ceil($this->notificationCount / $limit),
        ]);

        return $notifications;
    }

    /**
     * @param User $actor
     * @param $filter
     * @param null $limit
     * @param int $offset
     * @return mixed
     */
    public function search(User $actor, $filter, $limit = null, $offset = 0)
    {
        $type = Arr::get($filter, 'type');

        $query = $actor->notifications()
            ->when($type, function ($query, $type) {
                return $query->whereIn('type', explode(',', $type));
            });
        $query->orderBy('created_at', 'desc');

        $this->notificationCount = $limit > 0 ? $query->count() : null;

        $query->skip($offset)->take($limit);

        // type markAsRead
        $actor->unreadNotifications()->whereIn('type', explode(',', $type))->get()->markAsRead();

        $data = $query->get();

        /**
         * ?????? N+1 ??????
         * ????????????&??????
         */
        $this->getThreads($data, $type, $users, $threads);

        /**
         * ????????????????????????
         */
        if ($type != 'system') {
            // ?????????????????????????????????????????????
            $data->map(function ($item) use ($users, $threads, $actor, $type) {
                $user = $users->get(Arr::get($item->data, 'user_id'));
                if (! empty($user)) {
                    $item->user_name = $user->username;
                    $item->user_avatar = $user->avatar;
                    $item->realname = $user->realname;
                }
                // ??????????????????????????????????????????
                if (Arr::has($item->data, 'reply_post_user_id') && Arr::get($item->data, 'reply_post_user_id') != 0) {
                    $replyPostUser = $users->get(Arr::get($item->data, 'reply_post_user_id'));
                    if (! empty($replyPostUser)) {
                        $item->reply_post_user_name = $replyPostUser->username;
                    }
                }

                // ????????????????????????
                if (! empty($threadID = Arr::get($item->data, 'thread_id', 0))) {
                    // ???????????????????????????
                    if (! empty($threads->get($threadID))) {
                        $thread = $threads->get($threadID);
                        $item->thread_type = $thread->type;
                        $item->thread_is_approved = $thread->is_approved;
                        $item->thread_created_at = $thread->formatDate('created_at');
                        $threadUser = $thread->user;
                        if (! empty($threadUser)) {
                            $item->thread_username = $threadUser->username;
                            $item->thread_user_groups = $threadUser->groups->pluck('name')->join(',');
                            /**
                             * ????????????????????????????????????
                             * @var Thread $thread
                             */

                            if (
                                ($thread->type == Thread::TYPE_OF_QUESTION && ! empty($thread->question)) ||
                                $thread->type == Thread::TYPE_OF_TEXT ||
                                $thread->type == Thread::TYPE_OF_LONG ||
                                $thread->type == Thread::TYPE_OF_IMAGE ||
                                $thread->type == Thread::TYPE_OF_GOODS ||
                                $thread->type == Thread::TYPE_OF_VIDEO ||
                                $thread->type == Thread::TYPE_OF_AUDIO
                            ) {
                                // ??????????????????????????????????????????????????????????????????????????????
                                if ($user->id == $thread->user_id && $thread->is_anonymous) {
                                    // ???????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????
                                    if (Str::contains($type, ['questioned', 'rewarded'])) {
                                        $item->user_name = $thread->isAnonymousName();
                                        $item->realname = $thread->isAnonymousName();
                                        $item->user_avatar = '';
                                        $item->isAnonymous = true;
                                    } elseif (Str::contains($type, ['related'])) {
                                        /**
                                         * ??????????????? @?????? ???????????????@?????????????????????????????????????????????????????????@???
                                         * (???????????????????????????@???????????????)
                                         */
                                        $postId = Arr::get($item->data, 'post_id');
                                        if ($postId == $thread->firstPost->id) {
                                            $item->user_name = $thread->isAnonymousName();
                                            $item->realname = $thread->isAnonymousName();
                                            $item->user_avatar = '';
                                            $item->isAnonymous = true;
                                        }
                                    }
                                }
                                // ??????????????????????????????
                                $item->thread_username = $thread->isAnonymousName();
                                $item->thread_user_groups = '';
                            }
                        }
                    }
                }
            });
        } else {
            // ?????????????????????????????????????????????
            $data->map(function ($item) use ($users, $threads, $actor) {
                if (! empty($threadID = Arr::get($item, 'data.raw.thread_id', 0))) {
                    // ???????????????????????????
                    if (! empty($threads->get($threadID))) {
                        $thread = $threads->get($threadID);
                        $item->thread_is_approved = $thread->is_approved;
                        $item->thread_created_at = $thread->formatDate('created_at');
                    }
                }
            });
        }

        return $data;
    }

    /**
     * @param $data
     * @param $type
     * @param $users
     * @param $threads
     */
    protected function getThreads($data, $type, &$users, &$threads)
    {
        if ($type == 'system') {
            $data->where('type', '=', $type);
            $pluck = 'raw.thread_id';
        } else {
            $data->where('type', '<>', $type);
            $pluck = 'thread_id';
        }

        // ???????????????
        $list = $data->pluck('data');

        // ?????? IDs
        $collectList = collect($list);
        $userIds = $collectList->pluck('user_id');
        $replyUserId = $collectList->pluck('reply_post_user_id');
        $userIds = $userIds->merge($replyUserId)->filter()->unique()->values();
        $users = User::query()->whereIn('id', $userIds)->get()->keyBy('id');

        // ?????? ID
        $threadIds = collect($list)->pluck($pluck)->filter()->unique()->values();
        // ????????????????????????????????????
        $with = ['user', 'user.groups', 'firstPost'];
        // ????????? question ??????????????????
        if ($type == 'questioned') {
            array_push($with, 'question');
        }
        $threads = Thread::with($with)->whereIn('id', $threadIds)->get()->keyBy('id');
    }
}
