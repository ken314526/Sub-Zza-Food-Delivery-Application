import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const res = await axios.post("/api/users/register", user);
    console.log(res);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (err) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: err });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  console.log(user);

  try {
    const res = await axios.post("http://localhost:5555/api/users/login", user);

    if (res.data !== "error") {
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      const userid = res.data._id;
      const cartItems = await axios.post(
        "http://localhost:5555/api/cart/getcartitem",
        { userid }
      );
      if (cartItems.data[0]) {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(cartItems.data[0].cartItems)
        );
      }

      window.location.href = "/";
    } else {
      dispatch({ type: "USER_LOGIN_FAILED", payload: "Invalid Info" });
    }
  } catch (err) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: err });
    console.log(err);
  }
};

export const logoutUser = (userid) => async (dispatch) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      const res = axios.post("http://localhost:5555/api/cart/updatecart", {
        userid,
        cartItems,
      });
      console.log(res.data);
      localStorage.removeItem("cartItems");
    }
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const res = await axios.get("http://localhost:5555/api/users/getallusers");
    dispatch({ type: "GET_USERS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_USERS_FAILED", payload: err });
  }
};

export const deleteUser = (userid) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5555/api/users/deleteuser", { userid });
    alert("User Deleted Scuccessfully.");
    window.location.reload();
  } catch (err) {
    alert("Something Went Wrong.");
    console.log(err);
  }
};
