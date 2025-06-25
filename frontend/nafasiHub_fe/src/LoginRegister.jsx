import React, { useState } from "react";

function LoginRegister() {
  const [isActive, setIsActive] = useState(false); // State to toggle .active class

  // Toggle the .active class on click
  const handleSwitch = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`content justify-content-center align-items-center d-flex shadow-lg ${isActive ? "active" : ""}`}
      id="content"
    >
      {/* Register Form */}
      <div className="col-md-6 d-flex justify-content-center">
        <form>
          <div className="header-text mb-4">
            <h1>Create Account</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control form-control-lg bg-light fs-6"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg bg-light fs-6"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-light fs-6"
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white text-white w-50 fs-6">Register</button>
          </div>
        </form>
      </div>

      {/* Login Form */}
      <div className="col-md-6 right-box">
        <form>
          <div className="header-text mb-4">
            <h1>Sign In</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg bg-light fs-6"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg bg-light fs-6"
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
              <small><a href="#">Forgot Password?</a></small>
            </div>
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button className="btn border-white text-white w-50 fs-6">Login</button>
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