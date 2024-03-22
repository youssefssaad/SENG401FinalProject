import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <ul style={{ listStyle: 'none' }}>
                <li><a href="/Budget">Budget</a></li>
                <li><a href="/Expenses">Expenses</a></li>
                <li><a href="/Education">Education</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
