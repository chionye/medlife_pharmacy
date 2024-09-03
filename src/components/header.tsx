/** @format */

// import { Card } from "./ui/card";
import { NavLink, useLocation } from "react-router-dom";
import profile from "@/assets/profile.svg";
import { NavbarItems } from "@/utils/navbar/navbarItems";

const Header = ({ image }: { image: string }) => {
  const location = useLocation();
  console.log(location.pathname, NavbarItems);

  return (
    <div className='pb-5'>
      <div className='bg-white text-[#000000] px-6 z-10 w-full border-b border-[#0080804D] '>
        <div className='flex items-center justify-between py-2 text-5x1'>
          <div className='font-bold text-[#000000] text-xl flex items-center'>
            {NavbarItems.map(
              (item) =>
                location.pathname.indexOf(item.to) !== -1 && (
                  <>
                    {item.icon}
                    <span className='ml-2 font-[500] text-sm'>{item.label}</span>
                  </>
                )
            )}
          </div>
          <div className='flex items-center text-gray-500'>
            <span className='ml-2 font-[500] text-sm'>Alex Harthway</span>
            <img
              className={`bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2`}
              src={image ? image : profile}
              alt='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
