/** @format */

import { useLocation } from "react-router-dom";
import profile from "@/assets/profile.svg";
import { NavbarItems } from "@/utils/navbar/navbarItems";
import { getConfigByRole, getCookie } from "@/services/storage";
import { useEffect, useState } from "react";
import { toTitleCase } from "@/services/helpers";

const Header = () => {
  const [userData, setUserData] = useState<Record<string, string> | null>(null);
  const location = useLocation();
  const role = getConfigByRole();
  const settings = role ? NavbarItems[role] : [];

  useEffect(() => {
    const user = getCookie("@user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  return (
    <div className='pb-5'>
      <div className='bg-white text-[#000000] px-6 z-10 w-full border-b border-[#3333331F]'>
        <div className='flex items-center justify-between py-2 text-5x1'>
          <div className='font-bold text-[#000000] text-xl flex items-center'>
            {settings.map(
              (item: any) =>
                location.pathname.indexOf(item.to) !== -1 && (
                  <div key={item.to} className='flex items-center'>
                    {item.icon}
                    <span className='ml-2 font-[500] text-sm'>
                      {item.label}
                    </span>
                  </div>
                )
            )}
          </div>
          <div className='flex items-center text-[#000000]'>
            <span className='ml-2 font-[500] text-sm'>
              {userData
                ? toTitleCase(userData.fullname || userData.username)
                : "Guest"}
            </span>
            <div className='rounded-full h-12 w-12 ml-2 overflow-hidden'>
              <img
                className='bg-center bg-cover bg-no-repeat inline-block h-12 w-12'
                src={userData?.photo || profile}
                alt='avatar'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
