import React from 'react'
import brand1 from '../../assets/Images/HomePage/brands/l1.png'
import brand2 from '../../assets/Images/HomePage/brands/l2.png'
import brand3 from '../../assets/Images/HomePage/brands/l3.png'
import brand4 from '../../assets/Images/HomePage/brands/l4.png'
import brand5 from '../../assets/Images/HomePage/brands/l5.png'
const HomeBrands = () => {
  return (
    <div className='homebrands'>
      <div className="homebrands-header">
        <p>Brands</p>
        <h2>Browse by <span>Brand</span></h2>
      </div>
      <div className="homebrands-body">
        <img src={brand1} alt="" />
        <img src={brand2} alt="" />
        <img src={brand3} alt="" />
        <img src={brand4} alt="" />
        <img src={brand5} alt="" />
      </div>
    </div>
  )
}

export default HomeBrands
