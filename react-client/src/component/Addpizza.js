import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../actions/pizzaActions";
import AdminNavbar from "./AdminNavbar";
import Error from "./Error";
import Loading from "./Loading";
import Success from "./Success";

export default function Addpizza() {
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setcategory] = useState("");

  const dispatch = useDispatch();
  const addPizzaState = useSelector((state) => state.addPizzaReducers);
  const { success, error, loading } = addPizzaState;

  const handleSubmit = (e) => {
    e.preventDefault();

    const pizza = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      },
    };

    dispatch(addPizza(pizza));
  };

  return (
    <div className="p-3">
      <AdminNavbar />
      <div className="shadow-lg m-3 p-3 mb-5 bg-white rounded">
        <h2>Add Pizza</h2>
        {loading && <Loading />}
        {error && <Error error="Something Went Wrong." />}
        {success && <Success success="New Pizza Added Successfully." />}
        <div className="text-start">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
            />
            <input
              type="text"
              className="form-control"
              value={smallPrice}
              onChange={(e) => {
                setSmallPrice(e.target.value);
              }}
              placeholder="Small Varient Price"
            />
            <input
              type="text"
              className="form-control"
              value={mediumPrice}
              onChange={(e) => {
                setMediumPrice(e.target.value);
              }}
              placeholder="Medium Varient Price"
            />
            <input
              type="text"
              className="form-control"
              value={largePrice}
              onChange={(e) => {
                setLargePrice(e.target.value);
              }}
              placeholder="Large Varient Price"
            />

            <select
              class="form-control mt-2"
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            >
              <option value="veg">Veg</option>
              <option value="nonveg">Non Veg</option>
            </select>

            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
            />
            <input
              type="text"
              className="form-control"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              placeholder="Image URL"
            />
            <button
              className="btn mt-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              type="submit"
            >
              Add Pizza
            </button>
          </form>
        </div>
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
                  Add Pizza
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">Do You Want To Add The Pizza ?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleSubmit}
                >
                  Add
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
