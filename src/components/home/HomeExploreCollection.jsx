import React from 'react';
import { useTranslation } from 'react-i18next'; // i18next'i import et
import Chair from '../../assets/Images/HomePage/chair.jpg';

const HomeExploreCollection = () => {
  const { t } = useTranslation(); // Çeviri fonksiyonunu al

  return (
    <>
      <div className="home-explore">
        <div className="explore-img">
          <img src={Chair} alt={t('chair')} /> {/* Çeviriyi kullan */}
        </div>
        <div className="explore-main">
          <h2>{t('explore')} <br />Xtra <span>{t('furniture')} <br /> {t('stores')}</span> {t('for')} <br /> {t('latestCollection')}</h2> {/* Çeviriyi kullan */}
          <p>{t('furnitureDescription')}</p> {/* Çeviriyi kullan */}
          <button className='explore-main-btn'>{t('seeCollection')}</button> {/* Çeviriyi kullan */}
        </div>
      </div>
    </>
  );
}

export default HomeExploreCollection;
