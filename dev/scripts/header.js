import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <nav className="navbar">
                <div className="wrapper">
                    <div className="logo">
                        <Link to='/'>
                            <h1 className="site-title"><i class="fa fa-paw" aria-hidden="true"></i> doggo</h1>
                            <p className="tagline">Keep track of your pooch</p>
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