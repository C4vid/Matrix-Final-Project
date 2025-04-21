import React from 'react';
import Woodenfurniture from '../../assets/Images/HomePage/woodenfurniture.jpg';
import { useTranslation } from 'react-i18next'; 
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const WoodenFurniture = () => {
  const { t } = useTranslation();
  return (
    <div className='woodenfurniture'>
      <div className="woodenfurniture-img">
        <img src={Woodenfurniture} alt={t('woodenFurnitureAlt')} /> 
      </div>
      <div className="woodenfurniture-main">
        <h2>{t('woodenFurnitureTitle')}</h2> 
        <Nav.Link as={Link} to="/products">
          <button className='styledfurniture-txt-btn' >
            {t('addToCart')}
          </button>
        </Nav.Link>      
        </div>
    </div>
  );
}

export default WoodenFurniture;
