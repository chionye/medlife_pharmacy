/** @format */

import female_user from "@/assets/female_user.svg";
import edit from "@/assets/edit.svg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import star_outline from "@/assets/star_outline.svg";
import headphones from "@/assets/headphones.svg";
import logout from "@/assets/logout.svg";

const Settings = () => {
  const settings = [
    {
      title: "Rate Physician’s Performance",
      link: "/dashboard/settings/rate-physicians-performance",
      icon: star_outline,
      chevron: true,
    },
    {
      title: "Support Center",
      link: "/dashboard/settings/support-center",
      icon: headphones,
      chevron: true,
    },
    {
      title: "Logout",
      link: "/dashboard/settings/support-center",
      icon: logout,
      chevron: false,
    },
  ];
  return (
    <>
      <NavLink to={"/dashboard/home"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>My Profile</p>
      </NavLink>
      <div className='flex md:flex-row flex-col mt-20 px-5 md:gap-20'>
        <div className='flex flex-col items-center gap-3'>
          <img src={female_user} alt='female user' />
          <button className='flex gap-1'>
            <span className='text-[#00C2C2] text-xl'>Edit</span>
            <img src={edit} alt='edit image' />
          </button>
        </div>
        <div>
          <div className='flex md:flex-row flex-col gap-20'>
            <div>
              <div>
                <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                  Name
                </p>
                <p className='text-[16px] text-[#073131] font-normal mt-2'>
                  Alex Harthway Chukwu aluka
                </p>
                <button className='text-xs text-[#00C2C2] font-normal mt-3'>
                  Change Name
                </button>
              </div>
              <div className='mt-5'>
                <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                  Email
                </p>
                <p className='text-[16px] text-[#073131] font-normal mt-2'>
                  Alexharthwaychukwualuka@gmail.com
                </p>
                <button className='text-xs text-[#00C2C2] font-normal mt-3'>
                  Change Email
                </button>
              </div>
              <div className='mt-5'>
                <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                  Gender
                </p>
                <p className='text-[16px] text-[#073131] font-normal mt-2'>
                  Female
                </p>
                <button className='text-xs text-[#00C2C2] font-normal mt-3'>
                  Change Gender
                </button>
              </div>
            </div>
            <div>
              <div>
                <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                  Phone Number
                </p>
                <p className='text-[16px] text-[#073131] font-normal mt-2'>
                  08087094976
                </p>
                <button className='text-xs text-[#00C2C2] font-normal mt-3'>
                  Change Phone Number
                </button>
              </div>
              <div className='mt-5'>
                <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                  Date of Birth
                </p>
                <p className='text-[16px] text-[#073131] font-normal mt-2'>
                  10/05/1943
                </p>
                <button className='text-xs text-[#00C2C2] font-normal mt-3'>
                  Change Date of Birth
                </button>
              </div>
              <div className='mt-5'>
                <p className='text-lg text-[#073131] font-semibold text-nowrap'>
                  Password
                </p>
                <p className='text-[16px] text-[#073131] font-normal mt-2'>
                  Change Password
                </p>
                <button className='text-xs text-[#00C2C2] font-normal mt-3'>
                  Enable two-factor authentication
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-28'>
        {settings.map(
          (setting: {
            title: string;
            icon: string;
            chevron: boolean;
            link: string;
          }) => (
            <NavLink
              className='flex text-sm justify-between items-center mt-6 md:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
              to={setting.link}>
              <span className='flex items-center gap-3'>
                <img src={setting.icon} alt='star icon' />
                <span>{setting.title}</span>
              </span>
              {setting.chevron && <ChevronRight size={18} />}
            </NavLink>
          )
        )}
      </div>
    </>
  );
};

export default Settings;
