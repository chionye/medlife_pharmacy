/** @format */

import { NavLink } from "react-router-dom";
import pinned from "@/assets/pinned.svg";
import bell from "@/assets/bell.svg";
import add from "@/assets/add.svg";
import task_done from "@/assets/task_done.svg";
import search from "@/assets/search.svg";
import filter from "@/assets/filter.svg";
import Dropdown from "@/components/dropdown";
import { Input } from "@/components/ui/input";
import Table from "@/components/table";
import { useEffect, useMemo, useState } from "react";
import { QueryProps } from "@/types";
import Query from "@/api/query";
import { getCookie } from "@/services/storage";
import { EmptyAppointment } from "@/components/empty";
import { CardWithButton } from "@/components/custom_cards";

const DoctorsAppointments = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;

  const [appointments, setAppointments] = useState<any[]>([]);

  const thead = useMemo(
    () => [
      "SN",
      "Name of Patients",
      "Date and Time",
      "Address",
      "Appointment Type",
      "Appointment Details",
      "Status",
      "Response",
    ],
    []
  );

  const keys = useMemo(
    () => [
      "SN",
      "doctor.fullname",
      "doctor.specialization",
      "appointment_date",
      "type",
      "description",
      "status",
    ],
    []
  );

  const appointmentOptions = useMemo(
    () => [
      { label: "Successful Appointments" },
      { label: "Cancelled/Missed Appointments" },
      {
        label: "Role",
        items: [
          { label: "Cardiologist" },
          { label: "Psychiatrist" },
          { label: "Dietician" },
        ],
      },
      { label: "Next Week" },
    ],
    []
  );

  const timeOptions = useMemo(
    () => [
      { label: "Today" },
      { label: "Tomorrow" },
      { label: "This Week" },
      { label: "Next Week" },
    ],
    []
  );

  const cardValue = useMemo(
    () => [
      {
        title: "Current Appointment",
        buttonText: "Create Appointment",
        link: "/doctor/appointments",
        icon: add,
        secondaryIcon: pinned,
        count: appointments.length,
      },
      {
        title: "No of Appointments",
        icon: add,
        subtitle: "This Month",
        secondaryIcon: task_done,
        count: appointments.length,
      },
      {
        title: "No of Appointments",
        icon: add,
        subtitle: "This Year",
        secondaryIcon: task_done,
        count: appointments.length,
      },
    ],
    [appointments.length]
  );

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
      {/* Header */}
      <div className='flex justify-between items-center'>
        <Dropdown label='Today' options={timeOptions} />
        <NavLink to='/dashboard' className='mt-2'>
          <img src={bell} alt='bell icon' />
        </NavLink>
      </div>

      {/* Stats Cards */}
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='grid md:grid-flow-col gap-2'>
          {cardValue.map((item: any) => (
            <CardWithButton
              title={item.title ? item.title : ""}
              buttonText={item.buttonText ? item.buttonText : ""}
              link={item.link ? item.link : ""}
              icon={item.icon ? item.icon : ""}
              secondaryIcon={item.secondaryIcon ? item.secondaryIcon : ""}
              count={item.count ? item.count : "0"}
            />
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className='mt-10 grid md:grid-flow-col gap-2'>
        <div className='bg-[#00808026] border-[#00808026] flex justify-start p-2 border rounded-lg md:col-span-3'>
          <img src={search} alt='search icon' />
          <Input
            type='text'
            placeholder='Search'
            className='border-0 bg-transparent shadow-none outline-none focus:outline-none'
          />
        </div>
        <Dropdown
          label='Filter By'
          cn='w-full h-13'
          icon={<img src={filter} alt='filter icon' />}
          options={appointmentOptions}
        />
      </div>

      {/* Table or Empty State */}
      {appointments.length > 0 ? (
        <div className='mt-10'>
          <Table thead={thead} tbody={appointments} keys={keys} />
        </div>
      ) : (
        <EmptyAppointment />
      )}
    </>
  );
};

export default DoctorsAppointments;
