/** @format */

import { NavLink } from "react-router-dom";
import { Card } from "./ui/card";
import doctor from "@/assets/doctor.svg";
import star from "@/assets/star.svg";
import { TopDoctorsPropType } from "@/types";
import { toTitleCase } from "@/services/helpers";

const TopDoctors: React.FC<TopDoctorsPropType> = ({
  username,
  fullname,
  specialization,
  rating,
  key,
  photo,
}) => {
  return (
    <div className='md:col-span-2 col-span-2' key={key}>
      <Card className='border flex justify-between items-end rounded-xl p-4'>
        <div className='flex justify-start items-center gap-2'>
          <img src={photo || doctor} alt='doctor image' className=" w-16 rounded-full"/>
          <div className='flex flex-col gap-1'>
            <p className='text-xs text-[#073131] font-semibold text-nowrap'>
              {toTitleCase(fullname || username)}
            </p>
            <p className='text-xs text-[#073131] font-normal'>
              {toTitleCase(specialization)}
            </p>
            <div className='flex'>
              <img src={star} alt='star' />
              <p className='text-[8px] text-[#073131] font-normal mr-2'>
                {rating}
              </p>
              <p className='text-[8px] text-[#073131] font-normal'>
                50+ Reviews
              </p>
            </div>
          </div>
        </div>
        <NavLink to={"/"} className={"text-[#D20606] font-normal text-xs"}>
          View Profile
        </NavLink>
      </Card>
    </div>
  );
};

export default TopDoctors;
