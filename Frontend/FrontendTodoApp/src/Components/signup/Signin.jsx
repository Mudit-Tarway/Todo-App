import React from "react";
import "./signup.css";
import SHeadingComp from "./SHeadingComp";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        inputs
      );
      if (response.status === 200) {
        const token = response.data.token;
        const userId = response.data.user.id;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        alert("Login Successful");
        history("/todo");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Wrong Credentials");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="Signup">
      <div className="container">
        <div className="row">
          <div className="d-lg-block d-none col-lg-4 column col-left d-flex jsutify-content-center align-items-center">
            <SHeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 column d-flex jsutify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-5">
              <input
                type="email"
                placeholder="Enter your Email"
                className="p-2 my-3 "
                name="email"
                value={inputs.email}
                onChange={change}
              />
              <input
                type="password"
                placeholder="Enter your Password"
                className="p-2 my-3 "
                name="password"
                value={inputs.password}
                onChange={change}
              />
              <button className="signup-btn py-2" onClick={submit}>
                Signin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
