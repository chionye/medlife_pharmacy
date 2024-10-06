/** @format */

// import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Query from "@/api/query";
import { QueryProps } from "@/types";
import { getCookie } from "@/services/storage";
import RatingForm from "@/components/rating_form";
import Mutation from "@/api/mutation";
import { useNotifier } from "@/hooks/useNotifier";

const Performance = () => {
  const physician_medic_sector: string[] = [
    "Cardiologist",
    "Physiologist",
    "Anesthesiologist",
    "Chiropractor",
  ];

  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState<any>({
    doctor_id: "",
    patient_id: userData?.id,
  });
  const [doctors, setDoctors] = useState<any>([]);
  const criteria = [
    "overall_satisfaction",
    "communication",
    "knowledge",
    "bedside_manner",
  ];
  const { showNotifier, NotifierComponent } = useNotifier();

  const { mutation } = Mutation();

  const handleSubmit = (dataValues: any) => {
    try {
      const formValues = {
        ...dataValues.ratings,
        ratee: dataValues.formSelects.doctor_id || formData.doctor_id,
        rater: formData.patient_id,
      };
      const data = {
        method: "post",
        url: `rate/doctor`,
        content: formValues,
      };
      mutation.mutate(data, {
        onSuccess: (data) => {
          console.log(data);
          if (data.status) {
            showNotifier({
              title: "Success",
              text: "Your feedback was successfully submitted!",
              status: "success",
            });
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
          console.log("Error submitting feedback:", error);
          showNotifier({
            title: "Error",
            text: "There was an error submitting your feedback. Please try again.",
            status: "error",
          });
        },
      });
    } catch (err: any) {
      console.log(err);
    }
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
    console.log(queries[0].data, queries[0].isPending);
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      const data = queries[0].data.data.map((item: any) => ({
        id: item.id,
        name: item.fullname || item.username,
      }));
      setDoctors(data);
      setFormData({
        ...formData,
        doctor_id: data[0].id,
      });
    }
  }, [queries[0].isPending]);

  return (
    <>
      <NavLink to={"/patient/settings"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Rate Physician Performance</p>
      </NavLink>
      <RatingForm
        formAttributes={formAttributes}
        criteria={criteria}
        onSubmit={handleSubmit}
      />
      {NotifierComponent}
    </>
  );
};

export default Performance;
