import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePizza, getAllPizzas } from "../actions/pizzaActions";
import Error from "./Error";
import Loading from "./Loading";
import AdminNavbar from "./AdminNavbar";

export default function Pizzaslist() {
  const dispatch = useDispatch();
  const [pizzaid, setPizzaid] = useState("");
  const pizzasState = useSelector((state) => state.getAllPizzasReducers);
  const { pizzas, error, loading } = pizzasState;

  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch]);

  return (
    <div>
      <div className="p-3">
        <AdminNavbar />
        <h2>Pizzas List</h2>
        {loading && <Loading />}
        {error && <Error error="Something Went Wrong." />}

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Prices</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pizzas &&
              pizzas.map((pizza) => {
                return (
                  <tr>
                    <td>{pizza.name}</td>
                    <td>
                      Small: {pizza.prices[0]["small"]}
                      <br />
                      Medium: {pizza.prices[0]["medium"]}
                      <br />
                      Large: {pizza.prices[0]["large"]}
                    </td>
                    <td>{pizza.category}</td>
                    <td>
                      <Link to={`/admin/editpizza/${pizza._id}`}>
                        <i className="fa-sharp fa-solid fa-edit m-1"></i>
                      </Link>
                      <i
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setPizzaid(pizza._id);
                        }}
                        className="fa-sharp fa-solid fa-trash m-1"
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Deleting Pizza
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Do You Want To Delete This Pizza ?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    dispatch(deletePizza(pizzaid));
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
