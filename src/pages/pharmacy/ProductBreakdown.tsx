/** @format */

import Table from "@/components/table";
import { useEffect, useMemo, useState } from "react";
import { QueryProps } from "@/types";
import Query from "@/api/query";
import { EmptyAppointment } from "@/components/empty";
import {
  TopFilterSection,
  TopSummaryAndTitleSection,
} from "@/components/section";
import Pagination from "@/components/pagination";
import { Icons } from "@/constants/svgs";
import { NavLink, useParams } from "react-router-dom";
import { toTitleCase } from "@/services/helpers";

const ProductBreakdown = () => {
  const { slug } = useParams();
  const pageTitle = slug ? toTitleCase(slug.replace("_", " ")) : "";
  const splitPageTitle = pageTitle.split(" ");
  const firstWord = splitPageTitle[0];

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
      "Quantity",
      "Category",
      "Unit Price",
      "Status",
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
        to={"/pharmacy/analytics"}
        className={"flex items-center gap-3 mb-5 w-fit"}>
        <Icons.chevronLeft />
        <span className='font-medium text-2xl'>Total {firstWord}</span>
      </NavLink>
      {/* Header */}
      <TopFilterSection months={months} changeFunc={handleDateChange} />

      {/* Cards */}
      <TopSummaryAndTitleSection title='Total Revenue'>
        <div className='border border-[#7094FF4D] w-full text-center p-4 rounded-lg'>
          <p className='text-2xl text-[#333333] font-medium'>
            Total {firstWord}: <span className='font-bold'>₦8,300,907,098</span>
          </p>
        </div>
      </TopSummaryAndTitleSection>

      {/* Search and Filter */}
      <p className='text-2xl font-medium my-5'>{firstWord} Breakdowns</p>

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

export default ProductBreakdown;
