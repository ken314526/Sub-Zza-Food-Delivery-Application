import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const res = await axios.get(`${url}/api/pizzas/getallpizzas`);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: err });
  }
};

export const getPizzaById = (pizzaid) => async (dispatch) => {
  dispatch({ type: "GET_PIZZABYID_REQUEST" });
  try {
    const res = await axios.post(`${url}/api/pizzas/getpizzabyid`, { pizzaid });
    dispatch({ type: "GET_PIZZABYID_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_PIZZABYID_FAILED", payload: err });
  }
};

export const filterPizzas = (searchKey, category) => async (dispatch) => {
  let filteredPizzas;
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const res = await axios.get(`${url}/api/pizzas/getallpizzas`);

    filteredPizzas = res.data.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchKey)
    );

    if (category !== "all") {
      filteredPizzas = filteredPizzas.filter(
        (pizza) => pizza.category === category
      );
    }

    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredPizzas });
  } catch (err) {
    console.log(err);
    dispatch({ type: "GET_PIZZAS_FAILED", payload: err });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const res = await axios.post(`${url}/api/pizzas/addpizza`, {
      pizza,
    });
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
    window.location.href = "/admin/pizzaslist";
  } catch (err) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: err });
  }
};

export const editPizza = (editedPizza) => async (dispatch) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {
    const res = await axios.post(`${url}/api/pizzas/editpizza`, {
      editedPizza,
    });
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
    window.location.href = "/admin/pizzaslist";
  } catch (err) {
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: err });
  }
};

export const deletePizza = (pizzaid) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/api/pizzas/deletepizza`, {
      pizzaid,
    });
    alert("Pizza Deleted Successfully.");
    console.log(res);
    window.location.reload();
  } catch (err) {
    alert("Something Went Wrong.");
    console.log(err);
  }
};
