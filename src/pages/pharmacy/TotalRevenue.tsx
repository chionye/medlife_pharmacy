/** @format */

import Table from "@/components/table";
import { useEffect, useMemo, useState } from "react";
import { QueryProps } from "@/types";
import Query from "@/api/query";
// import { getCookie } from "@/services/storage";
import { EmptyAppointment } from "@/components/empty";
import {
  TopFilterSection,
  TopSummaryAndTitleSection,
} from "@/components/section";
import Pagination from "@/components/pagination";
import { Icons } from "@/constants/svgs";
import { NavLink } from "react-router-dom";

const TotalRevenue = () => {
  // const user = getCookie("@user");
  //   const userData = user ? JSON.parse(user) : null;

  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const currentYear = new Date().getFullYear().toString();
  const [formData, setFormData] = useState<any>({ date: "" });
  const [searchQuery] = useState<string>("");
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  //   const role = getConfigByRole();

  const thead = useMemo(
    () => [
      "SN",
      "Product",
      "Product Name",
      "Product ID",
      "Units Sold",
      "Sales Growth",
      "Average Sale Prices",
      "Revenue Generated",
      "Percentage of Total Revenue",
    ],
    []
  );

  const months = [
    { name: `January ${currentYear}` },
    { name: `February ${currentYear}` },
    { name: `March ${currentYear}` },
    { name: `April ${currentYear}` },
    { name: `May ${currentYear}` },
    { name: `June ${currentYear}` },
    { name: `July ${currentYear}` },
    { name: `August ${currentYear}` },
    { name: `September ${currentYear}` },
    { name: `October ${currentYear}` },
    { name: `November ${currentYear}` },
    { name: `December ${currentYear}` },
  ];

  const handleDateChange = (text: string) => {
    setFormData({
      ...formData,
      date: text,
    });
  };

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

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "pharmacyOrders",
        url: "pharmacy/orders",
        method: "get",
        payload: null,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (searchQuery) {
      return orders.filter((item) =>
        (item.fullname || item.username)
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    return orders;
  }, [orders, searchQuery]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage; // Starting index
    const end = start + itemsPerPage; // Ending index
    return filteredData.slice(start, end); // Slicing the filtered data
  }, [currentPage, filteredData, itemsPerPage]);

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setOrders(queries[0].data.data);
      console.log(queries[0].data.data);
    }
  }, [queries]);

  return (
    <>
      <NavLink
        to={"/pharmacy/home"}
        className={"flex items-center gap-3 mb-5 w-fit"}>
        <Icons.chevronLeft />
        <span className='font-medium text-2xl'>Total Revenue</span>
      </NavLink>
      {/* Header */}
      <TopFilterSection months={months} changeFunc={handleDateChange} />

      {/* Cards */}
      <TopSummaryAndTitleSection title='Total Revenue'>
        <div className='border border-[#7094FF4D] w-full text-center p-4 rounded-lg'>
          <p className='text-2xl text-[#333333] font-medium'>
            Total Revenue: <span className='font-bold'>₦8,300,907,098</span>
          </p>
        </div>
      </TopSummaryAndTitleSection>

      {/* Search and Filter */}
      <p className='text-2xl font-medium my-5'>Revenue Breakdowns</p>
      {/* <div className='grid lg:grid-flow-col gap-2'>
        <div className='bg-[#00808026] border-[#00808026] flex justify-start p-2 border rounded-lg lg:col-span-3'>
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
      </div> */}

      {/* Table or Empty State */}
      {paginatedData.length > 0 ? (
        <>
          <div className='mt-5'>
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

export default TotalRevenue;
