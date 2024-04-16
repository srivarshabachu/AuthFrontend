import React from 'react'

import { Link } from 'react-router-dom'
const Main = () => {
    return (
        <div className='main'>
            <Link to="/">
                <div>Main</div>
            </Link>
            <Link to="/register/Admin">
                <div>Admin</div>
            </Link>
            <Link to="/register/User">
                <div>User</div>
            </Link>
            <Link to="/login">
                <div>Login</div>
            </Link>
        </div>
            
    )
}

export default Main
