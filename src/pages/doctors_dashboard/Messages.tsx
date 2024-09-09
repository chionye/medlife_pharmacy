/** @format */

import { Card } from "@/components/ui/card";
import { toTitleCase } from "@/services/helpers";
import { getCookie } from "@/services/storage";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import video_icon from "@/assets/video_icon.svg";
import pin from "@/assets/pin.svg";
import add from "@/assets/add.svg";
import { QueryProps } from "@/types";
import userImage from "@/assets/user.svg";
import Query from "@/api/query";
import search from "@/assets/search.svg";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import sort from "@/assets/sort.svg";
import read_receipt from "@/assets/read_receipt.svg";
import { Badge } from "@chakra-ui/react";

const DoctorMessages = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [appointments, setAppointments] = useState<any>([]);

  const queryParamsArray: QueryProps = [
    {
      id: "appointments",
      url: "list_appointments",
      method: "post",
      payload: { user_id: userData?.id },
    },
  ];
  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setAppointments(queries[0].data.data);
    }
  }, [queries]);

  return (
    <div className='md:px-5 py-5'>
      <div>
        <h4 className='text-3xl font-bold'>
          Welcome,{" "}
          {userData
            ? toTitleCase(userData.fullname || userData.username)
            : "Guest"}
        </h4>
        <p className='text-sm font-thin'>
          We sure hope you’re having a great day!{" "}
        </p>
      </div>
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='md:w-[67%] w-full'>
          <div className='grid md:grid-flow-col gap-2'>
            <div className='md:col-span-3 col-span-3'>
              <Card className='border flex justify-between rounded-xl p-6'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    Chat a Doctor
                  </p>
                  <NavLink
                    to='/dashboard/message'
                    className='bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between mt-10 px-8 py-1'>
                    <img src={add} alt='logo' />
                    <strong>Call A Doctor</strong>
                  </NavLink>
                </div>
                <img src={video_icon} alt='logo' className=' rounded-full' />
              </Card>
            </div>
            <div className='md:col-span-3 col-span-3'>
              <Card className='border flex justify-between rounded-xl p-6'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    Current Appointment
                  </p>
                  <p className='text-[26px]'>{appointments.length}</p>
                  <NavLink
                    to='/dashboard/appointments'
                    className='bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1 '>
                    <img src={add} alt='plus icon' />
                    <strong>Book Appointment</strong>
                  </NavLink>
                </div>
                <img src={pin} alt='pin icon' />
              </Card>
            </div>
          </div>
        </div>
      </div>
      <NavLink
        to={"/dashboard/home"}
        className='flex items-center md:gap-5 gap-2 text-[#333333CC] w-fit mt-3'>
        <ChevronLeft size={34} />
        <p className='text-5xl font-normal'>Chats</p>
      </NavLink>
      <div className='mt-3 grid md:grid-flow-col gap-2'>
        <div className='bg-[#00808026] border-[#00808026] flex justify-start p-2 border rounded-lg md:col-span-11 col-span-11'>
          <img src={search} alt='search' />
          <Input
            type='text'
            placeholder='Search'
            className='border-0 bg-transparent shadow-none outline-none focus:outline-none'
          />
        </div>
        <button className='flex justify-center items-center md:col-span-1 col-span-1'>
          <img src={sort} alt='sort' />
        </button>
      </div>
      <div className='grid md:grid-flow-row gap-2 mt-5'>
        <NavLink to={"/"} className='md:col-span-2 col-span-2'>
          <div className='flex justify-between gap-20 items-end border-b border-[#3333331F] p-4'>
            <div className='flex justify-start items-center gap-2'>
              <img src={userImage} alt='user image' />
              <div className='flex flex-col gap-1'>
                <p className='text-xs text-[#333333CC] font-semibold text-nowrap'>
                  Christopher Ezenwa
                </p>
                <p className='text-xs text-[#333333CC] font-normal flex items-center gap-2'>
                  <img src={read_receipt} alt='double tick' className='w-5' />
                  <span>Okay Thanks</span>
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1'>
                <p className='text-xs text-[#333333CC] font-normal'>
                  Yesterday
                </p>
              </div>
              <div className='flex gap-1 justify-center'>
                <Badge
                  ml='1'
                  fontSize='0.8em'
                  colorScheme='green'
                  variant='solid'
                  color={"white"}
                  width={5}
                  height={5}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  rounded='full'>
                  4
                </Badge>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default DoctorMessages;
