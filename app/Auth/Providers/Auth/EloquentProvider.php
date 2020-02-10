<?php

namespace App\Auth\Providers\Auth;
use App\Models\User;

class EloquentProvider implements AuthProviderInterface
{
    public function byCredentials($username, $password)
    {
        if (!$user = User::where('email', $username)->first()) {
            return null;
        }

        if (!password_verify($password, $user->password)) {
            return null;
        }

        return $user;
    }
}