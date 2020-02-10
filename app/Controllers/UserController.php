<?php
namespace App\Controllers;
use App\User\{UserMapper, User};
use \Slim\Http\Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
class UserController 
{
    protected $um;

    public function __construct(UserMapper $um)
    {
        $this->um = $um;    
    }

    public function post(Request $request, Response $respone)
    {
        $data = $request->getParsedBody();
        $user = new User($data);
        $user = $this->um->insert($user);
        return $respone->withJson($user->getArrayCopy());
    }

    public function update(Request $request, Response $respone)
    {
        $data = $request->getParsedBody();
        $user = new User($data);
        $user = $this->um->update($user);
        return $respone->withJson((object)$user->getArrayCopy());
    }

    public function delete(Request $request, Response $respone, array $args)
    {
        $userDeleted = $this->um->delete($args['id']);
        return $respone->withJson(['userDeleted' => $userDeleted]);
    }

    public function get(Request $request, Response $response, array $args)
    {
        $user = $this->um->fetchById($args['id']);
        if($user){
            $response->getBody()->write(json_encode([
                'data' => (object) $user->getArrayCopy(),
                'status' => 'success'
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $response->getBody()->write(json_encode([
            'reason' => 'User Not Found',
            'status' => 'error'
        ]));
        return $response->withHeader('Content-Type','application/json')->withStatus(404,'User not Found');
    }

    public function list(Request $request, Response $response)
    {
        $users = $this->um->fecthAll();
        if($users){
            $response->getBody()->write(json_encode([
                'data' => $users,
                'status' => 'success'
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        }
        $response->getBody()->write(json_encode([
            'reason' => 'Users Not Found',
            'status' => 'error'
        ]));
        return $response->withHeader('Content-Type','application/json')->withStatus(404,'Users not Found');
    }

    public function test(Request $request, Response $respone)
    {
        return $respone->withJson(['test' => 'ok']);
    }
}