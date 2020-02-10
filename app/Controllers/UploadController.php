<?php
namespace App\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;
use App\Upload;

class UploadController
{
    protected $upload;

    public function __construct(Upload $upload)
    {
        $this->upload = $upload;
    }

    public function test(Request $request, Response $response)
    {
        return $response->withJson(['test' => 'OK']);
    }

    public function signPolicyDocument(Request $request, Response $response)
    {
        $body = $request->getParsedBody();
        if(array_key_exists('headers', $body)){
           $signature = $this->upload->signRequest('rest',$body['headers']);
           return $signature !== false ? $response->withJson(['signature' => $signature]) : $response->withJson(["invalid" => true]);
        }
        return $response->withJson(['invalid' => true]);
        
        $signedPolicy = $this->upload->signRequest(json_encode($body), !array_key_exists('key', $body['conditions']));
        if($signedPolicy !== false){
            return $response->withJson($signedPolicy);
        }
        return $response->withJson(['invalid' => true]);
    }

    public function verifyUpload(Request $request, Response $response)
    {
        $body = $request->getParsedBody();
        $filename = $body['name'];
        $bucket = $body['bucket'];
        $key = $body['key'];
        $isBrowserPreviewCapable = $body['isBrowserPreviewCapable'];
        $s3response = $this->upload->verifyFileInS3($this->upload->shouldIncludeThumbnail($filename, $isBrowserPreviewCapable),$bucket, $key);
        if(array_key_exists('error', $s3response)){
            return $response->withJson($s3response, 500);
        }
        return $response->withJson($s3response);
    }

    public function deleteUpload(Request $request, Response $response)
    {
        $body = $request->getParsedBody();
        $bucket = $body['bucket'];
        $key = $body['key'];
        $s3Response = $this->upload->deleteObject($bucket, $key);
        return $response->withJson($s3Response);
    }

}