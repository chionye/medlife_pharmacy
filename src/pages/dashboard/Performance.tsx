/** @format */

// import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Query from "@/api/query";
import { QueryProps } from "@/types";
import { getCookie } from "@/services/storage";
import RatingForm from "@/components/rating_form";

const Performance = () => {
  const physician_medic_sector: string[] = [
    "Cardiologist",
    "Physiologist",
    "Anesthesiologist",
    "Chiropractor",
  ];

  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData] = useState<any>({
    doctor_id: "",
    patient_id: userData?.id,
  });
  const [doctors, setDoctors] = useState<any>([]);
  const criteria = [
    "Overall satisfaction",
    "Communication",
    "Knowledge",
    "Bedside manner",
  ];

  const handleSubmit = () => {
    console.log("Submitted Ratings: ");
    // Handle form submission logic here
  };

  const queryParamsArray: QueryProps = [
    {
      id: "doctors",
      url: `doctors`,
      method: "post",
      payload: { user_id: userData?.id },
    },
  ];

  const formAttributes = [
    {
      name: "doctor_id",
      options: doctors,
      label: "Physician Name",
      value: formData.doctor_id,
    },
    {
      name: "physician_medic_sector",
      options: physician_medic_sector,
      label: "Physician Medic Sector",
      value: "none",
    },
  ];

  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      const data = queries[0].data.data.map((item: any) => ({
        id: item.id,
        name: item.fullname || item.username,
      }));
      setDoctors(data);
    }
  }, []);

  return (
    <>
      <NavLink to={"/dashboard/settings"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Rate Physician Performance</p>
      </NavLink>
      <RatingForm
        formAttributes={formAttributes}
        criteria={criteria}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Performance;
