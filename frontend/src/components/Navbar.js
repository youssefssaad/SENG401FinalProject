import React from 'react';

const Navbar = () => {
    return (
        <nav>
        <ul style="list-style: none;">
            <li><a href="/Budget">Budget</a></li>
            <li><a href="/Education">Education</a></li>
            <li><a href="/Expenses">Expenses</a></li>
            <li><a href="/Loading">Loading</a></li>
            <li><a href="/Main">Main</a></li>
            <li><a href="/Settings">Settings</a></li>  
        </ul>
        </nav>
    );
};

export default Navbar;