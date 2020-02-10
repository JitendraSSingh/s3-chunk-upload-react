<?php
namespace App\Auth\Providers\Auth;

interface AuthProviderInterface
{
    public function byCredentials($username, $password);
}