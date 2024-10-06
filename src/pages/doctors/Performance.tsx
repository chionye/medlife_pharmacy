/** @format */

import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Query from "@/api/query";
import { QueryProps } from "@/types";
import { getCookie } from "@/services/storage";
import RatingForm from "@/components/rating_form";
import { useNotifier } from "@/hooks/useNotifier";
import Mutation from "@/api/mutation";

const DoctorPerformance = () => {

  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData] = useState<any>({
    doctor_id: userData?.id,
    patient_id: "",
  });
  const [patients, setPatients] = useState<any>([]);
  const criteria = [
    "appointment_cancellation",
    "no_show",
    "waiting_time",
    "adherence_to_treatment",
  ];

  const formAttributes = [
    {
      name: "patient_id",
      options: patients,
      label: "Patients Name",
      value: formData.patient_id,
    },
  ];

  const { showNotifier, NotifierComponent } = useNotifier();

  const { mutation } = Mutation();

  const handleSubmit = (dataValues: any) => {
    try {
      const formValues = {
        ...dataValues.ratings,
        rater: formData.doctor_id,
        ratee: dataValues.formSelects.patient_id || patients[0]?.id,
      };

      const data = {
        method: "post",
        url: `rate/patient`,
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
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "patients",
        url: "doctor/patients",
        method: "post",
        payload: { doctor_id: userData?.id },
      },
    ],
    [userData?.id]
  );

  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      const data = queries[0].data.data.map((item: any) => ({
        id: item.id,
        name: item.fullname || item.username,
      }));
      setPatients(data);
    }
  }, [queries[0].isPending]);

  return (
    <>
      <NavLink to={"/doctor/settings"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Rate Patients Performance</p>
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
