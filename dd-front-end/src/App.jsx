import React from "react";
import RegistrationPage from "./components/Registration/RegistrationPage";
// import RegPage from "./components/RegPage";
// import OtpAuth from "./components/OTP/OtpAuth";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import home from "./components/Home/home.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/"
        element={<home />} />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/register"
        element={<RegistrationPage />}
      />
    </Routes>

  );
}
