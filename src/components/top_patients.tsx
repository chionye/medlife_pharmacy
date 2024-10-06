/** @format */

import React from "react";
import doctor from "@/assets/doctor.svg";
import { TopDoctorsPropType } from "@/types";
import { Badge, Card, Divider } from "@chakra-ui/react";

const PatientsDetails: React.FC<TopDoctorsPropType> = ({
  username,
  fullname,
  email,
  phone,
  gender,
  rating,
  photo,
  dob,
  allergies,
  family_history,
  social_history,
  sogical_history,
}) => {
  return (
    <div className='mt-5 w-full'>
      {/* Adjust the margin here */}
      <p className='text-[#008080] text-[16px] font-semibold mb-3'>
        Demographic Details
      </p>
      <div className='flex md:flex-row flex-col gap-2 justify-center md:items-start items-center'>
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
              <p className='text-lg text-[#073131] font-semibold'>
                Date of Birth
              </p>
              <p className='text-[16px] text-[#073131] font-normal mt-1'>
                {dob || "N/A"}
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
      <div>
        <p className='text-[#008080] text-[16px] font-semibold mt-5'>
          Allergies
        </p>
        {allergies ? (
          <div className='flex gap-2 items-center flex-warp'>
            {allergies.map((allergy: string, index: number) => (
              <Badge key={index}>{allergy}</Badge>
            ))}
          </div>
        ) : (
          "N/A"
        )}
      </div>
      <Divider className='mt-5' orientation='horizontal' variant='solid' />
      <div>
        <p className='text-[#008080] text-[16px] font-semibold mt-5'>
          Medical History
        </p>
        <Card className='bg-[#FFFFF0] w-full mt-3 px-3 py-3'>
          <p className='text-lg text-[#073131] font-semibold'>Family History</p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {family_history || "N/A"}
          </p>
        </Card>
        <Card className='bg-[#FFFFF0] w-full mt-3 px-3 py-3'>
          <p className='text-lg text-[#073131] font-semibold'>Social History</p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {social_history || "N/A"}
          </p>
        </Card>
        <Card className='bg-[#FFFFF0] w-full mt-3 px-3 py-3'>
          <p className='text-lg text-[#073131] font-semibold'>
            Surgical History
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {sogical_history || "N/A"}
          </p>
        </Card>
      </div>
      <p className='text-[#008080] text-[16px] font-semibold mt-5'>
        Patient Reviews and Ratings:
      </p>
      <div className='flex ml-5'>
        <div className='flex justify-between items-center md:w-4/5 w-full'>
          <div>
            <p className='text-lg text-[#073131] font-semibold'>Rating</p>
            <p className='text-[16px] text-[#073131] font-normal mt-2'>
              {rating ? <>⭐⭐⭐⭐⭐ ({rating} stars)</> : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PatientsDetails };
