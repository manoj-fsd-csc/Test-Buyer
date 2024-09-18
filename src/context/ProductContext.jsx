import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [clickedProducts, setClickedProducts] = useState({});
  const [totalCost, setTotalCost] = useState(0); 
  // const [existingProduct, setExistingProduct] = useState(0); 
  const [existingProductC, setExistingProductC] = useState(0); 

  const addClickedProduct = (product) => {
    setClickedProducts((prevState) => {
      const existingProduct = prevState[product._id];
      if (existingProduct) {
        return {
          ...prevState,
          [product._id]: {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          },
        };
      } else {
        return {
          ...prevState,
          [product._id]: { ...product, quantity: 1 },
        };
      }
    });
  };

  const removeClickedProduct = (productId) => {
    setClickedProducts((prevState) => {
      const existingProduct = prevState[productId];
      if (existingProduct.quantity > 1) {
        return {
          ...prevState,
          [productId]: {
            ...existingProduct,
            quantity: existingProduct.quantity - 1,
          },
        };
      } else {
        const { [productId]: _, ...newState } = prevState;
        return newState;
      }
    });
  };

  const updateProductQuantity = (productId, quantity) => {
    setClickedProducts((prevState) => {
      if (quantity > 0) {
        return {
          ...prevState,
          [productId]: {
            ...prevState[productId],
            quantity,
          },
        };
      } else {
        const { [productId]: _, ...newState } = prevState;
        return newState;
      }
    });
  };
 
  const updateTotalCost = (newTotalCost) => {
    setTotalCost(newTotalCost);
  };
   
  const logOut = () =>{
    confirm("Are you sure to logout?")
      localStorage.removeItem("clientAddress");
      localStorage.removeItem("clientEmail");
      localStorage.removeItem('clientId');
      localStorage.removeItem('clientName');
      localStorage.removeItem('clientPhoneNo');
  }
  return (
    <ProductContext.Provider value={{ clickedProducts, addClickedProduct, removeClickedProduct, updateProductQuantity , totalCost, updateTotalCost,existingProductC,setExistingProductC }}>
      {children}
    </ProductContext.Provider>
  );
};

 