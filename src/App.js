import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import FundTransferPage from "./pages/FundTransferPage";
import NotFoundPage from "./pages/NotFoundPage"; // A fallback page for undefined routes
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = user?.role === "admin";
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <Layout user={user}>
                <DashboardPage isAdmin={isAdmin} user={user} />
              </Layout>
            }
          />

          <Route
            path="/fund-transfer"
            element={
              <Layout user={user}>
                <FundTransferPage />
              </Layout>
            }
          />

          <Route
            path="/settings"
            element={
              <Layout user={user}>
                <SettingsPage isAdmin={isAdmin} user={user} />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
