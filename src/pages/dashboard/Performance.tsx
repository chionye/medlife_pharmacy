/** @format */

// import React, { useState } from "react";
import StarRating from "@/components/star_rating";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FormInput, FormSelect } from "@/components/form_input";
import minus from "@/assets/minus.svg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Performance = () => {
  

  const physician_medic_sector: string[] = [
    "Cardiologist",
    "Physiologist",
    "Anesthesiologist",
    "Chiropractor",
  ];

  return (
    <>
      <NavLink to={"/dashboard/settings"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Rate Physician Performance</p>
      </NavLink>
      <div className='flex md:flex-row flex-col mt-20 px-5 md:gap-20'>
        <div className='flex md:flex-row flex-col justify-between gap-3 md:w-2/3'>
          <FormInput
            type='text'
            name='physicians_name'
            label='Physician’s Name'
            changeFunction={() => console.log("test")}
          />
          <FormSelect
            value='none'
            options={physician_medic_sector}
            name='physician_medic_sector'
            label='Physician Medic Sector'
            changeFunction={() => console.log("test")}
          />
        </div>
      </div>
      <div className='mt-20 px-5'>
        <p className='text-sm font-normal'>Rating Metrics</p>
        <div className='flex md:flex-row flex-col justify-between gap-3 mt-4'>
          <Card className='px-10 py-10 shadow-lg md:w-1/2'>
            <div className='flex md:flex-row flex-col justify-between items-center'>
              <span className='flex items-center gap-2'>
                <img src={minus} alt='dash' />
                <span>Overall satisfaction</span>
              </span>
              <StarRating />
            </div>
            <div className='flex md:flex-row flex-col  justify-between items-center'>
              <span className='flex items-center gap-2'>
                <img src={minus} alt='dash' />
                <span>Communication</span>
              </span>
              <StarRating />
            </div>
            <div className='flex md:flex-row flex-col  justify-between items-center'>
              <span className='flex items-center gap-2'>
                <img src={minus} alt='dash' />
                <span>Knowledge</span>
              </span>
              <StarRating />
            </div>
            <div className='flex md:flex-row flex-col  justify-between items-center'>
              <span className='flex items-center gap-2'>
                <img src={minus} alt='dash' />
                <span>Bedside manner</span>
              </span>
              <StarRating />
            </div>
            <div className='flex justify-center'>
              <Button className='bg-[#4BB543] w-1/2 mt-6 p-4'>Submit</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Performance;
