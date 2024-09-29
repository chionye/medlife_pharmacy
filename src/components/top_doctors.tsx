/** @format */

import React from "react";
import { Card } from "./ui/card";
import doctor from "@/assets/doctor.svg";
import star from "@/assets/star.svg";
import { TopDoctorsPropType } from "@/types";
import { toTitleCase } from "@/services/helpers";
import FullModal from "./full_modal";
import { Divider } from "@chakra-ui/react";

const DoctorsDetails: React.FC<TopDoctorsPropType> = ({
  username,
  fullname,
  specialization,
  email,
  phone,
  gender,
  rating,
  photo,
}) => {
  return (
    <div className='mt-5 w-full'>
      {/* Adjust the margin here */}
      <p className='text-[#008080] text-[16px] font-semibold mb-3'>
        Personal Information
      </p>
      <div className='flex gap-2 justify-center items-start'>
        {" "}
        {/* Changed items-center to items-start */}
        <div>
          <img
            src={photo || doctor}
            alt='user'
            className='rounded-full w-[170px]'
          />
        </div>
        {/* Removed unnecessary large margin here */}
        <div className='flex justify-between items-start md:w-4/5 w-full'>
          <div>
            <div>
              <p className='text-lg text-[#073131] font-semibold'>Name</p>
              <p className='text-[16px] text-[#073131] font-normal mt-1'>
                {fullname || username}
              </p>
            </div>
            <div className='mt-3'>
              <p className='text-lg text-[#073131] font-semibold'>Specialty</p>
              <p className='text-[16px] text-[#073131] font-normal mt-1'>
                {specialization || "Physician"}
              </p>
            </div>
            <div className='mt-3'>
              <p className='text-lg text-[#073131] font-semibold'>Email</p>
              <p className='text-[16px] text-[#073131] font-normal mt-1'>
                {email}
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className='text-lg text-[#073131] font-semibold'>
                Phone Number
              </p>
              <p className='text-[16px] text-[#073131] font-normal mt-1'>
                {phone || "07012345678"}
              </p>
            </div>
            <div className='mt-3'>
              <p className='text-lg text-[#073131] font-semibold'>Gender</p>
              <p className='text-[16px] text-[#073131] font-normal mt-1'>
                {gender || "male"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Reduced the margin here */}
      <Divider className='mt-5' orientation='horizontal' variant='solid' />
      <p className='text-[#008080] text-[16px] font-semibold mt-5'>
        Patient Reviews and Ratings:
      </p>
      <div className='flex ml-5'>
        <div className='flex justify-between items-center md:w-4/5 w-full'>
          <div>
            <p className='text-lg text-[#073131] font-semibold'>Rating</p>
            <p className='text-[16px] text-[#073131] font-normal mt-2'>
              ⭐⭐⭐⭐⭐ ({rating} stars)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopDoctors: React.FC<TopDoctorsPropType> = ({
  username,
  fullname,
  specialization,
  phone,
  gender,
  rating,
  photo,
  reviews,
  email,
}) => {
  return (
    <div className='md:col-span-2 col-span-2'>
      <Card className='border flex justify-between items-end rounded-xl p-4'>
        <div className='flex justify-start items-center gap-2'>
          <img
            src={photo || doctor}
            alt='doctor image'
            className=' w-16 rounded-full'
          />
          <div className='flex flex-col gap-1'>
            <p className='text-xs text-[#073131] font-semibold text-nowrap'>
              {toTitleCase(fullname || username)}
            </p>
            <p className='text-xs text-[#073131] font-normal'>
              {toTitleCase(specialization || "Physician")}
            </p>
            <div className='flex'>
              <img src={star} alt='star' />
              <p className='text-[8px] text-[#073131] font-normal mr-2'>
                {rating}
              </p>
              <p className='text-[8px] text-[#073131] font-normal'>
                {reviews && reviews}
              </p>
            </div>
          </div>
        </div>
        <FullModal
          title='Doctors Details'
          label='View Profile'
          cn='underline text-[#333333]'>
          <div className='flex justify-center items-center'>
            <DoctorsDetails
              username={username}
              fullname={fullname}
              specialization={specialization}
              phone={phone}
              gender={gender}
              rating={rating}
              email={email}
              photo={photo}
            />
          </div>
        </FullModal>
      </Card>
    </div>
  );
};

export { TopDoctors };
