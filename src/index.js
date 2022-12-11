import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import Header from "./components/header";
import Landing from "./components/landing";
import SignIn from "./components/signin";
import User from "./components/user";
import Footer from "./components/footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="index" element={<Landing />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="user" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  </Provider>
);
