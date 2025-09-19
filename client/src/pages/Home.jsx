import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import Testimonials from "../components/Testimonials";
import GenerateBtn from "../components/GenerateBtn";

const Home = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get("payment_status");

    if (paymentStatus === "success") {
      toast.success("Payment successful! Your credits have been added.");
    }

    if (paymentStatus) {
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
    </div>
  );
};

export default Home;
