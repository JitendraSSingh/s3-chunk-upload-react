import React from 'react'
import { NavLink } from "react-router-dom"

export default function Nav(){

    return (
        <div className='side-nav-container'>
            <nav className='side-nav'>
                <ul>
                    <li><NavLink activeClassName='active-link' className='link' to='/users'>All Users</NavLink></li>
                    <li><NavLink activeClassName='active-link' className='link' to='/user'>Add User</NavLink></li>
                    <li><NavLink activeClassName='active-link' className='link' to='/my-profile'>My Profile</NavLink></li>
                    <li><NavLink activeClassName='active-link' className='link' to='/logout'>Log Out</NavLink></li>
                    <li><NavLink activeClassName='active-link' className='link' to='/upload'>Upload</NavLink></li>
                </ul>
            </nav>
        </div>
    )

}