import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const SeChekOut = () => {
  const { clickedProducts, updateProductQuantity } = useContext(ProductContext);

  const handleIncrease = (productId) => {
    const currentQuantity = clickedProducts[productId]?.quantity || 0;
    updateProductQuantity(productId, currentQuantity + 1);
  };

  const handleDecrease = (productId) => {
    const currentQuantity = clickedProducts[productId]?.quantity || 0;
    updateProductQuantity(productId, currentQuantity - 1);
  };

  const calculateTotal = (quantity, price) => quantity * price;

  return (
    <div className="SeChekOut">
      <div>
        <h1>Restaurant Name:</h1>
        <h3>Restaurant place:</h3>
      </div>
      <div>
        <ul>
          {Object.values(clickedProducts).map((product) => (
            <li key={product._id}>
              Product Name: {product.productName} |
              <div>
                <button
                  onClick={() => handleDecrease(product._id)}
                  disabled={product.quantity === 0}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncrease(product._id)}>+</button>
              </div>
              Quantity: {product.quantity} | Price per unit: ₹{product.price} |
              Total: ₹{calculateTotal(product.quantity, product.price)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeChekOut;
