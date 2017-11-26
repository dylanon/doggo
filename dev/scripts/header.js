import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <nav className="navbar">
                <div className="wrapper">
                    <div className="logo">
                        <Link to='/'>
                            <h1>doggo</h1>
                            <p className="tagline">The dog care tracker</p>
                        </Link>
                    </div>
                        {props.loggedIn ? (
                            <ul>
                                <li><Link to='/'>Actions</Link></li>
                                <li><Link to='/history'>History</Link></li>
                                <li><a href="#" onClick={props.logOut}>Log Out</a></li>
                            </ul>
                        ) : (
                            <ul>
                                <li><a href="#" onClick={props.logIn}>Log In</a></li>
                            </ul>
                        )}
                </div>
            </nav>
        </header>
    )
}

export default Header;