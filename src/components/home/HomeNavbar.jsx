import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from '../../assets/Images/HomePage/NavLogo.png';
import { IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import Badge from '@mui/material/Badge';

const HomeNavbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <img src={NavLogo} alt="Logo" />
      </div>
      <div className="navbar-main">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="navbar-register">
        <Link to="/register">
          <IoPersonOutline />
        </Link>
        </div>
        <div className="navbar-wishlist">
        <Link to="/whishlist">
          <Badge badgeContent={4}>
            <CiHeart />
          </Badge>
        </Link>
        </div>
        <div className="navbar-cart">
        <Link to="/cart">
          <Badge badgeContent={4}>
            <PiShoppingCartLight />
          </Badge>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeNavbar;
