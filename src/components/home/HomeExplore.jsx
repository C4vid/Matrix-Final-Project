import React from 'react'
import Sofaicon from '../../assets/Images/HomePage/sofaicon.png'
import Tableicon from '../../assets/Images/HomePage/tableicon.png'
import Bedicon from '../../assets/Images/HomePage/bedicon.png'
import Wardrobeicon from '../../assets/Images/HomePage/wardrobeicon.png'
import Mirroricon from '../../assets/Images/HomePage/mirroricon.png'
import Bathtubicon from '../../assets/Images/HomePage/bathtubicon.png'
import Sofaseticon from '../../assets/Images/HomePage/sofaseticon.png'
import Sinkicon from '../../assets/Images/HomePage/sinkicon.png'
import Lambicon from '../../assets/Images/HomePage/lampicon.png'
import Othericon from '../../assets/Images/HomePage/othericon.png'




const HomeExplore = () => {
  return (
    <div className='homeexplore'>
        <div className="explore-header">
            <p>Explore Our <span>Furniture</span> Range:</p>
        </div>
        <div className="explore-main">
            <div className="explore-main-item ">
            <div className="explore-main-item-top">
              <img src={Sofaicon} alt="Sofa" />
              <p>Sofa</p>
            </div>
            <div className="explore-main-item-top">
              <img src={Tableicon} alt="" />
              <p>Table</p>
            </div>
            <div className="explore-main-item-top">
              <img src={Bedicon} alt="" />
              <p>Bed</p>
            </div>
            <div className="explore-main-item-top">
              <img src={Wardrobeicon} alt="" />
              <p>Wardrobe</p>
            </div>
            <div className="explore-main-item-top">
              <img src={Mirroricon} alt="" />
              <p>Mirror</p>
            </div>
            </div>
            <div className="explore-main-item">
              <div className="explore-main-item-bottom">
                <img src={Bathtubicon} alt="" />
                <p>Bathtub</p>
              </div>
              <div className="explore-main-item-bottom">
                <img src={Sofaseticon} alt="" />
                <p>Sofa Set</p>
              </div>
              <div className="explore-main-item-bottom">
                <img src={Sinkicon} alt="" />
                <p>Sink</p>
              </div>
              <div className="explore-main-item-bottom">
                <img src={Lambicon} alt="" />
                <p>Lamp</p>
              </div>
              <div className="explore-main-item-bottom">
                <img src={Othericon} alt="" />
                <p>Other ...</p>
              </div>
            </div>

        </div>
    </div>
  )
}

export default HomeExplore
