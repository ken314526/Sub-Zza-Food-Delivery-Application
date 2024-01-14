import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
import Error from "../component/Error";

export default function Loginscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginUserReducer);
  const { loading, error } = loginState;

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const hadleLogin = () => {
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="" style={{ fontSize: "45px" }}>
            Login
          </h2>
          {loading && <Loading />}
          {error && <Error error="Invalid Credentials." />}
          <div className="text-start">
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
                  hadleLogin();
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
                  hadleLogin();
                }
              }}
            />
            <button onClick={hadleLogin} className="btn mt-3">
              LOGIN
            </button>
          </div>
          <h5 className="text-start mt-3">
            Don't have an account ?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#282c34" }}
            >
              <span>Register</span>
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}
