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

namespace App\Commands\Users;

use App\Censor\Censor;
use App\Events\Users\Registered;
use App\Events\Users\Saving;
use App\Exceptions\TranslatorException;
use App\Models\Invite;
use App\Models\User;
use App\Validators\UserValidator;
use Carbon\Carbon;
use Discuz\Contracts\Setting\SettingsRepository;
use Discuz\Foundation\EventsDispatchTrait;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;

class RegisterUser
{
    use EventsDispatchTrait;

    /**
     * The user performing the action.
     *
     * @var User
     */
    public $actor;

    /**
     * The attributes of the new user.
     *
     * @var array
     */
    public $data;


    /**
     * @param User $actor The user performing the action.
     * @param array $data The attributes of the new user.
     */
    public function __construct(User $actor, array $data)
    {
        $this->actor = $actor;
        $this->data = $data;
    }

    /**
     * @param Dispatcher $events
     * @param Censor $censor
     * @param SettingsRepository $settings
     * @param UserValidator $validator
     * @return User
     * @throws ValidationException
     * @throws TranslatorException
     */
    public function handle(Dispatcher $events, Censor $censor, SettingsRepository $settings, UserValidator $validator)
    {
        $this->events = $events;

        $password = Arr::get($this->data, 'password');
        $password_confirmation = Arr::get($this->data, 'password_confirmation');

        // check invite code
        if (Arr::has($this->data, 'code')) {
            $code = Arr::get($this->data, 'code');
            if (Invite::lengthByAdmin($code)) {
                if (!$exists = Invite::query()->where('code', Arr::get($this->data, 'code'))->exists()) {
                    throw new DecryptException(trans('user.register_decrypt_code_failed'));
                }
            } else {
                if (!$exists = User::query()->find($code)->exists()) {
                    throw new DecryptException(trans('user.register_decrypt_code_failed'));
                }
            }
        }

        // ???????????????
        $censor->checkText(Arr::get($this->data, 'username'), 'username');

        // ????????????
//        if ($settings->get('register_validate', 'default', false)) {
//            if (!Arr::has($this->data, 'register_reason')) {
//                throw new TranslatorException('setting_fill_register_reason');
//            }
//        }

        $user = User::register(Arr::only($this->data, ['username', 'password', 'register_ip', 'register_port', 'register_reason']));
        // ???????????????(?????????????????????????????????????????????)
        $captcha = '';  // ???????????????????????????
        if ((bool)$settings->get('register_captcha') &&
            (bool)$settings->get('qcloud_captcha', 'qcloud') &&
            ($settings->get('register_type', 'default') != 2)) {
            $captcha = [
                Arr::get($this->data, 'captcha_ticket', ''),
                Arr::get($this->data, 'captcha_rand_str', ''),
                Arr::get($this->data, 'register_ip', ''),
            ];
        }

        // ???????????????????????????????????????
        if ($settings->get('site_mode') == 'pay') {
            $user->expired_at = Carbon::now();
        }
        // ??????????????????????????????????????????
        if ($settings->get('register_validate') || $censor->isMod) {
            $user->status = 2;
        }

        $this->events->dispatch(
            new Saving($user, $this->actor, $this->data)
        );

        // ???????????????????????????????????????????????????????????????????????????(?????????????????????????????????????????????)
        $attrs_to_validate = array_merge($user->getAttributes(), compact('password', 'password_confirmation', 'captcha'));
        if ($password === '') {
            unset($attrs_to_validate['password']);
        }
        unset($attrs_to_validate['register_reason']);
        $validator->valid($attrs_to_validate);

        $user->save();
        $user->raise(new Registered($user, $this->actor, $this->data));

        $this->dispatchEventsFor($user, $this->actor);

        return $user;
    }
}
