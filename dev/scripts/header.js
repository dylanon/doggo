import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    // If the user is not logged in, make the home page nav menu fixed for aesthetics
    let headerClass = '';
    if (props.loggedIn === false) {
        headerClass = 'fixed-header';
    }
    return (
        <header className={headerClass}>
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
                        <ul className={props.navToggleClass} onClick={props.toggleNav}>
                            <li><Link to='/'>Actions</Link></li>
                            <li><Link to='/history'>History</Link></li>
                            <li><a href="#" onClick={props.logOut}>Sign Out</a></li>
                        </ul>
                    ) : (
                        <ul className={props.navToggleClass} onClick={props.toggleNav}>
                            <li><a href="#" onClick={props.logIn}>Sign In</a></li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header;