import { useState } from "react";

import "./App.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/theme.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-element.css";
import "./stylesheets/layout.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/common/Login/Login";
import RegisterPage from "./pages/common/Register/Register.jsx";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserHomePage from "./pages/common/Home/UserHome";
import AdminHomePage from "./pages/common/Home/AdminHome";
import ResultsPage from "./pages/user/Results/Common_Results";
import ProfilePage from "./pages/user/Profile/Profile";
import WriteQuiz from "./pages/user/WriteQuiz/Write_Quizs";
import QuizsPage from "./pages/admin/Quizs/Quizs";
import AddEditQuiz from "./pages/admin/Quizs/AddEditQuiz";


import Loader from "./components/Loader.jsx";

import { useSelector } from "react-redux";
import { isTokenExp } from "./Utils/jwt";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  const token = localStorage.getItem("token");
  if (isTokenExp(token)) {
    localStorage.removeItem("token");
  }

  return (
    <>
      {loading && <Loader />}

      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/results"
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/quizs"
            element={
              <ProtectedRoute>
                <QuizsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/write-quiz/:id"
            element={
              <ProtectedRoute>
                <WriteQuiz />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
