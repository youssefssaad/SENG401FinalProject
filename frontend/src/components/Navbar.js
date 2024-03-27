import React from 'react';
import '../index.css';
import SignOut from './SignOut';
import { AuthProvider, useAuth } from "./AuthContext";


const Navbar = () => {
    const { user, signOut } = useAuth();

    return (
        <nav>
            <div className="nav-links-container">
                <ul>
                    <li><a href="/intro">Main</a></li>
                    <li><a href="/budget">Budget</a></li>
                    <li><a href="/expenses">Expenses</a></li>
                    <li><a href="/education">Education</a></li>
                </ul>
            </div>
            {user && <SignOut />}
        </nav>
    );
};

export default Navbar;