import React from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const HomeFooter = () => {
  return (
    <div className='homefooter'>
      <div className="homefooter-header">
        <div className="homefooter-header-img">
            <img src="https://xtratheme.com/elementor/furniture-shop-2/wp-content/uploads/sites/112/2024/03/logo.png" alt="" />
        </div>
        <div className="homefooter-header-menu">
            <div className="homefooter-header-menu-logo">
                <div className="homefooter-header-menu-logo-item">
                    <FaInstagram />
                </div>
                <div className="homefooter-header-menu-logo-item">
                    <FaFacebookF />
                </div>
                <div className="homefooter-header-menu-logo-item">
                    <FaXTwitter />
                </div>


            </div>
            <p>Track Your Order</p>
            <p>FAQ</p>
            <p>Affiliates</p>
            <p>Privacy Policy</p>
            <p>Contact Us</p>
        </div>
      </div>
      <div className="homefooter-body">
        <div className="homefooter-body-item">
            <h2>Location</h2>
            <p>1418 Riverland, Shop 385</p>
            <p>Cotowood, CA 92022</p>
            <p>United States</p>
        </div>
        <div className="homefooter-body-item">
            <h2>Contact</h2>
            <p>Tel: +1 (800) 345 678</p>
            <p>Email: info @ xtrafurniture.com</p>
            <p>Working Hours: 10 AM to 11 PM</p>
        </div>
      </div>
    </div>
  )
}

export default HomeFooter
