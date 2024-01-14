import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";

export default function Navbar() {
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-body rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            SUB-ZZA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ boxShadow: "none" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {currentUser ? (
                  <div className="dropdown mt-2">
                    <a
                      style={{ textDecoration: "none", color: "gray" }}
                      className="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {currentUser.name}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          style={{ color: "gray" }}
                          className="dropdown-item"
                          href="/orders"
                        >
                          Orders
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/"
                          style={{ color: "gray" }}
                          onClick={() => {
                            dispatch(logoutUser(currentUser._id));
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                )}
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  Cart ({cartState.cartItems ? cartState.cartItems.length : 0})
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
