import React from 'react';
import { useTranslation } from 'react-i18next'; 
import Chair from '../../assets/Images/HomePage/chair.jpg';
import { Link, Navigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const HomeExploreCollection = () => {
  const { t } = useTranslation(); 
  return (
    <>
      <div className="home-explore">
        <div className="explore-img">
          <img src={Chair} alt={t('chair')} /> 
        </div>
        <div className="explore-main">
          <h2>{t('explore')} <br />Xtra <span>{t('furniture')} <br /> {t('stores')}</span> {t('for')} <br /> {t('latestCollection')}</h2> 
          <p>{t('furnitureDescription')}</p> 
          <Nav.Link as={Link} to="/products">
          <button className='explore-main-btn' >
            {t('products')}
          </button>
          </Nav.Link>
            </div>
      </div>
    </>
  );
}

export default HomeExploreCollection;
