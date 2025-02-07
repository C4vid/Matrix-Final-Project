import React from 'react'
import HomeHeader from './HomeHeader'
import HomeExplore from './HomeExplore'
import HomeExploreCollection from './HomeExploreCollection'
import StyledFurniture from './StyledFurniture'
import WoodenFurniture from './WoodenFurniture'
import PopularFurniture from './PopularFurniture'
import HomeBrands from './HomeBrands'
import HomeFooter from './HomeFooter'
import HomeNavbar from './HomeNavbar'

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
