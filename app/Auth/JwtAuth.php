<?php
namespace App\Auth;
use App\Auth\Providers\Auth\AuthProviderInterface;

class JwtAuth
{
    private $auth;

    public function __construct(AuthProviderInterface $auth)
    {
        $this->auth = $auth;    
    }

    public function attempt($username, $password)
    {
        if (!$this->auth->byCredentials($username, $password)) {
            return false;
        }
        return '123';
    }
}