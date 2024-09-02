import { NavLink } from "react-router-dom";
import { Card } from "./ui/card";
import doctor from "@/assets/doctor.svg";
import star from "@/assets/star.svg";

const TopDoctors = () => {
  return (
    <div className='grid md:grid-flow-row gap-2 mt-5'>
      <div className='md:col-span-2 col-span-2'>
        <Card className='border flex justify-between items-end rounded-xl p-4'>
          <div className='flex justify-start items-center gap-2'>
            <img src={doctor} alt='doctor image' />
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-[#073131] font-semibold text-nowrap'>
                Hordan Jender
              </p>
              <p className='text-xs text-[#073131] font-normal'>Neurosurgeon</p>
              <div className='flex'>
                <img src={star} alt='star' />
                <p className='text-[8px] text-[#073131] font-normal mr-2'>
                  4.9
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
      <div className='md:col-span-2 col-span-2'>
        <Card className='border flex justify-between items-end rounded-xl p-4'>
          <div className='flex justify-start items-center gap-2'>
            <img src={doctor} alt='doctor image' />
            <div className='flex flex-col gap-1'>
              <p className='text-xs text-[#073131] font-semibold text-nowrap'>
                Hordan Jender
              </p>
              <p className='text-xs text-[#073131] font-normal'>Neurosurgeon</p>
              <div className='flex'>
                <img src={star} alt='star' />
                <p className='text-[8px] text-[#073131] font-normal mr-2'>
                  4.9
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
    </div>
  );
}

export default TopDoctors;