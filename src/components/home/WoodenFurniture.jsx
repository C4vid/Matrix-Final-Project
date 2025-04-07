import React from 'react';
import Woodenfurniture from '../../assets/Images/HomePage/woodenfurniture.jpg';
import { useTranslation } from 'react-i18next'; // i18next'i import et

const WoodenFurniture = () => {
  const { t } = useTranslation(); // Çeviri fonksiyonunu al

  return (
    <div className='woodenfurniture'>
      <div className="woodenfurniture-img">
        <img src={Woodenfurniture} alt={t('woodenFurnitureAlt')} /> {/* Alt metni çeviri ile dinamik hale getir */}
      </div>
      <div className="woodenfurniture-main">
        <h2>{t('woodenFurnitureTitle')}</h2> {/* Çeviriyi kullan */}
        <button>{t('seeCollection')}</button> {/* Çeviriyi kullan */}
      </div>
    </div>
  );
}

export default WoodenFurniture;
