import React from 'react'
import HomeExplore from '../home/HomeExplore'
import HomeExploreCollection from '../home/HomeExploreCollection'
import HomeHeader from '../home/HomeHeader'
import HomeNavbar from '../home/HomeNavbar'
import StyledFurniture from '../home/StyledFurniture'
import WoodenFurniture from '../home/WoodenFurniture'
import PopularFurniture from '../home/PopularFurniture'
import HomeBrands from '../home/HomeBrands'
import HomeFooter from '../home/HomeFooter'
import Adminnavbar from './Adminnavbar'

const AdminHomepage = () => {
  return (
    <div>
        <Adminnavbar/>
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

export default AdminHomepage
