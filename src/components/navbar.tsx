/** @format */

import { NavLink, useLocation } from "react-router-dom";
import { NavbarItems } from "../utils/navbar/navbarItems";
import logo from "@/assets/logo.svg";
import { getConfigByRole } from "@/services/storage";

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
  <div
    className={`rounded-e-3xl pl-10 py-3 group hover:bg-[#585BA8] ${
      location.indexOf(to) !== -1 && "bg-[#585BA8]"
    } transition-all mb-2`}>
    <NavLink
      to={to}
      className={`text-gray-600 w-full group-hover:text-white ${
        location.indexOf(to) !== -1 && "text-white"
      }`}>
      <span className='flex justify-left items-center gap-2'>
        {icon}
        <span>{label}</span>
      </span>
    </NavLink>
  </div>
);

const Navbar = () => {
  const location = useLocation();
  const role = getConfigByRole();
  const settings = role ? NavbarItems[role] : [];

  return (
    <div className='auto-rows-max text-sm lg:flex hidden bg-[#F3FCFC] relative h-screen w-full shadow-lg'>
      <div className='w-full pr-3'>
        <div className='flex justify-center items-center my-8'>
          <div className='w-20 h-20 flex justify-center items-center bg-[#FF2C330A] rounded-full'>
            <NavLink to={"https://medlife-frontend-i1bz.vercel.app/"}>
              <img src={logo} alt='logo' className='rounded-full' />
            </NavLink>
          </div>
        </div>
        {settings.map((item: any, index: number) => (
          <NavbarItem key={index} {...item} location={location.pathname} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
