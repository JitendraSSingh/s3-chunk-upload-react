<?php
use App\User\UserMapper;
use App\Controllers\{UserController, UploadController, TestController};
use App\Upload;
use App\Providers\AuthServiceProvider;
use App\Auth\JwtAuth;
use Aws\S3\S3Client;
use Aws\Credentials\Credentials;
use Illuminate\Database\Capsule\Manager as Capsule;

$container = $app->getContainer();
$capsule = new Capsule;
$db = $container['settings']['db'];
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => $db['host'],
    'database'  => $db['dbname'],
    'username'  => $db['user'],
    'password'  => $db['pass'],
    'charset'   => $db['charset'],
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $host = $db['host'];
    $dbname   = $db['dbname'];
    $user = $db['user'];
    $pass = $db['pass'];
    $charset = $db['charset'];
    
    $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
         return new \PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
         throw new \PDOException($e->getMessage(), (int)$e->getCode());
    }
};

$container[UserMapper::class] = function($c){
    return new UserMapper($c['db']);
};

$container[UserController::class] = function($c){
    return new UserController($c[UserMapper::class]);
};

$container[UploadController::class] = function($c){
    return new UploadController($c[Upload::class]);
};

$container[TestController::class] = function($c){
    return new TestController($c->get(JwtAuth::class));
};

$container[S3Client::class] = function($c){
    $credentials = new Credentials(getenv('SCALEWAY_ACCESS_KEY_ID'),getenv('SCALEWAY_SECRET_ACCESS_KEY'));
    return new S3Client([
        'version' => '2006-03-01',
        'region' => 'ap-southeast-2',
        'credentials' => $credentials
    ]);
};

$container[Upload::class] = function($c){
    return new Upload($c->get(S3Client::class));
};

$container->register(new AuthServiceProvider());