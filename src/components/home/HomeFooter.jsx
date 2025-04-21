import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

const HomeFooter = () => {
  const { t } = useTranslation(); 
  return (
    <div className='homefooter'>
      <div className="homefooter-header">
        <div className="homefooter-header-img">
          <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/logo.png" alt="" />
        </div>
        <div className="homefooter-header-menu">
          <div className="homefooter-header-menu-logo">
            <Link to="https://www.instagram.com/arzenadesign?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="homefooter-header-menu-logo-item">
              <FaInstagram />
            </Link>
            <Link to="https://www.facebook.com/arzenadesign/?locale=az_AZ" className="homefooter-header-menu-logo-item">
              <FaFacebookF />
            </Link>
            <Link to="https://x.com/AshleyHomeStore" className="homefooter-header-menu-logo-item">
              <FaXTwitter />
            </Link>
          </div>
          <Link to="/faq" className='homefooter-header-link'>
            <p>F.A.Q</p> 
          </Link>

        </div>
      </div>
      <div className="homefooter-body">
        <Link to="https://maps.app.goo.gl/vYA4txqxQs3qvnn3A" className="homefooter-body-item" style={{ cursor: 'pointer' }}>
          <h2>{t('location')}</h2> 
          <p>1418 Riverland, Shop 385</p>
          <p>Cotowood, CA 92022</p>
          <p>{t('unitedStates')}</p> 
        </Link>
        <div className="homefooter-body-item">
          <h2>{t('contact')}</h2> 
          <p>{t('tel')}: +1 (800) 345 678</p> 
          <p>{t('email')}: info @ xtrafurniture.com</p> 
          <p>{t('workingHours')}: 10 AM to 11 PM</p> 
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;
