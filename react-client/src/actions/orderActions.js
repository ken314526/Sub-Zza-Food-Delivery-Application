import axios from "axios";

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().loginUserReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  try {
    const res = await axios.post(
      "http://localhost:5555/api/orders/placeorder",
      {
        token,
        subtotal,
        currentUser,
        cartItems,
      }
    );
    console.log(res);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("subtotal");
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
    window.location.href = "/";
  } catch (err) {
    dispatch({ type: "PLACE_ORDER_FAILED" });
    console.log(err);
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = await getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_USER_ORDERS_REQUEST" });

  try {
    const res = await axios.post(
      "http://localhost:5555/api/orders/getuserorders",
      {
        userid: currentUser._id,
      }
    );
    dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_USER_ORDERS_FAILED", payload: err });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  const currentUser = await getState().loginUserReducer.currentUser;
  dispatch({ type: "GET_ALL_ORDERS_REQUEST" });

  try {
    const res = await axios.get(
      "http://localhost:5555/api/orders/getallorders"
    );
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_ALL_ORDERS_FAILED", payload: err });
  }
};

export const deliverOrder = (orderid) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5555/api/orders/deliverorder",
      { orderid }
    );
    console.log(res);
    alert("Order Deliered");
    const orders = await axios.get(
      "http://localhost:5555/api/orders/getallorders"
    );
    dispatch({ type: "GET_ALL_ORDERS_SUCCESS", payload: orders.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrder = (orderid) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5555/api/orders/deleteorder", {
      orderid,
    });
    alert("Order Deleted Scuccessfully.");
    window.location.reload();
  } catch (err) {
    alert("Something Went Wrong.");
    console.log(err);
  }
};
