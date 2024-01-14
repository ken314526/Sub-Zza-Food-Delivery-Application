import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Loading from "./Loading";
import Error from "./Error";
import Success from "./Success";

export default function Payment() {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  const [paymentMethod, setPaymentMethod] = useState("card");
  const amount = localStorage.getItem("subtotal");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      name: name,
      email: email,
      address: {
        street: street,
        country: country,
        city: city,
        pincode: pincode,
      },
    };
    dispatch(placeOrder(userInfo, amount));
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something Went Wrong." />}
      {success && <Success success="Your Order Placed Successfully." />}
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <h2>Payment Info</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-8">
              <form
                className="needs-validation"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="row g-3">
                  <div className="col">
                    <label for="lastName" className="form-label">
                      Full name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label for="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label for="address" className="form-label">
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      value={street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label for="city" className="form-label">
                      City
                    </label>
                    <select
                      className="form-select"
                      id="city"
                      required
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      <option>Choose...</option>
                      <option>Kanpur</option>
                      <option>California</option>
                    </select>
                  </div>

                  <div className="col-md-5">
                    <label for="country" className="form-label">
                      Country
                    </label>
                    <select
                      className="form-select"
                      id="country"
                      required
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    >
                      <option value="">Choose...</option>
                      <option>India</option>
                      <option>United States</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label for="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder="12356"
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                  />
                  <label className="form-check-label" for="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment</h4>

                <div className="my-3">
                  <div className="form-check">
                    <input
                      id="card"
                      name="paymentMethod"
                      type="checkbox"
                      className="form-check-input"
                      required
                      onClick={() => {
                        setPaymentMethod("card");
                      }}
                    />
                    <label className="form-check-label" for="card">
                      Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="cash-on-delivery"
                      name="paymentMethod"
                      type="checkbox"
                      className="form-check-input"
                      required
                      onClick={() => {
                        setPaymentMethod("cash");
                      }}
                    />
                    <label className="form-check-label" for="cash-on-delivery">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {paymentMethod === "card" ? (
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label for="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="cc-number" className="form-label">
                        Credit card number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder="1234 1234 1234 1234"
                        required
                        minLength="16"
                      />
                    </div>

                    <div className="col-md-3">
                      <label for="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder="MM/YY"
                        required
                        minLength="4"
                      />
                    </div>

                    <div className="col-md-3">
                      <label for="cc-cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        placeholder="CVV"
                        required
                        minLength="4"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <hr className="my-4" />

                <button
                  className="w-100 btn btn-primary btn-lg mb-5"
                  type="submit"
                  onClick={() => {
                    setPaid(true);
                  }}
                >
                  {paid ? "Paid" : `Pay Rs. ${amount} /-`}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
