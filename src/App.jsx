import { useState } from "react";

import "./App.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/theme.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-element.css";
import "./stylesheets/layout.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isTokenExp } from "./Utils/jwt";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  const token = localStorage.getItem("token");
  if (isTokenExp(token)) {
    localStorage.removeItem("token");
  }

  return <></>;
}

export default App;
