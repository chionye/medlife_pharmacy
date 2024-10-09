/** @format */

import pinned from "@/assets/pinned.svg";
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
import { getConfigByRole, getCookie } from "@/services/storage";
import { EmptyAppointment } from "@/components/empty";
import { CardWithButton } from "@/components/custom_cards";
import { GreetingSection } from "@/components/section";
import Pagination from "@/components/pagination";

const Appointments = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;

  const [appointments, setAppointments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const role = getConfigByRole();

  const thead = useMemo(
    () => [
      "SN",
      "Name of Medic",
      "Role",
      "Appointment Date",
      "Appointment Time",
      "Appointment Type",
      "Appointment Details",
      "Appointment Link",
      "Status",
    ],
    []
  );

  const keys = useMemo(
    () => [
      "SN",
      "doctor.fullname",
      "doctor.specialization",
      "appointment_date",
      "appointment_time",
      "type",
      "description",
      "link",
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
        buttonText: "Book Appointment",
        link: "/",
        icon: add,
        secondaryIcon: pinned,
        count: appointments.length,
        modal: true,
        type: "user",
      },
      {
        title: "No of Appointments",
        icon: add,
        subtitle: "This Month",
        secondaryIcon: task_done,
        count: appointments.length,
      },
      {
        title: "Appointments",
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

  const filteredData = useMemo(() => {
    if (searchQuery) {
      return appointments.filter((item) =>
        (item.fullname || item.username)
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    return appointments;
  }, [appointments, searchQuery]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage; // Starting index
    const end = start + itemsPerPage; // Ending index
    return filteredData.slice(start, end); // Slicing the filtered data
  }, [currentPage, filteredData, itemsPerPage]);

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setAppointments(queries[0].data.data);
      console.log(queries[0].data.data);
    }
  }, [queries]);

  return (
    <>
      {/* Header */}
      <GreetingSection timeOptions={timeOptions} role={role} dropdown={true} />

      {/* Stats Cards */}
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='grid md:grid-flow-col gap-2'>
          {cardValue.map((item: any) => (
            <CardWithButton
              title={item.title ? item.title : ""}
              type={item.type ? item.type : ""}
              buttonText={item.buttonText ? item.buttonText : ""}
              link={item.link ? item.link : ""}
              icon={item.icon ? item.icon : ""}
              secondaryIcon={item.secondaryIcon ? item.secondaryIcon : ""}
              count={item.count ? item.count : "0"}
              modal={item.modal && item.modal}
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
            value={searchQuery} // Bind search query state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
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
      {paginatedData.length > 0 ? (
        <>
          <div className='mt-10'>
            <Table thead={thead} tbody={paginatedData} keys={keys} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <EmptyAppointment />
      )}
    </>
  );
};

export default Appointments;