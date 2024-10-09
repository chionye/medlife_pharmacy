
import calendar from "@/assets/calendar.svg";
import clock from "@/assets/clock.svg";
import user from "@/assets/user.svg";
import { AppointmentHistoryPropType } from "@/types";
import { getDateFormat } from "@/services/helpers";

const AppointmentHistory: React.FC<AppointmentHistoryPropType> = (data) => {
  return (
    <>
      <div className='flex justify-between md:gap-32 gap-20 items-center p-5'>
        <div className='flex justify-start items-center gap-2'>
          <img src={user} alt='user image' />
          <div className='flex flex-col gap-1'>
            <p className='text-xs text-[#073131] font-semibold text-nowrap'>
              {data.doctor.fullname || data.doctor.username}
            </p>
            <p className='text-xs text-[#073131] font-normal'>
              {data.doctor.specialization || "Physician"}
            </p>
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
