/** @format */

import React, { useState } from "react";
import { Card } from "./ui/card";
import doctor from "@/assets/doctor.svg";
import star from "@/assets/star.svg";
import { TopDoctorsPropType } from "@/types";
import { toTitleCase } from "@/services/helpers";
import FullModal from "./full_modal";
import { Badge, Divider } from "@chakra-ui/react";
import video_call from "@/assets/video_call.svg";
import { Button } from "./ui/button";
import Mutation from "@/api/mutation";
import { useNotifier } from "@/hooks/useNotifier";
import { getCookie } from "@/services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";

const DoctorsDetails: React.FC<TopDoctorsPropType> = ({
  username,
  fullname,
  specialization,
  email,
  phone,
  gender,
  rating,
  photo,
  certifications,
  languages,
  clinic_affiliation,
  years_of_experience,
}) => {
  return (
    <div className='mt-5 w-full'>
      {/* Adjust the margin here */}
      <p className='text-[#008080] text-[16px] font-semibold mb-3'>
        Demographic Details
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
        <div className='flex justify-between items-start lg:w-4/5 w-full'>
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
      <Divider className='mt-5' orientation='horizontal' variant='solid' />
      <div>
        <p className='text-[#008080] text-[16px] font-semibold mt-5'>
          Professional Details
        </p>
        <div>
          <p className='text-[#008080] text-[16px] font-semibold mt-5'>
            Certifications
          </p>
          {certifications ? (
            <div className='flex gap-2 items-center flex-warp'>
              {certifications.map((certification: string, index: number) => (
                <Badge key={index}>{certification}</Badge>
              ))}
            </div>
          ) : (
            "N/A"
          )}
        </div>
        <div>
          <p className='text-[#008080] text-[16px] font-semibold mt-5'>
            Certifications
          </p>
          {languages ? (
            <div className='flex gap-2 items-center flex-warp'>
              {languages.map((language: string, index: number) => (
                <Badge key={index}>{language}</Badge>
              ))}
            </div>
          ) : (
            "N/A"
          )}
        </div>
        <Card className='bg-[#FFFFF0] w-full mt-3 px-3 py-3'>
          <p className='text-lg text-[#073131] font-semibold'>
            Clinic Affiliation
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {clinic_affiliation || "N/A"}
          </p>
        </Card>
        <Card className='bg-[#FFFFF0] w-full mt-3 px-3 py-3'>
          <p className='text-lg text-[#073131] font-semibold'>
            Years of experience
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {years_of_experience || "N/A"}
          </p>
        </Card>
      </div>
      {/* Reduced the margin here */}
      <Divider className='mt-5' orientation='horizontal' variant='solid' />
      <p className='text-[#008080] text-[16px] font-semibold mt-5'>
        Patient Reviews and Ratings:
      </p>
      <div className='flex ml-5'>
        <div className='flex justify-between items-center lg:w-4/5 w-full'>
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
  id,
}) => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [loadingButtonIndex, setLoadingButtonIndex] = useState<
    number | undefined
  >(undefined);

  const { mutation } = Mutation();
  const { showNotifier, NotifierComponent } = useNotifier();

  function createCallSession(index: number | undefined) {
    setLoadingButtonIndex(index);
    // Generate or fetch the callId
    const callId = `call-${Math.random().toString(16).substring(2)}`;
    const data = {
      method: "post",
      url: `callogs/create`,
      content: { call_id: callId, doctor_id: id, patient_id: userData.id },
    };
    mutation.mutate(data, {
      onSuccess: (data) => {
        if (data.status) {
          window.open(`/call/${callId}`, "_blank", "noopener,noreferrer");
        } else if (data.error || data.errors || data.message) {
          const errorMessage = data.message
            ? data.message
            : data.error
            ? data.error
            : Array.isArray(data.errors)
            ? data.errors.join("\n")
            : data.errors;
          showNotifier({
            title: "Error",
            text: errorMessage,
            status: "error",
          });
        }
      },
      onError: (error) => {
        console.log("Error submitting data:", error);
        showNotifier({
          title: "Error",
          text: "There was an error submitting your data. Please try again.",
          status: "error",
        });
      },
    });
    // Redirect the patient and doctor to the call page
  }

  return (
    <div className='lg:col-span-2 col-span-2'>
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
        <div className='flex gap-3'>
          <Button variant={"ghost"} onClick={() => createCallSession(id)}>
            {mutation.isPending && loadingButtonIndex === id ? (
              <>
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              </>
            ) : (
              <img src={video_call} alt='' className='w-5' />
            )}
          </Button>
          <FullModal
            title='Doctors Details'
            label='View Profile'
            cn='text-[#585BA8] text-xs'>
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
        </div>
      </Card>
      {NotifierComponent}
    </div>
  );
};

export { TopDoctors, DoctorsDetails };
