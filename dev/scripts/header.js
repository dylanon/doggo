import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <nav className="navbar">
                <div className="wrapper">
                    <div className="logo">
                        <Link to='/'>
                            <h1 className="site-title"><i className="fa fa-paw" aria-hidden="true"></i> doggo</h1>
                            <p className="tagline">Keep track of your pooch</p>
                        </Link>
                        <div className="nav-toggle" onClick={props.toggleNav}>
                            <i className="fa fa-bars"></i>
                        </div>
                    </div>
                    {props.loggedIn ? (
                        <ul className={props.navToggleClass}>
                            <li><Link to='/'>Actions</Link></li>
                            <li><Link to='/history'>History</Link></li>
                            <li><a href="#" onClick={props.logOut}>Sign Out</a></li>
                        </ul>
                    ) : (
                        <ul className={props.navToggleClass}>
                            <li><a href="#" onClick={props.logIn}>Sign In</a></li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header;