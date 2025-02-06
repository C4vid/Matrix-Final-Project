import React from 'react'
import HomeNavbar from './HomeNavbar'


import HeaderBackground from '../../assets/Images/HomePage/header-background.png'
import HeaderBacgroundChair from '../../assets/Images/HomePage/header-chair.png'
import Headercart1 from '../../assets/Images/HomePage/homeheadercart1.jpg'
import Headercart2 from '../../assets/Images/HomePage/homeheadercart2.jpg'
import Headercart3 from '../../assets/Images/HomePage/homeheadercart3.jpg'




const HomeHeader = () => {
  return (
    <div className='header'>
        <HomeNavbar/>
        <div className="home-header">
            <div className="home-header-main">
                <div className="home-header-main-text">
                    <h1>Wide Collection Of Home</h1>
                    <h2>Furniture</h2>
                    <p>Embrace a life of luxury and comfort with Xtra. Our exclusive furniture collection brings sophistication and timeless elegance to your home, creating spaces that resonate with your style.</p>
                </div>            
                <div className="home-header-main-image">
                    <img src={Headercart1} alt="cart1" />
                    <img src={Headercart2} alt="cart2" />
                    <img src={Headercart3} alt="cart3" />
                </div>

            </div>
            <div className="home-header-img">
                <img src={HeaderBacgroundChair} alt="header-chair" />
            </div>
        </div>
    </div>
  )
}

export default HomeHeader
