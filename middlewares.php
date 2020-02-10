<?php

use Tuupola\Middleware\CorsMiddleware;
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;
$logger = new Logger("slim");
$rotating = new RotatingFileHandler(__DIR__ . "/slim.log", 0, Logger::DEBUG);
$logger->pushHandler($rotating);

$app->add(new CorsMiddleware([
    "origin" => ["http://51.15.195.120:3000"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "headers.allow" => [
        'X-Requested-With', 
        'Content-Type', 
        'Accept', 
        'Cache-Control',
        'Origin', 
        'Authorization', 
        'Referer'
    ],
    "headers.expose" => [],
    "credentials" => false,
    "cache" => 0,
    "logger" => $logger,
]));