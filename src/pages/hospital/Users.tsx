/** @format */

import { useEffect, useMemo, useState } from "react";
import Table from "@/components/table";
import Pagination from "@/components/pagination";
import Dropdown from "@/components/dropdown";
import { Input } from "@/components/ui/input";
import { QueryProps, TopDoctorsPropType } from "@/types";
import Query from "@/api/query";
import { getConfigByRole } from "@/services/storage";
import { EmptyDoctors, EmptyPatients } from "@/components/empty";
import { CardWithButton } from "@/components/custom_cards";
import { GreetingSection } from "@/components/section";
import search from "@/assets/search.svg";
import filter from "@/assets/filter.svg";
import add from "@/assets/add.svg";
import pin from "@/assets/pin.svg";

const Users = () => {
  // const user = JSON.parse(getCookie("@user") || "{}");
  const [patient, setPatient] = useState<any[]>([]);
  const [filterSelect, setFilterSelect] = useState<string>("Patient");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [doctor, setDoctor] = useState<TopDoctorsPropType[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [tableHead, setTableHead] = useState<string[]>([]);
  const [tableKeys, setTableKeys] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const role = getConfigByRole();

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const filterOptions = useMemo(
    () => [{ label: "Patient" }, { label: "Doctor" }],
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
        title: "Total Number of Patients",
        buttonText: "Onboard Patient",
        link: "/doctor/message",
        icon: add,
        secondaryIcon: pin,
        count: patient.length || "0",
        type: "patient",
        modal: true,
      },
      {
        title: "Total Number of Doctors",
        buttonText: "Onboard Doctor",
        link: "/doctor/appointments",
        icon: add,
        secondaryIcon: pin,
        count: doctor.length,
        type: "doctor",
        modal: true,
      },
      {
        title: "Daily Transaction",
        icon: add,
        secondaryIcon: pin,
        count: "0",
        buttonText: "Total Commission : #0",
        link: "/",
      },
    ],
    [doctor.length, patient.length]
  );

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "patients",
        url: "admin/users",
        method: "post",
        payload: { role: "patient" },
      },
      {
        id: "doctors",
        url: "admin/users",
        method: "post",
        payload: { role: "doctor" },
      },
    ],
    []
  );

  const updateTableData = (userType: string) => {
    if (userType === "Patient") {
      setTableHead([
        "SN",
        "Name of Patients",
        "Patient’s Age",
        "Patients Email",
        "Username",
        "Gender",
        "Status",
        "View More",
      ]);
      setTableKeys([
        "SN",
        "fullname",
        "dob",
        "email",
        "username",
        "gender",
        "status",
        "view",
      ]);
      setData(patient);
    } else if (userType === "Doctor") {
      setTableHead([
        "SN",
        "Name of Physician",
        "Physician’s Specialty",
        "Physician’s Age",
        "Location",
        "Status",
        "View More",
        "Manage Physician",
      ]);
      setTableKeys([
        "SN",
        "fullname",
        "specialization",
        "dob",
        "address",
        "status",
        "view_detail",
        "manage_physician",
      ]);
      setData(doctor);
    }
  };

  const handleFilterChange = (selectedValue: string) => {
    setFilterSelect(selectedValue);
    updateTableData(selectedValue);
  };

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0]?.data?.[0]?.status) {
      setPatient(queries[0].data[0].data || []);
    }
    if (queries[1]?.data?.[0]?.status) {
      setDoctor(queries[1].data[0].data || []);
    }
  }, [queries]);

  useEffect(() => {
    updateTableData(filterSelect);
  }, [patient, doctor]);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [currentPage, filteredData, itemsPerPage]);

  return (
    <>
      <GreetingSection timeOptions={timeOptions} role={role} dropdown={true} />

      {/* Stats Cards */}
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='grid md:grid-flow-col gap-2'>
          {cardValue.map((item, index) => (
            <CardWithButton key={index} {...item} />
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
          options={filterOptions}
          value={filterSelect}
          changeFunction={handleFilterChange}
          dropdownType='radio'
        />
      </div>

      {/* Table or Empty State */}
      {paginatedData.length > 0 ? (
        <>
          <div className='mt-10'>
            <Table thead={tableHead} tbody={paginatedData} keys={tableKeys} />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : filterSelect === "Patient" ? (
        <EmptyPatients />
      ) : (
        <EmptyDoctors />
      )}
    </>
  );
};

export default Users;
