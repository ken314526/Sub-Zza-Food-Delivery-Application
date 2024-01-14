import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderActions";
import Error from "../component/Error";
import Loading from "../component/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Ordersscreen() {
  AOS.init();

  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getUserOrdersReducer);
  const { orders, error, loading } = orderState;

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div>
      <h2 style={{ fontSize: "35px" }}>My Orders</h2>
      <div className="row justify-content-center">
        {loading && <Loading />}
        {error && <Error error="Something Went Wrong." />}
        {orders &&
          orders.map((order) => {
            return (
              <div
                className="col-md-8 m-3 p-1"
                data-aos="fade-down"
                style={{ backgroundColor: "red", color: "white" }}
              >
                <div className="flex-container">
                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Items</h2>
                    <hr />
                    {order.orderItems.map((item) => {
                      return (
                        <div>
                          <p>
                            {item.name} [{item.varient}] * {item.quantity} ={" "}
                            {item.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Address</h2>
                    <hr />
                    <p>Street: {order.shippingAddress.street}</p>
                    <p>City: {order.shippingAddress.city}</p>
                    <p>Country: {order.shippingAddress.country}</p>
                    <p>Pincode: {order.shippingAddress.pincode}</p>
                  </div>

                  <div className="text-start w-100 m-1">
                    <h2 style={{ fontSize: "25px" }}>Order Info</h2>
                    <hr />
                    <p>Order Amount: {order.orderAmount}</p>
                    <p>Date: {order.createdAt.substring(0, 10)}</p>
                    <p>Transaction Id: {order.transactionId}</p>
                    <p>Order Id: {order._id}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
