// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import NavbarImage from "../assets/navbar1.png";
import { FaShoppingCart, FaSearch } from 'react-icons/fa';  // Import search icon

function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin');

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <>
      <div className="marquee">
        <p>Welcome to our store! Enjoy free shipping on orders over $50!</p>
      </div>
      <nav className="navbar sticky">
        <div className="navbar-left">
          <img src={NavbarImage} alt="Navbar Logo" className="navbar-logo" />
        </div>
        <div className="navbar-center">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Catalog</Link></li>
            <li><Link to="/man">Man</Link></li>
            <li><Link to="/women">Women</Link></li>
            {isAdmin && (
              <li><Link to="/admin">Admin</Link></li>
            )}
          </ul>
        </div>
        <div className="navbar-right">
          <div className="navbar-search-container">
            <input type="text" placeholder="Search" className="navbar-search" />
            <FaSearch className="navbar-search-icon" />
          </div>
          <Link to="/cart" className="navbar-cart">
            <FaShoppingCart />
          </Link>
          {isAdmin ? (
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          ) : (
            <Link to="/login" className="navbar-login">Login</Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
