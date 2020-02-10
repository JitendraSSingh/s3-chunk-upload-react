<?php
namespace App\Providers;
use Pimple\ServiceProviderInterface;
use App\Auth\Providers\Auth\EloquentProvider;
use App\Auth\JwtAuth;

class AuthServiceProvider implements ServiceProviderInterface
{
    public function register($c)
    {
        $c[JwtAuth::class] = function(){
            return new JwtAuth(new EloquentProvider());
        };
    }
}