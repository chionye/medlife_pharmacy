/** @format */

import { NavLink, useLocation } from "react-router-dom";
import { NavbarItems } from "../utils/navbar/navbarItems";
import logo from "@/assets/pharm_logo.svg";
import { Icons } from "@/constants/svgs";
// import { getConfigByRole } from "@/services/storage";

const NavbarItem = ({
  to,
  icon,
  label,
  location,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  location: string;
}) => (
  <div className='flex flex-col justify-center items-center mt-1'>
    <div
      className={`py-2 px-3 rounded-[7.43px] w-fit group hover:bg-[#FFFFFF38] ${
        location.indexOf(to) !== -1 && "bg-[#FFFFFF38]"
      } transition-all mb-2`}>
      <NavLink to={to} className={`text-white w-full`}>
        <span className='flex flex-col justify-left items-center gap-2'>
          {icon}
          <span>{label}</span>
        </span>
      </NavLink>
    </div>
    {label !== "Settings" && (
      <div className='w-[87.66px] h-[1px] bg-white'></div>
    )}
  </div>
);

const Navbar = () => {
  const location = useLocation();
  // const role = getConfigByRole();
  const settings = NavbarItems["pharmacy"];
  // const settings = role ? NavbarItems[role] : [];

  return (
    <div className='auto-rows-max text-sm lg:flex hidden bg-[#585BA8] relative h-screen w-full shadow-lg overflow-y-scroll'>
      <div className='w-full pr-3'>
        <div className='flex justify-center items-center my-8'>
          <div className='w-20 h-20 flex justify-center items-center bg-[#FF2C330A] rounded-full'>
            <NavLink to={"https://medlife-frontend-i1bz.vercel.app/"}>
              <img src={logo} alt='logo' className='rounded-full' />
            </NavLink>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          {settings.map((item: any, index: number) => (
            <NavbarItem key={index} {...item} location={location.pathname} />
          ))}
          <div
            className={`py-2 px-3 rounded-[7.43px] w-fit group hover:bg-[#FFFFFF38] transition-all mb-2`}>
            <NavLink to={"/"} className={`text-white w-full`}>
              <span className='flex flex-col justify-left items-center gap-2'>
                <Icons.logout />
                <span>Logout</span>
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
