<?php

namespace App\User;
use ReflectionClass;
use ReflectionProperty;

class User
{
    protected $id;
    protected $firstName;
    protected $lastName;
    protected $email;
    protected $phone;
    protected $isActive;
    protected $createdAt;
    protected $updatedAt;
    protected $primaryKey = 'id';

    public function __construct(array $data)
    {
        $this->id = $data['id'] ?? null;
        $this->firstName = $data['firstName'] ?? null;
        $this->lastName = $data['lastName'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->phone = $data['phone'] ?? null;
        $this->isActive = $data['isActive'] ?? null;
        $this->createdAt = $data['createdAt'] ?? null;
        $this->updatedAt = $data['updatedAt'] ?? null;

        $now = (new \DateTime())->format('Y-m-d H:i:s');
        if(!strtotime($this->createdAt)){
            $this->createdAt = $now;
        }
        if(!strtotime($this->updatedAt)){
            $this->updatedAt = $now;
        }
    }

    public function getArrayCopy()
    {
        return [
            'id' => $this->id,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
            'phone' => $this->phone,
            'isActive' => $this->isActive,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt
        ];
    }

    public function update($data)
    {
        $this->firstName = $data['firstName'];
        $this->lastName = $data['lastName'];
        $this->email = $data['email'];
        $this->phone = $data['phone'];
        $this->isActive = $data['isActive'];
    }

    public function getColumns()
    {
        $protectedProperties = (new ReflectionClass($this))->getProperties(ReflectionProperty::IS_PROTECTED);
        $protectedProperties = array_filter($protectedProperties, function($v, $k){
            return $v->name !== 'primaryKey';
        });
    }
}