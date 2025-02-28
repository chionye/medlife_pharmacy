/** @format */

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import image from "@/assets/auth.svg";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className='bg-[#585BA8] flex justify-center'>
      {location.pathname !== "/onboarding" && (
        <div
          className={`lg:w-2/5 lg:flex flex-col items-center justify-center hidden h-screen lg:pl-10 lg:pt-10 pl-5 pt-5`}>
          <img src={image} alt='Logo' className='w-3/5' />
          <div className='px-10 text-center pb-10'>
            <p className='text-white text-4xl font-bold'>
              Welcome Back to <br /> Medlife Link Pharmacy
            </p>
            <p className='text-white text-2xl font-normal mt-5'>
              Log in to grow your store, boost revenue, and reach a larger
              customer base while managing orders effortlessly.
            </p>
            <p className='mt-10 text-[10px] text-white'>
              Powered By <br />
              MedLife Link <br /> All Right Reserved
            </p>
          </div>
        </div>
      )}
      <div
        className={`${
          location.pathname !== "/onboarding"
            ? "lg:w-3/5 lg:rounded-l-[80px]"
            : "w-full"
        } bg-white px-10`}>
        <div
          className={`${
            location.pathname === "/" || location.pathname === "/register"
              ? "mt-10"
              : " mt-4"
          }`}>
          {location.pathname !== "/onboarding" && (
            <>
              <div className='flex justify-center'>
                <img src={logo} alt='logo' />
              </div>
              <div>
                <p className='text-center text-5xl font-semibold text-[#585BA8] leading-10'>
                  Welcome{" "}
                  {location.pathname === "/" || location.pathname === "/login"
                    ? "Back"
                    : ""}{" "}
                  to <br /> Medlife Link Pharmacy
                </p>
                <p className='text-center text-3xl font-medium text-[#585BA8]'>
                  {location.pathname === "/" || location.pathname === "/login"
                    ? "Log In"
                    : "Register"}
                </p>
              </div>
            </>
          )}

          {children}
          <div className='flex justify-center'>
            {(location.pathname === "/" || location.pathname === "/login") && (
              <div className='text-center border border-[#008B4C38] lg:w-3/4 text-lg mt-10 py-2 rounded-[10px]'>
                <p className='text-lg text-[#1D252D]'>
                  You don't have an account?{" "}
                  <NavLink to={"/register"} className={"text-[#585BA8]"}>
                    Register Account
                  </NavLink>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
