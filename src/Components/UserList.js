import React from 'react'
import User from './User'
import { Link } from "react-router-dom";


export default function UserList(props) {
    const { users } = props
    return (
        <div className='user-list'>
           
            <table className='user-list-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Is Active</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <User key={user.id} user={user} deleteUser={props.deleteuser} />)}
                </tbody>
            </table>
            <div className='row content-center mt-16'>
                <Link
                    to={`/user`}
                    className='btn bg-gradient-warning btn-lg'>
                    Add User
                </Link>
            </div>
        </div>
    )
}