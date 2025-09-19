import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      if (data.inactive) {
        toast.error("You have been logged out. Login again.");
        logout();
        return;
      }

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const makeStripePayment = async (plan) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const stripe = await loadStripe(stripePublishableKey);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/payment/create-checkout-session",
        {
          planId: plan.id,
          price: plan.price,
          credits: plan.credits,
          desc: plan.desc,
        },
        { headers: { token } }
      );

      if (data.success) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        toast.error(data.message || "Payment initiation failed.");
      }
    } catch (error) {
      toast.error(error.message || "Payment initiation failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    toast.error("Logged out");
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = {
    user,
    setUser,
    theme,
    toggleTheme,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
    makeStripePayment,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
