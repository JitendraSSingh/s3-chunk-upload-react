import React from 'react'
import { Link } from "react-router-dom";
export default function User(props) {
    const { id, firstName, lastName, email, phone, isActive } = props.user
    return (
        <tr>
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{isActive}</td>
            <td className='action-btn-row'><Link
                to={`/user/${id}`}
                className='btn btn-block bg-gradient-warning btn-sm mr-8'>
                Edit
                </Link>
                <button
                    onClick={(e) => props.deleteUser(e, id)}
                    className='btn btn-block bg-gradient-danger btn-sm'>
                    Delete
                </button>
            </td>
        </tr>
    )
}