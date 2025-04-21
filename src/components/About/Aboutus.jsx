import React from 'react';
import { FaCheck } from "react-icons/fa6";
import Aboutusimg1 from '../../assets/Images/About Page/img4.jpg';
import Aboutusimg1hover from '../../assets/Images/About Page/img5.jpg';
import { useTranslation } from 'react-i18next'; 

const Aboutus = () => {
    const { t } = useTranslation(); 

    return (
        <div className='aboutus'>
            <div className="aboutus-txt">
                <p className='aboutus-txt-ques'>
                    {t('whoWeAre')} 
                </p>
                <h2>
                    <span>{t('about')}</span> {t('us')} 
                </h2>
                <p>{t('furnitureDescription1')}</p> 
                <p>{t('furnitureDescription2')}</p> 
                <div className="aboutus-txt-footer">
                    <div className="aboutus-text-footer-left">
                        <h4>
                            <FaCheck />
                            {t('goodWoods')} 
                        </h4>
                        <h4>
                            <FaCheck />
                            {t('naturalMaterials')} 
                        </h4>
                        <h4>
                            <FaCheck />
                            {t('bestFabrics')} 
                        </h4>
                    </div>
                    <div className="aboutus-text-footer-left">
                        <h4>
                            <FaCheck />
                            {t('freeShipping')} 
                        </h4>
                        <h4>
                            <FaCheck />
                            {t('refundPolicy')} 
                        </h4>
                        <h4>
                            <FaCheck />
                            {t('friendlySupport')} 
                        </h4>
                    </div>
                </div>
            </div>
            <div className="aboutus-img">
                <div className="aboutus-img-1">
                    <img src={Aboutusimg1} alt="" />
                </div>
                <div className="aboutus-img-1-hover">
                    <img src={Aboutusimg1hover} alt="" />
                </div>
                <div className="aboutus-img-experience">
                    <h2><span>27</span> {t('years')}</h2> 
                    <p>{t('ofExperience')}</p> 
                </div>
            </div>
        </div>
    );
}

export default Aboutus;
