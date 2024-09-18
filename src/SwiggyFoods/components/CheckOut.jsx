import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../api";
import { BiSolidOffer } from "react-icons/bi";
import { LiaRupeeSignSolid } from "react-icons/lia";
import CheckOutTopBar from "./CheckOutTopBar";
import { RiSubtractFill } from "react-icons/ri";
import { ProductContext } from "../../context/ProductContext";
import EmptyCart from "./EmptyCart";
import Contact from "../../assets/images/Contact.png";
import map from "../../assets/images/map.png";
import man from "../../assets/images/man.png";
import AddressAdd from "../../assets/images/Address Add.png";
import veg from "../../assets/images/veg.png";
import nonveg from "../../assets/images/non-veg.png";

function CheckOut() {
  const [firmName, setFirmName] = useState([]);
  const [firmArea, setFirmArea] = useState([]);
  const [firmImage, setFirmImage] = useState([]);
  const { clickedProducts, updateProductQuantity, updateTotalCost } =
    useContext(ProductContext);
  const productHandler = async () => {
    try {
      const firmData = Object.values(clickedProducts);
      // console.log("CHECK firmData",firmData)
      const firmId = firmData[0].firm[0];
      // const vegOrNonVeg =firmData[0].category[0]

      //  console.log("CHECK firmId",firmId)
      const response = await fetch(`${API_URL}/firm/${firmId}`);
      const newProductData = await response.json();
      // console.log("Product newProductData to fetch:-", newProductData);
      setFirmName(newProductData.restaurentName);
      setFirmArea(newProductData.restaurentArea);
      setFirmImage(newProductData.restaurentImage);
      setFirmImage(newProductData.restaurentImage);
    } catch (error) {
      // console.error("Product failed to fetch:-", error);
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const handleIncrease = (productId) => {
    updateProductQuantity(
      productId,
      (clickedProducts[productId]?.quantity || 0) + 1
    );
  };

  const handleDecrease = (productId) => {
    updateProductQuantity(
      productId,
      Math.max((clickedProducts[productId]?.quantity || 0) - 1, 0)
    );
  };

  const totalItemCost = Object.values(clickedProducts).reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  const gst = totalItemCost / 10;
  const platformFee = Object.values(clickedProducts).reduce(
    (total, product) => {
      return total + product.quantity * 1;
    },
    0
  );

  const totalCost = totalItemCost + 26 + platformFee + gst;

  // let clientAddress = (clientAddress => clientAddress ? clientAddress.slice(0, 45) : "No clientAddress found in localStorage.")(
  //   localStorage.getItem("clientAddress")
  // );

  let clientAddress = localStorage.getItem("clientAddress");
  let clientName = localStorage.getItem("clientName");
  let clientPhone = localStorage.getItem("clientPhoneNo");

  useEffect(() => {
    updateTotalCost(totalItemCost);
  }, [totalItemCost]);
  return (
    <>
      <CheckOutTopBar />

      {Object.keys(clickedProducts).length > 0 ? (
        <div className="checkOutPage">
          <div className="addressSection">
            <div className="addressSectionMain">
              <div className="addressBox">
                <div className="addressBoxMain">
                  <div className="addressBoxMainHead">
                    Select delivery address
                  </div>
                  <div className="addaddressBox">
                    <div className="addressSetBoxHead">
                      You have a saved address in this location
                    </div>
                    <div className="addressSetBoxMain">
                      <div className="deliveryHere">
                        <div className="deliveryHereMain">
                          <div className="deliveryHereIcon">
                            <img
                              className="deliveryHereImg"
                              src={man}
                              alt="Home>"
                            />
                            <div className="clientInfo"> {clientName}</div>
                          </div>
                          <div className="deliveryHereIcon">
                            <img
                              className="deliveryHereImg"
                              src={map}
                              alt="map"
                            />
                            <div className="clientInfoAdd">
                              {" "}
                              {clientAddress}
                            </div>
                          </div>
                          <div className="deliveryHereIcon">
                            <img
                              className="deliveryHereImg"
                              src={Contact}
                              alt="Contact"
                            />
                            <div className="clientInfo"> {clientPhone}</div>
                          </div>
                        </div>
                      </div>
                      <div className="addAddress">
                        <div className="addAddressMain">
                          <div>Add New Address</div>
                          <div className="addAddressImgBox">
                            <img
                              className="addAddressImg"
                              src={AddressAdd}
                              alt="Address Add"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment">
              <div>Payment</div>
            </div>
          </div>

          <div className="checkOutSection">
            <div className="checkOutBox">
              <div className="product-list">
                <div className="product">
                  <button className="CheckOutFirmDetails">
                    <img
                      className="checkOutFirmImage"
                      src={`${API_URL}/uploads/${firmImage}`}
                    />
                    <span>
                      <div className="restaurantNameArea">
                        <div className="restaurantName"> {firmName}</div>
                        <div className="restaurantArea"> {firmArea} </div>
                        <div className="restaurantNameAreaEnd"> </div>
                      </div>
                    </span>
                  </button>

                  <div className="billMainBox">
                    <div className="billBox">
                      <div className="bill">
                        <div className="billSet">
                          <div className="billSetUl">
                            {Object.values(clickedProducts).map((product) => {
                              const singleProductTotal =
                                product.price * product.quantity;
                              const productCategory = product.category;

                              return (
                                <div key={product._id} className="billSetLi">
                                  <div className="cartProductvegimgProductNameBox">
                                    {productCategory == "veg" ? (
                                      <img
                                        className="cartProductvegimg"
                                        src={veg}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="cartProductvegimg"
                                        src={nonveg}
                                        alt=""
                                      />
                                    )}

                                    <div className="cartProductProductName">
                                      {product.productName}
                                    </div>
                                  </div>
                                  <div className="billButtonPrice">
                                    <div className="cartProductAddButtonBox">
                                      <div className="cartProductAddButtonsub">
                                        <button
                                          onClick={() =>
                                            handleDecrease(product._id)
                                          }
                                        >
                                          <RiSubtractFill />
                                        </button>
                                      </div>
                                      <div className="cartProductAddButtoncount">
                                        <span>{product.quantity}</span>
                                      </div>
                                      <div className="cartProductAddButtonadd">
                                        <button
                                          onClick={() =>
                                            handleIncrease(product._id)
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>

                                    <div className="moneysingleProductTotal">
                                      <div className="rupee">
                                        <LiaRupeeSignSolid />
                                      </div>
                                      <div>
                                        {singleProductTotal}{" "}
                                        <div className="singleProductTotal">
                                          {" "}
                                          ({product.price} x {product.quantity})
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="applyCoupon">
                          <div className="applyCouponOffer">
                            <BiSolidOffer />
                          </div>
                          <div>Apply Coupon</div>
                        </div>
                        <div className="billDetails">
                          <div className="billDetailsHead">Bill Details</div>
                          <div className="charges">
                            <div>Item Total</div>
                            <div className="money">
                              <div className="rupee">
                                <LiaRupeeSignSolid />
                              </div>
                              <div>{totalItemCost}</div>
                            </div>
                          </div>
                          <div className="charges">
                            <div>Delivery Fee | 2.6 kms</div>
                            <div className="money">
                              <div className="rupee">
                                <LiaRupeeSignSolid />
                              </div>
                              <div>26</div>
                            </div>
                          </div>
                          <hr />
                          <div className="charges">
                            <div>Delivery Tip</div>
                            <div>ADD TIP</div>
                          </div>
                          <div className="charges">
                            <div>Platform fee</div>
                            <div className="money">
                              <div className="rupee">
                                <LiaRupeeSignSolid />
                              </div>
                              <div>{platformFee}</div>
                            </div>
                          </div>
                          <div className="charges">
                            <div>GST and Restaurant Charges</div>
                            <div className="money">
                              <div className="rupee">
                                <LiaRupeeSignSolid />
                              </div>
                              <div>{gst}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="totalBill">
                    <div className="totalBillInline">
                      <div>TO PAY</div>
                      <div className="totalCostmoney">
                        <div className="rupee">
                          <LiaRupeeSignSolid />
                        </div>
                        <h5>{totalCost}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="save">
                    <div>Savings of</div>
                    <div>
                      <LiaRupeeSignSolid className="rupeeSave" />
                    </div>
                    <div>10</div>
                  </div>
                  <div className="billNote">
                    <div className="billNoteMain">
                      <div className="billNoteHead">
                        Review your order and address details to avoid
                        cancellations
                      </div>
                      <div className="billNoteNote">
                        Note: If you cancel within 60 seconds of placing your
                        order, a 100% refund will be issued. No refund for
                        cancellations made after 60 seconds.
                      </div>
                      <div className="billNoteNote">
                        Avoid cancellation as it leads to food wastage.
                      </div>
                      <div className="billNoteCancellationPolicy">
                        Read cancellation policy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}

export default CheckOut;
