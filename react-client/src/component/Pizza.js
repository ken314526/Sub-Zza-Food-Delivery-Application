import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addToCart } from "../actions/cartActions";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

export default function Pizza({ pizza }) {
  AOS.init();

  const [quantity, setQuantity] = useState(1);
  const [variant, setvariant] = useState("small");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addtocart = () => {
    toast.info("Added to cart!", {
      autoClose: 3000,
    });
    dispatch(addToCart(pizza, quantity, variant));
  };

  return (
    <div
      data-aos="zoom-in"
      className="shadow-lg p-3 mb-5 bg-white rounded"
      key={pizza._id}
    >
      <div onClick={handleShow}>
        <h1>{pizza.name}</h1>
        <img className=" pizza-img img-fluid" src={pizza.image} alt="" />
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <p>variants</p>
          <select
            className="form-control"
            value={variant}
            onChange={(e) => {
              setvariant(e.target.value);
            }}
          >
            {pizza.variants.map((variant) => {
              return (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              );
            })}
          </select>
        </div>
        <div className="m-1 w-100">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-2">
            Price: {pizza.prices[0][variant] * quantity} Rs/-
          </h1>
        </div>
        <div className="m-1 w-100">
          <button className="btn" onClick={addtocart}>
            ADD TO CART
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="img-fluid" src={pizza.image} alt="" />
          <p>{pizza?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
