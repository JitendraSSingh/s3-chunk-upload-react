<?php

use App\Controllers\UserController;
use App\Controllers\UploadController;
use App\Controllers\TestController;

$app->post('/users', UserController::class . ':post')->setName('user.post');
$app->get('/users/{id}', UserController::class . ':get')->setName('users.get');
$app->delete('/users/{id}', UserController::class . ':delete')->setName('users.delete');
$app->get('/users', UserController::class . ':list')->setName('users.list');
$app->map(['PUT', 'OPTIONS'],'/users', UserController::class . ':update')->setName('users.put');


$app->post('/sign-policy', UploadController::class . ':signPolicyDocument')->setName('sign.policy');
$app->post('/verify-upload', UploadController::class . ':verifyUpload')->setName('verify.upload');
$app->post('/delete-upload', UploadController::class . ':deleteUpload')->setName('delete.upload');
$app->get('/test', TestController::class. ':get')->setName('test.get');
$app->post('/test', TestController::class. ':post')->setName('test.post');