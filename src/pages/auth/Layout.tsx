/** @format */

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo_2 from "@/assets/logo_2.svg";
import logo from "@/assets/logo.svg";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className='bg-white flex justify-center'>
      <div
        className={`lg:w-full lg:flex flex-col hidden h-screen lg:pl-10 lg:pt-10 pl-5 pt-5 ${
          location.pathname === "/"
            ? "bg-[url('/images/bg_2.png')]"
            : "bg-[url('/images/bg_1.png')]"
        } bg-cover`}>
        <img src={logo_2} alt='Logo' className=' lg:w-16' />
      </div>
      <div className='w-full'>
        {(location.pathname === "/" || location.pathname === "/register") && (
          <div className='flex lg:justify-end justify-center lg:shadow-none shadow-lg'>
            <div className='flex lg:gap-10 gap-10 lg:justify-start justify-center items-center lg:w-4/6 w-full py-5'>
              <p className='font-normal text-lg'>
                {location.pathname === "/"
                  ? "Don’t Have an Account?"
                  : "Already Have an Account?"}
              </p>
              <NavLink
                to={location.pathname === "/" ? "/register" : "/"}
                className={
                  "bg-[#D20606] py-3 lg:px-9 px-5 lg:text-lg text-white flex justify-center"
                }>
                {location.pathname === "/" ? "Register" : "Login"}
              </NavLink>
            </div>
          </div>
        )}
        <div
          className={`${
            location.pathname === "/" || location.pathname === "/register"
              ? "mt-10"
              : " mt-32"
          }`}>
          <div className='lg:hidden flex justify-center'>
            <img src={logo} alt='logo' />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
