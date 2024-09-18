import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ProductMenu from './SwiggyFoods/components/ProductMenu';
import CheckOut from './SwiggyFoods/components/CheckOut';
import Search from './SwiggyFoods/components/Search';
import LandinPage from './SwiggyFoods/pages/LandinPage';
import { ProductProvider } from './context/ProductContext';
 import SeChekOut from './SwiggyFoods/components/SeChekOut';
import HelpPage from './SwiggyFoods/components/HelpPage';
import MyAccount from './SwiggyFoods/components/MyAccount';
import OffersPage from './SwiggyFoods/components/OffersPage';
import RigesterAndLogin from './SwiggyFoods/components/RigesterAndLogin';
   

function App() {
  return (
    <ProductProvider>
      <Routes>
         <Route path="/" element={<RigesterAndLogin />} />  
         <Route path='/landing' element={<LandinPage />} />
        <Route path='/products/:firmId/:firmName' element={<ProductMenu />} />
        {/* <Route path='/product/:productId' element={<CheckOut />} /> */}
        <Route path='/CheckOut' element={<CheckOut />} />
        <Route path='/search' element={<Search />} />
        <Route path='/OffersPage' element={<OffersPage/>} />
        <Route path='/HelpPage' element={<HelpPage/>} />
        <Route path='/MyAccount' element={<MyAccount/>} />
        <Route path='/SeChekOut' element={<SeChekOut/>} />
       
        

      </Routes>
   </ProductProvider>
  );
}

export default App;
