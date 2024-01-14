import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaById, editPizza } from "../actions/pizzaActions";
import AdminNavbar from "./AdminNavbar";
import Error from "./Error";
import Loading from "./Loading";
import Success from "./Success";

export default function Editpizza({ match }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [smallPrice, setSmallPrice] = useState("");
  const [mediumPrice, setMediumPrice] = useState("");
  const [largePrice, setLargePrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setcategory] = useState("");

  const pizzaid = window.location.href.split("/")[5];

  const getPizzaByIdState = useSelector((state) => state.getPizzaByIdReducers);
  const { pizza, error, loading } = getPizzaByIdState;

  const editPizzaState = useSelector((state) => state.editPizzaReducers);
  const { editsuccess, editerror, editloading } = editPizzaState;

  useEffect(() => {
    if (pizza) {
      if (pizza._id === pizzaid) {
        setName(pizza.name);
        setSmallPrice(pizza.prices[0]["small"]);
        setMediumPrice(pizza.prices[0]["medium"]);
        setLargePrice(pizza.prices[0]["large"]);
        setcategory(pizza.category);
        setDescription(pizza.description);
        setImage(pizza.image);
      } else {
        dispatch(getPizzaById(pizzaid));
      }
    } else {
      dispatch(getPizzaById(pizzaid));
    }
  }, [dispatch, pizzaid, pizza]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPizza = {
      _id: pizzaid,
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
    dispatch(editPizza(updatedPizza));
  };

  return (
    <div>
      <AdminNavbar />
      <div className="shadow-lg m-3 p-3 mb-5 bg-white rounded">
        <h1>Edit Pizza</h1>
        {loading && <Loading />}
        {error && <Error error="Something Went Wrong." />}
        {editloading && <Loading />}
        {editerror && <Error error="Something Went Wrong." />}
        {editsuccess && <Success success="Pizza Updated Successfully." />}

        <div className="text-start">
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
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);
            }}
            placeholder="Category"
          />
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
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn mt-3"
          >
            Save Changes
          </button>
        </div>
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
                Updating Pizza
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Do You Want To Save The Changes ?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
              >
                Save
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
  );
}
