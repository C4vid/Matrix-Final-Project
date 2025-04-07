import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18next'i import et

const HomeFooter = () => {
  const { t } = useTranslation(); // Çeviri fonksiyonunu al

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
            <p>{t('faq')}</p> {/* Çeviriyi kullan */}
          </Link>
          <Link to="/contact" className='homefooter-header-link'>
            <p>{t('contactUs')}</p> {/* Çeviriyi kullan */}
          </Link>
        </div>
      </div>
      <div className="homefooter-body">
        <Link to="https://maps.app.goo.gl/vYA4txqxQs3qvnn3A" className="homefooter-body-item" style={{ cursor: 'pointer' }}>
          <h2>{t('location')}</h2> {/* Çeviriyi kullan */}
          <p>1418 Riverland, Shop 385</p>
          <p>Cotowood, CA 92022</p>
          <p>{t('unitedStates')}</p> {/* Çeviriyi kullan */}
        </Link>
        <div className="homefooter-body-item">
          <h2>{t('contact')}</h2> {/* Çeviriyi kullan */}
          <p>{t('tel')}: +1 (800) 345 678</p> {/* Çeviriyi kullan */}
          <p>{t('email')}: info @ xtrafurniture.com</p> {/* Çeviriyi kullan */}
          <p>{t('workingHours')}: 10 AM to 11 PM</p> {/* Çeviriyi kullan */}
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;
