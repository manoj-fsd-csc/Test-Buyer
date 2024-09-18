import React, { useContext, useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { BsBagPlus } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import swiggyLogo from '../../assets/images/swiggy3.svg';
import { ProductContext } from '../../context/ProductContext';
import TemporaryAlert from '.././components/TemporaryAlert ';




const ProductMenuTopBar = () => {

  const [showAlert, setShowAlert] = useState(false);  

   const { existingProductC } = useContext(ProductContext);
 
   const LogoutHandler = () => {
    const confirmed = confirm("Are you sure you want to logout?");
    if (confirmed) {
       localStorage.removeItem("clientId");
      localStorage.removeItem("clientName");
      localStorage.removeItem("clientAddress");
      localStorage.removeItem("clientEmail");
      localStorage.removeItem("clientPhoneNo");
  
       window.location.href = "/";  
    } else {
      setShowAlert(true);  
      setTimeout(() => setShowAlert(false), 4000);  
  
    }
  };
  
  // const handleSearchClick = () => {
  //   inputRefHandle();  
  // };

  let clientAddress = (clientName => clientName ? clientName.slice(0, 45) : "No clientName found in localStorage.")(
      localStorage.getItem("clientAddress")
);

  return (
    <section className='topBarSection' >
                  {showAlert && <TemporaryAlert message="Continue to Buy!" />} 

      <div className="companyTitle">
        <div className='swiggyPngLogodiv'>
          <Link to='/landing' className='link'>
            <img className='swiggyPngLogo' src={swiggyLogo} alt="Swiggy-1" />
          </Link>
        </div>
     
      
            <Link to='/MyAccount' className='link'>
              <div className='topBarAddressBox'>
                 <div>
                   <div className='HOME'>HOME</div>
                 </div>
                 <div className='topBarAddress'>
                  <div>{clientAddress}</div>
                 </div>
               </div>            
          </Link>
          </div>
      <div className='topBarLinks'>
        <Link to='/search' className='link' >
          <div className='searchIconBox'>
            <BiSearch className='searchIcon' />
            <div className='searchIconString'>Search</div>
          </div>
        </Link>

        <Link to='/OffersPage' className='link'>
          <div className='offersIconBox'>
            <BiSolidOffer className='offersIcon' />
            <div className='offersIconString'>Offers</div>
          </div>
        </Link>

        {/* <Link to='https://www.swiggy.com/support' className='link'> */}
        <Link to='/HelpPage' className='link'>
          <div className='helpBox'>
            <IoHelpBuoyOutline className='helpIcon' />
            <div className='helpIconString'>Help</div>
          </div>
        </Link>

        <div className="dropdown">
          <Link to='/CheckOut'>
            <BsBagPlus className='cartIcon' />
            <div className={existingProductC === 0 ? "" : "dotB"}></div>
          </Link>
        </div>

        <div className="logindropdown">
          <Link to='/MyAccount' className='link'>
            <div className='logInBox'>
              <div className='person'><BsPerson /></div>
              <div className='logins'><span>MANOJ</span></div>
            </div>
          </Link>
          <div className="logindropdown-content"> 
            <Link  className='link' to="/MyAccount">Profile</Link>
            <Link  className='link' to="/CheckOut">Orders</Link>
            <Link  className='link' to="/landing">Favourites</Link>
            <Link  className='link' to="" >
                <div onClick={LogoutHandler}>
                    Logout
                </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductMenuTopBar;






