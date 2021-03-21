import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <nav class="navbar navbar-expand-sm navbar-light bg-light mb-3">
            <div class="container">
                <Link to="/header" class="navbar-brand">Buy Tickets</Link>
                <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <Link to="/home" class="nav-link">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/destination" class="nav-link">Destination</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/services" class="nav-link">Services</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/contact" class="nav-link">Contact</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/login" class="nav-link" className="btn btn-danger mr-2">Login</Link>
                        </li>
                        {
                            loggedInUser ? <Link to="/login" > {loggedInUser.displayName}</Link> : ''
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;