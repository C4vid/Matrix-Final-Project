import React from 'react'
import Woodenfurniture from '../../assets/Images/HomePage/woodenfurniture.jpg'
const WoodenFurniture = () => {
  return (
    <div className='woodenfurniture'>
      <div className="woodenfurniture-img">
        <img src={Woodenfurniture} alt="" />
      </div>
      <div className="woodenfurniture-main">
        <h2>Solution for all your Wooden <span>Furniture</span> needs collection</h2>
        <button>See Collection</button>
      </div>
    </div>
  )
}

export default WoodenFurniture
