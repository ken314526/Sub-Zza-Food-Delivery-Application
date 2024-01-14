import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  deliverOrder,
  getAllOrders,
} from "../actions/orderActions";
import AdminNavbar from "./AdminNavbar";
import Error from "./Error";
import Loading from "./Loading";

export default function Orderslist() {
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState("");
  const getAllOrdersState = useSelector((state) => state.getAllOrdersReducer);
  const { loading, error, orders } = getAllOrdersState;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div className="p-3">
      <AdminNavbar />
      <h2>Orders List</h2>
      {loading && <Loading />}
      {error && <Error error="Something Went Wrong." />}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>User ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                return (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.email}</td>
                    <td>{order.userid}</td>
                    <td>{order.orderAmount}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      {order.isDelivered ? (
                        <h1>Delivered</h1>
                      ) : (
                        <button
                          className="btn"
                          onClick={() => {
                            dispatch(deliverOrder(order._id));
                          }}
                        >
                          Deliver
                        </button>
                      )}
                    </td>
                    <td>
                      <i
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => {
                          setOrderId(order._id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Deleting Order
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Do You Want To Delete This Order ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  dispatch(deleteOrder(orderId));
                  setOrderId("");
                }}
              >
                Delete
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-dark"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
