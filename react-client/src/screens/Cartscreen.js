import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../component/Loading";
import Error from "../component/Error";
import Success from "../component/Success";

export default function Cartscreen() {
  AOS.init();

  const cartState = useSelector((state) => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch();
  let subtotal = cartItems.reduce(
    (prevValue, item) => prevValue + item.price,
    0
  );
  const currentUser = localStorage.getItem("currentUser");

  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;

  return (
    <div data-aos="fade-down">
      <div className="row justify-content-center p-2">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>
          {cartItems.map((item) => {
            return (
              <>
                <hr />
                <div className="flex-container">
                  <div className="text-start m-1 w-100">
                    <h1>
                      {item.name} [{item.varient}]
                    </h1>
                    <h1>
                      Price : {item.quantity} * {item.prices[0][item.varient]} ={" "}
                      {item.price}
                    </h1>
                    <h1 style={{ display: "inline" }}>Quantity : </h1>
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-sharp fa-solid fa-plus"
                      onClick={() => {
                        dispatch(
                          addToCart(
                            item,
                            Number(item.quantity) + 1,
                            item.varient
                          )
                        );
                      }}
                    ></i>
                    <strong>{item.quantity}</strong>
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-sharp fa-solid fa-minus"
                      onClick={() => {
                        dispatch(
                          addToCart(
                            item,
                            Number(item.quantity) - 1,
                            item.varient
                          )
                        );
                      }}
                    ></i>
                  </div>

                  <div className="m-1 w-100">
                    <img
                      src={item.image}
                      alt=""
                      style={{ height: "80px", width: "80px" }}
                    />
                  </div>

                  <div className="m-1 w-100 mt-4">
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-sharp fa-solid fa-trash"
                      onClick={() => {
                        dispatch(deleteFromCart(item));
                      }}
                    ></i>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {Number(subtotal) !== 0 && (
          <div className="col-md-4 text-end">
            <h2 style={{ fontSize: "40px" }}>Sub Total: Rs. {subtotal} /-</h2>
            {loading && <Loading />}
            {error && <Error error="Something Went Wrong." />}
            {success && <Success success="Your Order Placed Successfully." />}
            {currentUser ? (
              <a
                onClick={() => {
                  localStorage.setItem("subtotal", subtotal);
                }}
                className="btn"
                href="/cart/checkout"
              >
                Pay Now
              </a>
            ) : (
              <a className="nav-link" href="/login">
                <div className="alert alert-danger text-center" role="alert">
                  Login to place order.
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
