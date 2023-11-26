import React, { useState, useContext } from "react";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import queryString from "query-string";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorRes, setErrorRes] = useState(null);

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = () => {
    const fetchSignIn = async () => {
      try {
        const params = {
          email: email,
          password: password,
        };
        const query = "?" + queryString.stringify(params);
        const response = await UserAPI.postLogin(query);

        // console.log("Login by username, password:--", response);
        // localStorage.setItem("user-admin", response.user.email);
        localStorage.setItem("admin-token", response.user.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.user.email,
        });
      } catch (error) {
        // console.log(error.response?.data);
        setErrorRes(error.response?.data);
      }
    };
    fetchSignIn();
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errorRes?.email && (
                  <span className="text-danger">{errorRes?.email}</span>
                )}

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errorRes?.password && (
                  <span className="text-danger">{errorRes?.password}</span>
                )}

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
