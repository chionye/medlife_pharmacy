/** @format */

import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import logout from "@/assets/logout.svg";
import envelope from "@/assets/envelope.svg";
import phone from "@/assets/phone.svg";
import whatsapp from "@/assets/whatsapp.svg";
import support from "@/assets/support.svg";

const Support = () => {
  const settings = [
    {
      title: "Send us an Email",
      link: "mailto:info@email.com",
      icon: envelope,
      chevron: true,
    },
    {
      title: "234 703 159 7862",
      link: "tel:234 703 159 7862",
      icon: phone,
      chevron: true,
    },
    {
      title: "234 703 159 7862",
      link: "/patient/settings/support-center",
      icon: whatsapp,
      chevron: true,
    },
  ];
  return (
    <>
      <div className='flex lg:flex-row flex-col mt-20 px-5 lg:gap-20'>
        <div className='flex flex-col items-center gap-3'>
          <img src={support} alt='Support Icon' />
        </div>
        <div>
          <p className='text-2xl font-normal'>
            Need Help? We’re here to assist.
          </p>
          <div className='mt-12'>
            {settings.map(
              (setting: {
                title: string;
                icon: string;
                chevron: boolean;
                link: string;
              }) => (
                <NavLink
                  className='flex text-sm justify-between items-center mt-10 lg:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
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
        </div>
      </div>
      <div className='mt-28'>
        <NavLink
          className='flex text-sm justify-between items-center mt-6 lg:w-[482px] w-full bg-[#F3FCFC] border border-[#10375C] px-4 py-4 rounded'
          to={"/"}>
          <span className='flex items-center gap-3'>
            <img src={logout} alt='star icon' />
            <span>Logout</span>
          </span>
        </NavLink>
      </div>
    </>
  );
};

export default Support;
