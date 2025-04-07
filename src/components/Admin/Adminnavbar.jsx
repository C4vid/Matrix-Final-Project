import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavLogo from '../../assets/Images/HomePage/NavLogo.png';
import { IoPersonOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartLight } from "react-icons/pi";
import Badge from '@mui/material/Badge';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next'; // i18next'i import et

// Supabase istemcisini oluşturun
const supabaseUrl = 'https://btsdjmkresicezlbutpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Kısa tutmak için gizlendi
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomeNavbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Çeviri fonksiyonu
  const [username, setUsername] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [language, setLanguage] = useState('az'); // Varsayılan dil

  useEffect(() => {
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
  }, []);

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
    i18n.changeLanguage(newLang); // Dil değişimi
  };

  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <Link to="/">
          <img src={NavLogo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-main">
        <ul className="navbar-links">
          <li><Link to="/">{t('home')}</Link></li>
          <li><Link to="/about">{t('about')}</Link></li>
          <li><Link to="/products">{t('products')}</Link></li>
          <li><Link to="/blog">{t('blog')}</Link></li>
          <li><Link to="/faq">{t('faq')}</Link></li>
          <li><Link to="/adminpanel">Dashboard</Link></li>
        </ul>
        <div className="navbar-register">
          <span onClick={handleUsernameClick} style={{ cursor: 'pointer' }}>
            {username ? username : <IoPersonOutline />}
          </span>
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
          <button onClick={toggleLanguage}>
            {language === 'az' ? 'EN' : 'AZ'} {/* Düğmede dil gösterimi */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeNavbar;
