import React from 'react';
import { useTranslation } from 'react-i18next'; // i18next'i import et
import brand1 from '../../assets/Images/HomePage/brands/l1.png';
import brand2 from '../../assets/Images/HomePage/brands/l2.png';
import brand3 from '../../assets/Images/HomePage/brands/l3.png';
import brand4 from '../../assets/Images/HomePage/brands/l4.png';
import brand5 from '../../assets/Images/HomePage/brands/l5.png';

const HomeBrands = () => {
  const { t } = useTranslation(); // Çeviri fonksiyonunu al

  return (
    <div className='homebrands'>
      <div className="homebrands-header">
        <p>{t('brands')}</p> {/* Çeviriyi kullan */}
        <h2>{t('browsedBy')} <span>{t('brand')}</span></h2> {/* Çeviriyi kullan */}
      </div>
      <div className="homebrands-body">
        <img src={brand1} alt="" />
        <img src={brand2} alt="" />
        <img src={brand3} alt="" />
        <img src={brand4} alt="" />
        <img src={brand5} alt="" />
      </div>
    </div>
  );
}

export default HomeBrands;
