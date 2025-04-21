import React, { useEffect, useRef, useState } from 'react';
import imgprogress from '../../assets/Images/About Page/img3.jpg';
import { useTranslation } from 'react-i18next'; 

const Aboutprogress = () => {
    const { t } = useTranslation(); 
    const ProgressBar = ({ percentage }) => {
        const [progress, setProgress] = useState(0);
        const ref = useRef(null);

        const handleScroll = () => {
            const rect = ref.current.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const duration = 1500; 
                const start = 0; 
                const end = percentage; 
                const startTime = performance.now(); 

                const animate = (currentTime) => {
                    const elapsedTime = currentTime - startTime; 
                    const progressFraction = Math.min(elapsedTime / duration, 1); 
                    const currentProgress = start + (end - start) * progressFraction; 

                    setProgress(currentProgress); 

                    if (progressFraction < 1) {
                        requestAnimationFrame(animate); 
                    }
                };

                requestAnimationFrame(animate);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useEffect(() => {
            setProgress(0);
        }, [percentage]);

        return (
            <div className='progressbar' ref={ref} style={{ margin: '0px 0' }}>
                <div className='progressbar-main' style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
                    <div className='progressbar main'
                        style={{
                            width: `${progress}%`,
                            height: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#ffc107',
                            transition: 'none' 
                        }}
                    />
                </div>
                <div style={{ position: 'relative', width: '100%', marginTop: '-25px', color: '#000' }}>
                    <span style={{ position: 'absolute', left: `${progress}%`, transform: 'translateX(-50%)' }}>
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="abouthistory">
            <div className="abouthistory-img">
                <img src={imgprogress} alt="" />
            </div>
            <div className="abouthistory-txt">
                <p className='abouthistory-txt-ques'>
                    {t('whoWeAre')} 
                </p>
                <h2>
                    {t('ourHistory')} 
                    <span> {t('historyHighlight')}</span> 
                </h2>
                <p className="abouthistory-txt-main">
                    {t('historyDescription')} 
                </p>
                <div className='abouthistory-progress-txt' style={{ width: '600px' }}>
                    <p>{t('clientsSatisfaction')}</p> 
                    <ProgressBar percentage={97} />
                    <p>{t('furnitureRepairment')}</p> 
                    <ProgressBar percentage={94} />
                    <p>{t('diamondCertificates')}</p> 
                    <ProgressBar percentage={95} />
                </div>
            </div>
        </div>
    );
};

export default Aboutprogress;
