import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  addPizzaReducers,
  editPizzaReducers,
  getAllPizzasReducers,
  getPizzaByIdReducers,
} from "./reducers/pizzaReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  getAllUsersReducers,
  loginUserReducer,
  registerUserReducer,
} from "./reducers/userReducers";
import {
  getAllOrdersReducer,
  getUserOrdersReducer,
  placeOrderReducer,
} from "./reducers/orderReducers";

const finalReducer = combineReducers({
  getAllPizzasReducers: getAllPizzasReducers,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer: getUserOrdersReducer,
  addPizzaReducers: addPizzaReducers,
  getPizzaByIdReducers: getPizzaByIdReducers,
  editPizzaReducers: editPizzaReducers,
  getAllOrdersReducer: getAllOrdersReducer,
  getAllUsersReducers: getAllUsersReducers,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: {
    currentUser: currentUser,
  },
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
