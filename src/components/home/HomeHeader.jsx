import React from 'react';
import { useTranslation } from 'react-i18next'; // i18next'i import et
import HomeNavbar from './HomeNavbar';

import HeaderBackground from '../../assets/Images/HomePage/header-background.png';
import HeaderBacgroundChair from '../../assets/Images/HomePage/header-chair.png';
import Headercart1 from '../../assets/Images/HomePage/homeheadercart1.jpg';
import Headercart2 from '../../assets/Images/HomePage/homeheadercart2.jpg';
import Headercart3 from '../../assets/Images/HomePage/homeheadercart3.jpg';

const HomeHeader = () => {
  const { t } = useTranslation(); // Çeviri fonksiyonunu al

  return (
    <div className='header'>
      <div className="home-header">
        <div className="home-header-main">
          <div className="home-header-main-text">
            <h1>{t('wideCollection')}</h1> {/* Çeviriyi kullan */}
            <h2>{t('furniture')}</h2> {/* Çeviriyi kullan */}
            <p>{t('luxuryLifeDescription')}</p> {/* Çeviriyi kullan */}
          </div>
          <div className="home-header-main-image">
            <img src={Headercart1} alt="cart1" />
            <img src={Headercart2} alt="cart2" />
            <img src={Headercart3} alt="cart3" />
          </div>
        </div>
        <div className="home-header-img">
          <img src={HeaderBacgroundChair} alt="header-chair" />
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
