import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, theme, toggleTheme, setShowLogin, logout, credit } =
    useContext(AppContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img
          src={assets.logo}
          alt=""
          className="w-28 sm:w-32 lg:w-40 block dark:hidden"
        />
        <img
          src={assets.logo_dark}
          alt=""
          className="w-28 sm:w-32 lg:w-40 hidden dark:block"
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-[#36415355]"
          >
            {theme === "dark" ? (
              <img src={assets.theme_light} alt="" className="w-5" />
            ) : (
              <img src={assets.theme_dark} alt="" className="w-5" />
            )}
          </button>
        </div>

        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 dark:bg-[#13466138] hover:cursor-pointer px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs  sm:text-sm font-medium text-gray-600 dark:text-white">
                Credits left : {credit}
              </p>
            </button>

            <p className="text-gray-600 dark:text-white max-sm:hidden pl-4">
              Hi, {user.name}
            </p>

            <div
              ref={profileRef}
              onClick={() => setShowLogout((prev) => !prev)}
              className="relative hover:cursor-pointer"
            >
              <img
                src={assets.profile_icon}
                alt=""
                className="w-10 drop-shadow block dark:hidden"
              />
              <img
                src={assets.profile_icon_dark}
                alt=""
                className="w-10 drop-shadow hidden dark:block bg-[#323232] rounded-full"
              />

              {showLogout && (
                <div className="absolute top-0 right-0 z-10 rounded pt-12">
                  <ul className="list-none m-0 p-2 rounded-md text-sm bg-white dark:bg-[#13466138]">
                    <li
                      onClick={logout}
                      className="py-1 px-2 cursor-pointer pr-10"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 dark:bg-[#007aff] text-white px-7 py-2 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
