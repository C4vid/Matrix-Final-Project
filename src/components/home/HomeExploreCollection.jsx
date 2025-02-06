import React from 'react'
import Chair from '../../assets/Images/HomePage/chair.jpg'


const HomeExploreCollection = () => {
  return (
    <>
    <div className="home-explore">
        <div className="explore-img">
            <img src={Chair} alt="" />
        </div>
        <div className="explore-main">
          <h2>Explore <br />Xtra <span>Furniture <br /> Stores</span> for <br /> latest collection</h2>
          <p>Sofa, bed, desk, chairs, tables, there’s something so enjoyable about slowly meandering through furniture stores.</p>
          <button className='explore-main-btn'>See Collection</button>
        </div>

    </div>
    </>
  )
}

export default HomeExploreCollection
