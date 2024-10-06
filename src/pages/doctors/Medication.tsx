/** @format */

import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Query from "@/api/query";
import { QueryProps } from "@/types";
import { getCookie } from "@/services/storage";
import PrescriptionForm from "@/components/prescription_form";

const DoctorMedication = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [patients, setPatients] = useState<any>([]);

  const queryParamsArray: QueryProps = [
    {
      id: "patients",
      url: `doctor/patients`,
      method: "post",
      payload: { doctor_id: userData?.id },
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
      setPatients(data);
    }
  }, [queries[0].isPending]);

  return (
    <>
      <NavLink to={"/doctor/home"} className='flex items-center w-fit'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Prescribe Medication</p>
      </NavLink>
      <PrescriptionForm patients={patients} />
    </>
  );
};

export default DoctorMedication;
