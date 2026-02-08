import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/");
        window.location.reload(); // clear state
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#343a40',
        color: 'white'
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginRight: '1rem'
    };

    return (
        <nav style={navStyle}>
            <div className="brand">
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Invoice App</span>
            </div>
            <div className="links">
                <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                <Link to="/invoices" style={linkStyle}>Invoices</Link>
                <Link to="/create" style={linkStyle}>New Invoice</Link>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid white',
                        color: 'white',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
