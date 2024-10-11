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

const AdminAppointments = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const role = getConfigByRole();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterSelect, setFilterSelect] = useState<string>("Patient");
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const thead = useMemo(
    () => [
      "SN",
      "Name of Patients",
      "Date",
      "Time",
      "Appointment Link",
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
      "patient.fullname",
      "appointment_date",
      "appointment_time",
      "link",
      "type",
      "description",
      "status",
      "response",
    ],
    []
  );

  const appointmentOptions = useMemo(
    () => [
      { label: "All" },
      { label: "Completed" },
      { label: "Pending" },
      { label: "Cancelled" },
      { label: "Active" },
    ],
    []
  );

  // Function to count appointments based on their status
  const countAppointmentsByStatus = (appointments: any[], status: string) => {
    return appointments.filter((appointment) => appointment.status === status)
      .length;
  };

  // Example of usage:
  const pendingCount = countAppointmentsByStatus(appointments, "pending");
  const activeCount = countAppointmentsByStatus(appointments, "active");
  const completedCount = countAppointmentsByStatus(appointments, "completed");
  const canceledCount = countAppointmentsByStatus(appointments, "canceled");

  const cardValue = useMemo(
    () => [
      {
        title: "Total Number of Appointments",
        icon: add,
        secondaryIcon: pinned,
        count: appointments.length,
      },
      {
        title: "Upcoming Appointments",
        icon: add,
        subtitle: "This Month",
        secondaryIcon: task_done,
        count: pendingCount,
      },
      {
        title: "Past Appointments",
        icon: add,
        subtitle: "This Year",
        secondaryIcon: task_done,
        count: completedCount,
      },
      {
        title: "Resheduled Appointments",
        icon: add,
        subtitle: "This Year",
        secondaryIcon: task_done,
        count: activeCount,
      },
      {
        title: "Cancelled Appointment",
        icon: add,
        subtitle: "This Year",
        secondaryIcon: task_done,
        count: canceledCount,
      },
    ],
    [
      activeCount,
      appointments.length,
      canceledCount,
      completedCount,
      pendingCount,
    ]
  );

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "appointments",
        url: `appointment/all/${userData?.id}`,
        method: "get",
        payload: null,
      },
    ],
    [userData?.id]
  );

  const handleFilterChange = (selectedValue: string) => {
    setFilterSelect(selectedValue);
    setSearchQuery(selectedValue);
  };

  const filteredData = useMemo(() => {
    if (searchQuery !== "All") {
      return appointments.filter(
        (item) =>
          item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.patient.fullname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.doctor.fullname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.appointment_date
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.appointment_time
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
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
    }
  }, [queries]);

  return (
    <>
      {/* Header */}
      <GreetingSection role={role} dropdown={true} />

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
            value={searchQuery} // Bind search query state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
            className='border-0 bg-transparent shadow-none outline-none focus:outline-none'
          />
        </div>
        <Dropdown
          label='Filter By'
          cn='w-full h-13'
          icon={<img src={filter} alt='filter icon' />}
          options={appointmentOptions}
          value={filterSelect}
          changeFunction={handleFilterChange}
          dropdownType='radio'
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

export default AdminAppointments;
