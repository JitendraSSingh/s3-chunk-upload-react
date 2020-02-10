<?php
namespace App\Controllers;
use App\Auth\JwtAuth;
use Slim\Http\Request;
use Slim\Http\Response;

class TestController
{
    private $jwt;

    public function __construct(JwtAuth $jwt)
    {
        $this->jwt = $jwt;        
    }

    public function get(Request $request, Response $response)
    {

    }

    public function post(Request $request, Response $response)
    {
        if(!$token = $this->jwt->attempt($request->getParam('email'), $request->getParam('password'))){
            return $response->withJson(['result' => 'error', 'error' => 'invalid token'], 401);
        }
       return $response->withJson(['token' => $token]); 
    }
}