import React from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollections from '../components/FirmCollections'
 import Footer from '../components/Footer'
import AppDownload from '../components/AppDownload'
/* import SeChekOut from '../components/SeChekOut'
 */ 
function LandinPage() {
  return (
    
    
    <div>
        <TopBar/>
        <div className="landingSection">  
          {/* <SeChekOut/> */}
         <ItemsDisplay/>
        <Chains/>
        <FirmCollections/>
        </div>
        <AppDownload/>
         <Footer/>
    </div>
  )

}


export default LandinPage