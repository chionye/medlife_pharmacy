/** @format */

import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Query from "@/api/query";
import { QueryProps } from "@/types";
import { getCookie } from "@/services/storage";
import RatingForm from "@/components/rating_form";
import { useNotifier } from "@/hooks/useNotifier";
import Mutation from "@/api/mutation";

const DoctorPerformance = () => {
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

  const { showNotifier, NotifierComponent } = useNotifier();

  const { mutation } = Mutation();

  const handleSubmit = (dataValues: any) => {
    const formValues = {
      ...dataValues.ratings,
      ratee: dataValues.formSelects.doctor_id,
      rater: formData.patient_id,
    };
    const data = {
      method: "post",
      url: `rate/doctor`,
      content: formValues,
    };
    mutation.mutate(data);
    if (mutation.isSuccess) {
      if (mutation.data.status) {
        showNotifier({
          title: "Success",
          text: "Your feedback was successfully submitted!",
          status: "success",
        });
      } else {
        const errorMessage = Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    } else {
      showNotifier({
        title: "Error",
        text: "Failed to save feedback. Please try again later.",
        status: "error",
      });
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

  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    console.log(queries[0].data);
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

export default DoctorPerformance;
