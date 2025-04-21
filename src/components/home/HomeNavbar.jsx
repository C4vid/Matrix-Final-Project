import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavLogo from '../../assets/Images/HomePage/NavLogo.png';
import { IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import Badge from '@mui/material/Badge';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, Container } from 'react-bootstrap';

const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c2RqbWtyZXNpY2V6bGJ1dHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyODkzNTIsImV4cCI6MjAzODg2NTM1Mn0.EbVl62cSHhz3K0NFOW8LJMPrjjHJXPhVtAJMO_PmvlU'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomeNavbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [language, setLanguage] = useState('az');
  const [theme, setTheme] = useState('light'); 
  const [isOpen, setIsOpen] = useState(false); // Menyu açıq/qapalı vəziyyəti

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('accounts')
        .select('username, visited')
        .eq('visited', 'active');

      if (error) {
        console.error('Error fetching data:', error);
      } else if (data.length > 0) {
        setUsername(data[0].username);
      }
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, product_wishlist, checkout');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        const likedCount = data.filter(product => product.product_wishlist === 'liked').length;
        const incartCount = data.filter(product => product.checkout && product.checkout.includes('incart')).length;

        setWishlistCount(likedCount);
        setCartCount(incartCount);
      }
    };

    fetchData();
    fetchProducts();

    document.body.className = theme;

  }, [theme]); 

  const handleUsernameClick = () => {
    if (username) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'az' ? 'en' : 'az';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar expand="lg" className={theme}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={NavLogo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav" className={isOpen ? 'show' : ''}>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>
            <Nav.Link as={Link} to="/about">{t('about')}</Nav.Link>
            <Nav.Link as={Link} to="/products">{t('products')}</Nav.Link>
            <Nav.Link as={Link} to="/blog">{t('blog')}</Nav.Link>
            <Nav.Link as={Link} to="/faq">F.A.Q</Nav.Link>
          </Nav>
          <div className="navbar-cart-item">
            <div className="navbar-register" onClick={handleUsernameClick} style={{ cursor: 'pointer' }}>
              {username ? username : <IoPersonOutline />}
            </div>
            <div className="navbar-wishlist">
              <Link to="/wishlist">
                <Badge badgeContent={wishlistCount}>
                  <CiHeart />
                </Badge>
              </Link>
            </div>
            <div className="navbar-cart">
              <Link to="/cart">
                <Badge badgeContent={cartCount}>
                  <PiShoppingCartLight />
                </Badge>
              </Link>
            </div>
            <div className="language-toggle">
              <button className="language-toggle-button" onClick={toggleLanguage}>
                {language === 'az' ? 'AZ' : 'EN'}
              </button>
            </div>
            <div className="theme-toggle">
              <button className="theme-toggle-button" onClick={toggleTheme}>
                {theme === 'light' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;
