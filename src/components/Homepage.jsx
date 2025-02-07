import React from 'react'
import HomeHeader from './home/HomeHeader'
import HomeExplore from './home/HomeExplore'
import HomeExploreCollection from './home/HomeExploreCollection'
import StyledFurniture from './home/StyledFurniture'
import WoodenFurniture from './home/WoodenFurniture'
import PopularFurniture from './home/PopularFurniture'
import HomeBrands from './home/HomeBrands'
import HomeFooter from './home/HomeFooter'
import HomeNavbar from './home/HomeNavbar'

const Homepage = () => {
  return (
    <div>
        <HomeNavbar/>
        <HomeHeader/> 
        <HomeExplore/>
        <HomeExploreCollection/>
        <StyledFurniture/>
        <WoodenFurniture/>
        <PopularFurniture/> 
        <HomeBrands/>
        <HomeFooter/>
    </div>
  )
}

export default Homepage
