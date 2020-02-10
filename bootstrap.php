<?php
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
$config = require __DIR__ . '/settings.php';
$app = new \Slim\App(['settings' => $config]);
