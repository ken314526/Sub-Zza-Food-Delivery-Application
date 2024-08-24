import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderActions";
import Loading from "./Loading";
import Error from "./Error";
import Success from "./Success";
import { toast } from "react-toastify";

export default function Payment() {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;
  const amount = localStorage.getItem("subtotal");
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paid, setPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [validateName, setValidateName] = useState(false);
  const [validateCNo, setValidateCNo] = useState(false);
  const [validateDate, setValidateDate] = useState(false);
  const [validateCVV, setValidateCVV] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/";
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      street === "" ||
      country === "" ||
      city === "" ||
      pincode === ""
    ) {
      toast.error("Enter valid details!");
      return;
    }

    if (
      paymentMethod === "card" &&
      (!validateName || !validateCNo || !validateDate || !validateCVV)
    ) {
      toast.error("Enter valid Card details!");
      return;
    }

    const userInfo = {
      name,
      email,
      address: {
        street,
        country,
        city,
        pincode,
      },
    };

    setPaid(true);
    dispatch(placeOrder(userInfo, amount));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
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
                  <div className="col-12">
                    <label htmlFor="name" className="form-label">
                      Full name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Street
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-4">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <select
                        className="form-select mt-2"
                        id="city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option>Choose...</option>
                        <option>Kanpur</option>
                        <option>California</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-select mt-2"
                        id="country"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">Choose...</option>
                        <option>India</option>
                        <option>United States</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        id="pincode"
                        placeholder="12356"
                        value={pincode}
                        onChange={(e) => {
                          if (e.target.value.length > 15) {
                            return;
                          }
                          setPincode(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                  />
                  <label className="form-check-label" htmlFor="same-address">
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
                      type="radio"
                      className="form-check-input"
                      checked={paymentMethod === "card"}
                      onChange={() => handlePaymentMethodChange("card")}
                    />
                    <label className="form-check-label" htmlFor="card">
                      Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="cash-on-delivery"
                      name="paymentMethod"
                      type="radio"
                      className="form-check-input"
                      checked={paymentMethod === "cash"}
                      onChange={() => handlePaymentMethodChange("cash")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cash-on-delivery"
                    >
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="row gy-3">
                    <div className="col-md-6">
                      <label htmlFor="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        placeholder="Full Name"
                        onChange={(e) => {
                          if (e.target.value.length === 0) {
                            setValidateName(false);
                          }
                          setValidateName(true);
                        }}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cc-number" className="form-label">
                        Card number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        required
                        pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                        onChange={(e) => {
                          if (e.target.value.length === 0) {
                            setValidateCNo(false);
                          }
                          setValidateCNo(true);

                          let inp = e.target.value;
                          inp = inp.replace(/\D/g, "");
                          inp = inp.replace(/(.{4})/g, "$1-").trim();
                          if (inp.endsWith("-")) {
                            inp = inp.slice(0, -1);
                          }
                          e.target.value = inp;
                        }}
                        minLength="19"
                        maxlength="19"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder="MM/YY"
                        required
                        pattern="\d{2}/\d{2}"
                        onChange={(e) => {
                          if (e.target.value.length === 0) {
                            setValidateDate(false);
                          }
                          setValidateDate(true);

                          let inp = e.target.value;
                          inp = inp.replace(/\D/g, "");
                          if (inp.length > 2) {
                            inp = inp.replace(/(\d{2})(\d{0,2})/, "$1/$2");
                          }
                          e.target.value = inp;
                        }}
                        maxlength="5"
                        minLength="5"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="cc-cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        placeholder="CVV"
                        required
                        pattern="\d{3,4}"
                        onChange={(e) => {
                          if (e.target.value.length === 0) {
                            setValidateCVV(false);
                          }
                          setValidateCVV(true);

                          let inp = e.target.value;
                          inp = inp.replace(/\D/g, "");
                          if (inp.length > 4) {
                            return;
                          }
                          e.target.value = inp;
                        }}
                        minLength="4"
                        maxlength="4"
                      />
                    </div>
                  </div>
                )}

                <hr className="my-4" />

                <button
                  className="w-100 btn btn-primary btn-lg mb-5"
                  type="submit"
                >
                  {paid ? "Paid" : "Pay"} Rs. {amount} /-
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
