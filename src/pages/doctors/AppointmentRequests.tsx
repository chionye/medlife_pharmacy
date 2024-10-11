/** @format */

import Query from "@/api/query";
import { AppointmentSection } from "@/components/section";
import { getCookie } from "@/services/storage";
import { QueryProps } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

const AppointmentRequests = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [appointments, setAppointments] = useState<any[]>([]);

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "appointments",
        url: "appointment/list",
        method: "post",
        payload: { user_id: userData?.id },
      },
    ],
    [userData?.id]
  );

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setAppointments(queries[0].data.data);
    }
  }, [queries]);

  return (
    <>
      <NavLink to={"/patient/home"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Appointment Requests</p>
      </NavLink>
      <div className='lg:px-20 py-5'>
        <AppointmentSection
          appointments={appointments}
          title='Appointment Request'
          buttons={true}
          cn={"w-full"}
          appointmentRequest={true}
        />
      </div>
    </>
  );
};

export default AppointmentRequests;
