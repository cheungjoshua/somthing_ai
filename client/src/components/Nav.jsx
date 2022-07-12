import React from "react";

const HOME = "HOME";

export default function Nav(props) {
  return (
    <header>
      <div className="container">
        <div
          className="logo"
          onClick={() => {
            props.setPage(HOME);
          }}
        >
          <h1 className="main">something</h1>
          <span className="sub">.AI</span>
        </div>
        <nav>
          <button
            className="btn"
            onClick={() => {
              props.setLogInShow("show");
            }}
          >
            Login
          </button>
          <button
            className="btn btn2"
            onClick={() => {
              props.setSignUpShow("show");
            }}
          >
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
}