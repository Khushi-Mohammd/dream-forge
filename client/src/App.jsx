import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

import { AppContext } from "./context/AppContext";

const App = () => {
  const { showLogin, theme } = useContext(AppContext);

  return (
    <div
      className="px-4 sm:px-10 md:px-14 lg:px-28
      min-h-screen
      bg-gradient-to-b from-teal-50 to-orange-50
      dark:bg-[#0c0c0c] dark:text-white
      dark:bg-[radial-gradient(ellipse_100%_500px_at_35%_0%,rgba(10,84,163,0.35)_0%,transparent_90%)]"
    >
      <ToastContainer position="bottom-right" theme={theme} />
      <Navbar />

      {showLogin && <Login />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
