import React from 'react';
import { useTranslation } from 'react-i18next';
import Sofaicon from '../../assets/Images/HomePage/sofaicon.png';
import Tableicon from '../../assets/Images/HomePage/tableicon.png';
import Bedicon from '../../assets/Images/HomePage/bedicon.png';
import Wardrobeicon from '../../assets/Images/HomePage/wardrobeicon.png';
import Mirroricon from '../../assets/Images/HomePage/mirroricon.png';
import Bathtubicon from '../../assets/Images/HomePage/bathtubicon.png';
import Sofaseticon from '../../assets/Images/HomePage/sofaseticon.png';
import Sinkicon from '../../assets/Images/HomePage/sinkicon.png';
import Lambicon from '../../assets/Images/HomePage/lampicon.png';
import Othericon from '../../assets/Images/HomePage/othericon.png';
import { Link } from 'react-router-dom';

const HomeExplore = () => {
  const { t } = useTranslation(); 

  return (
    <div className='homeexplore'>
      <div className="explore-header">
        <p>{t('exploreOur')} <span>{t('furniture')}</span> {t('range')}:</p> 
      </div>
      <div className="explore-main">
        <div className="explore-main-item">
          <Link to="/products?search=&category=sofa" className="explore-main-item-top">
            <img src={Sofaicon} alt={t('sofa')} />
            <p>{t('sofa')}</p> 
          </Link>
          <Link to="/products?search=&category=table" className="explore-main-item-top">
            <img src={Tableicon} alt={t('table')} />
            <p>{t('table')}</p> 
          </Link>
          <Link to="/products?search=&category=bed" className="explore-main-item-top">
            <img src={Bedicon} alt={t('bed')} />
            <p>{t('bed')}</p> 
          </Link>
          <Link to="/products?search=&category=wardrobe" className="explore-main-item-top">
            <img src={Wardrobeicon} alt={t('wardrobe')} />
            <p>{t('wardrobe')}</p> 
          </Link>
          <Link to="/products?search=&category=mirror" className="explore-main-item-top">
            <img src={Mirroricon} alt={t('mirror')} />
            <p>{t('mirror')}</p> 
          </Link>
        </div>
        <div className="explore-main-item">
          <Link to="/products?search=&category=bathtub" className="explore-main-item-bottom">
            <img src={Bathtubicon} alt={t('bathtub')} />
            <p>{t('bathtub')}</p> 
          </Link>
          <Link to="/products?search=&category=sofaset" className="explore-main-item-bottom">
            <img src={Sofaseticon} alt={t('sofaSet')} />
            <p>{t('sofaSet')}</p> 
          </Link>
          <Link to="/products?search=&category=sink" className="explore-main-item-bottom">
            <img src={Sinkicon} alt={t('sink')} />
            <p>{t('sink')}</p> 
          </Link>
          <Link to="/products?search=&category=lamb" className="explore-main-item-bottom">
            <img src={Lambicon} alt={t('lamp')} />
            <p>{t('lamp')}</p> 
          </Link>
          <Link to="/products?search=&category=other" className="explore-main-item-bottom">
            <img src={Othericon} alt={t('other')} />
            <p>{t('other')} ...</p> 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeExplore;
