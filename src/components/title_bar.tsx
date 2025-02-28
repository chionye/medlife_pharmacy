/** @format */

import { TitleBarPropType } from "@/types";
import { NavLink } from "react-router-dom";

const TitleBar: React.FC<TitleBarPropType> = ({ title, link = null }) => {
  return (
    <div className='flex justify-between lg:mt-0 mt-5'>
      <h4 className='text-xl font-medium'>{title}</h4>
      {link && (
        <NavLink to={link} className={"text-[#0111A2] flex gap-2 items-center"}>
          <span className='underline'>See All</span>
        </NavLink>
      )}
    </div>
  );
};

export default TitleBar;
