import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <h1>dogLog: Dog care tracker</h1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/log'>View Log</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;