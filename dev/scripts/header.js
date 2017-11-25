import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <nav>
                <h1>dogLog: Dog care tracker</h1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/log'>View Log</Link></li>
                    <li><a href="#" onClick={props.logIn}>Log In</a></li>
                    <li><a href="#" onClick={props.logOut}>Log Out</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;