import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <div className="wrapper">
                <nav className="navbar">
                    <h1>dogLog: Dog care tracker</h1>
                        {props.loggedIn ? (
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/log'>View Log</Link></li>
                                <li><a href="#" onClick={props.logOut}>Log Out</a></li>
                            </ul>
                        ) : (
                            <ul>
                                <li><a href="#" onClick={props.logIn}>Log In</a></li>
                            </ul>
                        )}
                </nav>
            </div>
        </header>
    )
}

export default Header;