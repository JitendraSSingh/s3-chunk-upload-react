<?php

namespace App\User;
use DateTime;

class UserMapper
{
    protected $db;

    /**
     * Constructor
     *
     * @param \PDO $db
     */
    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }

    /**
     * Get all Users
     *
     * @return array Array of Users
     */
    public function fecthAll()
    {
        $sql = "SELECT * FROM users";
        $stmt = $this->db->query($sql);

        $results = [];
        while ($row = $stmt->fetch()) {
            $results[] = (object)(new User($row))->getArrayCopy();
        }
        return $results;
    }

    /**
     * Get a User
     *
     * @param int $id
     * @return User|boolean
     */
    public function fetchById($id)
    {
        $sql = "SELECT * FROM users WHERE id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id]);
        $data = $stmt->fetch();
        return $data ? new User($data) : false;
    }

    /**
     * Add a User
     *
     * @param User $user
     * @return User new User record
     */
    public function insert(User $user)
    {
        $data = $user->getArrayCopy();
        $data['id'] = null;
        $data['createdAt'] = (new DateTime())->format('Y-m-d H:i:s');
        $data['updatedAt'] = $data['createdAt'];
        $query = "INSERT INTO users 
            (id, firstName, lastName, email, phone, isActive, createdAt, updatedAt)
            VALUES(:id, :firstName, :lastName, :email, :phone, :isActive, :createdAt, :updatedAt)";
        $stmt = $this->db->prepare($query);
        $result = $stmt->execute($data);
        $data['id'] = $this->db->lastInsertId();
        return new User($data);
    }

    /**
     * Update a user
     *
     * @return User
     */
    public function update(User $user)
    {
        $data = $user->getArrayCopy();
        $data['updatedAt'] = (new DateTime())->format('Y-m-d H:i:s');
        $query = "UPDATE users
            SET firstName = :firstName,
                lastName = :lastName,
                email = :email,
                phone = :phone,
                isActive = :isActive,
                createdAt = :createdAt,
                updatedAt = :updatedAt
            WHERE id = :id
            ";
        $stmt = $this->db->prepare($query);
        $result = $stmt->execute($data);
        return new User($data);
    }
    /**
     * Delete an user
     *
     * @param $id       Id of author to delete
     * @return boolean  True if there was an author to delete
     */
    public function delete($id)
    {
        $data['id'] = $id;
        $query = "DELETE FROM users WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->execute($data);
        return (bool) $stmt->rowCount();
    }
}
