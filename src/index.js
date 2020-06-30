import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

import authDB from "./authDB";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
  }
  body {
  display: flex;
  // padding-top: 40px;
  // padding-bottom: 40px;
  background-color: #f5f5f5;
}
`;

const App = () => {
  const [view, setView] = useState("login");

  useEffect(() => {
    if (authDB.session()) {
      setView("app");
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {view === "login" && <Login setView={setView} />}
      {view === "signup" && <SignUp setView={setView} />}
      {view === "app" && <Home setView={setView} />}
    </>
  );
};

render(<App />, document.getElementById("root"));
