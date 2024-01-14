import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import Success from "../component/Success";
import Error from "../component/Error";

export default function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const dispatch = useDispatch();
  const registerState = useSelector((state) => state.registerUserReducer);
  const { error, loading, success } = registerState;

  const handleRegister = () => {
    if (password !== cpassword) {
      alert("Passwords don't match.");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(registerUser(user));
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
          {loading && <Loading />}
          {success && <Success success="User registerd successfully." />}
          {error && <Error error="Email already registered." />}
          <h2 className="" style={{ fontSize: "45px" }}>
            Register
          </h2>
          <div className="text-start">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              type="name"
              placeholder="Name"
              className="form-control"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              placeholder="Email"
              className="form-control"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="Password"
              className="form-control"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
            <input
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRegister();
                }
              }}
            />
            <button onClick={handleRegister} className="btn mt-3">
              REGISTER
            </button>
          </div>
          <h5 className="text-start mt-3">
            Already have an account ?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#282c34" }}
            >
              <span>Login</span>
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
