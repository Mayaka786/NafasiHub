import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginRegister() {
  const [isActive, setIsActive] = useState(false); // Toggle login/register slide
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  }); // Registration form state
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  }); // Login form state

  const navigate = useNavigate();

  // Toggle switch between login and register
  const handleSwitch = () => {
    setIsActive(!isActive);
  };

  // Handle registration input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle login input changes
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (formValues.password.length < 6|| formValues.username.length < 3|| formValues.mobile.length < 10) {
    toast.error("Invalid input fields", { position: "top-right" });
    return;
  }
    try {
      const response = await axios.post("http://localhost:3000/api/register", formValues, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Registered:", response.data);
      // setIsActive(true); // Switch to login slide
      navigate("/home");
      toast.success("Registration successful! Please log in.", {
        position: "top-right",
        autoClose: 2000,
        
      });
      // Reset form
      setFormValues({ username: "", email: "", mobile: "", password: "" });
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      toast.error("Registration failed: " + (error.response?.data?.error || "Server error"), {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", loginValues, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Logged in:", response.data);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
      });
      // Reset login form
      setLoginValues({ email: "", password: "" });
      // Redirect to home
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Login failed: " + (error.response?.data?.error || "Server error"), {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className={`content justify-content-center align-items-center d-flex shadow-lg ${isActive ? "active" : ""}`}
      id="content"
    >
      {/* Toast Container */}
      <ToastContainer />

      {/* Register Form */}
      <div className="col-md-6 d-flex justify-content-center">
        <form onSubmit={handleRegister}>
          <div className="header-text mb-4">
            <h1>Create Account</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="form-control form-control-lg bg-light fs-6"
              value={formValues.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control form-control-lg bg-light fs-6"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              className="form-control form-control-lg bg-light fs-6"
              value={formValues.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control form-control-lg bg-light fs-6"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button type="submit" className="btn border-white text-white w-50 fs-6">Register</button>
          </div>
        </form>
      </div>

      {/* Login Form */}
      <div className="col-md-6 right-box">
        <form onSubmit={handleLogin}>
          <div className="header-text mb-4">
            <h1>Sign In</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="form-control form-control-lg bg-light fs-6"
              value={loginValues.email}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="form-control form-control-lg bg-light fs-6"
              value={loginValues.password}
              onChange={handleLoginInputChange}
            />
          </div>
          <div className="input-group mb-5 d-flex justify-content-between">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label htmlFor="formcheck" className="form-check-label text-secondary">
                <small>Remember me</small>
              </label>
            </div>
            <div className="forgot">
              <small><Link to="/forgot-password">Forgot Password?</Link></small>
            </div>
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button type="submit" className="btn border-white text-white w-50 fs-6">Login</button>
          </div>
        </form>
      </div>

      {/* Switch Panel */}
      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-left">
            <h1>Hello, Again</h1>
            <p>We are happy you are back</p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="login"
              onClick={handleSwitch}
            >
              Login
            </button>
          </div>
          <div className="switch-panel switch-right">
            <h1>Welcome</h1>
            <p>Join NafasiHub, Explore a New Experience</p>
            <button
              className="hidden btn border-white text-white w-50 fs-6"
              id="register"
              onClick={handleSwitch}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;