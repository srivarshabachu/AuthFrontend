import React from 'react'

import { Link } from 'react-router-dom'
const Main = () => {
    return (
        <>
            <Link to="/">
                <div>Main</div>
            </Link>
            <Link to="/register/Admin">
                <div>Admin</div>
            </Link>
            <Link to="/login">
                <div>Login</div>
            </Link>
        </>
            
    )
}

export default Main
