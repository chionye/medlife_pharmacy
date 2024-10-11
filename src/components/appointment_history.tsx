/** @format */

import calendar from "@/assets/calendar.svg";
import clock from "@/assets/clock.svg";
import user from "@/assets/user.svg";
// import { AppointmentHistoryPropType } from "@/types";
import { getDateFormat } from "@/services/helpers";
import { getConfigByRole } from "@/services/storage";

const AppointmentHistory: React.FC<any> = (data) => {

  const role = getConfigByRole();
  const key = role === "doctor" ? "patient" : "doctor" ;
  return (
    <>
      <div className='flex justify-between lg:gap-32 gap-20 items-center p-5'>
        <div className='flex justify-start items-center gap-2'>
          <img src={user} alt='user image' />
          <div className='flex flex-col gap-1'>
            <p className='text-xs text-[#073131] font-semibold text-nowrap'>
              {data[key].fullname || data[key].username}
            </p>
            {key === "doctor" ? (
              <p className='text-xs text-[#073131] font-normal'>
                {data[key].specialization || "Physician"}
              </p>
            ) : (
              <p className='text-xs text-[#073131] font-normal'>
                {data.type}
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-1'>
            <img src={calendar} alt='' />
            <p className='text-xs text-[#073131] font-normal'>
              {getDateFormat(data.appointment_date, "date")}
            </p>
          </div>
          <div className='flex gap-1'>
            <img src={clock} alt='' />
            <p className='text-xs text-[#073131] font-normal'>
              {data.appointment_time}
            </p>
          </div>
          <div className='flex gap-1'>
            <p className='text-xs text-white font-normal bg-[#4BB543] px-3 rounded py-1'>
              {data?.status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentHistory;
