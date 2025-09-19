import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <img src={assets.logo} alt="" width={150} className="block dark:hidden" />
      <img
        src={assets.logo_dark}
        alt=""
        width={150}
        className="hidden dark:block"
      />

      <p className="flex-1 text-center text-sm text-gray-500 dark:text-[#c6c6c6] max-sm:hidden">
        Copyright @Khushi Mohammd | All right reserved.
      </p>

      <div className="flex gap-2.5">
        <img
          src={assets.facebook_icon}
          alt=""
          width={35}
          className="block dark:hidden"
        />
        <img
          src={assets.facebook_icon_dark}
          alt=""
          width={35}
          className="hidden dark:block"
        />
        <img
          src={assets.twitter_icon}
          alt=""
          width={35}
          className="block dark:hidden"
        />
        <img
          src={assets.twitter_icon_dark}
          alt=""
          width={35}
          className="hidden dark:block"
        />
        <img
          src={assets.instagram_icon}
          alt=""
          width={35}
          className="block dark:hidden"
        />
        <img
          src={assets.instagram_icon_dark}
          alt=""
          width={35}
          className="hidden dark:block"
        />
      </div>
    </div>
  );
};

export default Footer;
