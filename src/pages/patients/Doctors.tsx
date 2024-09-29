/** @format */

import Query from "@/api/query";
import { DoctorPatientSection } from "@/components/section";
import { getCookie } from "@/services/storage";
import { QueryProps, TopDoctorsPropType } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Doctors = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [doctors, setDoctors] = useState<TopDoctorsPropType[]>([]);

  const queryParamsArray: QueryProps = [
    {
      id: "doctors",
      url: "doctors",
      method: "post",
      payload: { user_id: userData?.id },
    },
  ];
  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    if (queries[0].data?.status) setDoctors(queries[0].data.data || []);
  }, []);

  return (
    <>
      <NavLink to={"/patient/home"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Top Doctors</p>
      </NavLink>
      <div className='md:px-20 py-5'>
        <DoctorPatientSection
          doctors={doctors}
          title='Top Doctors'
          cn='w-full'
        />
      </div>
    </>
  );
};

export default Doctors;
