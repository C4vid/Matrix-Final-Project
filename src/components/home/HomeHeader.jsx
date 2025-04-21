import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'; 
import { ThemeContext } from '../../ThemeContext';
import HeaderBackground from '../../assets/Images/HomePage/header-background.png';
import HeaderBacgroundChair from '../../assets/Images/HomePage/header-chair.png';
import Headercart1 from '../../assets/Images/HomePage/homeheadercart1.jpg';
import Headercart2 from '../../assets/Images/HomePage/homeheadercart2.jpg';
import Headercart3 from '../../assets/Images/HomePage/homeheadercart3.jpg';

const HomeHeader = () => {
  const { t } = useTranslation(); 
  const { theme } = useContext(ThemeContext); 

  return (
    <div className={`header ${theme}`}> 
      <div className="home-header">
        <div className="home-header-main">
          <div className="home-header-main-text">
            <h1>{t('wideCollection')}</h1>
            <h2>{t('furniture')}</h2>
            <p>{t('luxuryLifeDescription')}</p>
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
