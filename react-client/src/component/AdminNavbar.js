import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser]);

  return (
    <div>
      <div className="row justify-content-center m-2 p-3 shadow-lg p-3 mb-5 bg-white rounded">
        <div className="col-md-10">
          <h2 className="mb-3" style={{ fonstSize: "35px" }}>
            Admin Panel
          </h2>
          <ul className="adminFunctions">
            <li>
              <Link style={{ color: "white" }} to="/admin/userslist">
                Users List
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/admin/pizzaslist">
                Pizzas List
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/admin/addpizza">
                Add New Pizza
              </Link>
            </li>
            <li>
              <Link style={{ color: "white" }} to="/admin/orderslist">
                Orders List
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
