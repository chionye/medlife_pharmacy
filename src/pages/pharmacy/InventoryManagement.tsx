/** @format */
import { useEffect, useMemo, useState } from "react";
// import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import {
  QueryProps,
  ShopPropType,
} from "@/types";
import { TopFilterSection } from "@/components/section";
import { ColoredCard } from "@/components/custom_cards";
import { Icons } from "@/constants/svgs";
import FullModal from "@/components/full_modal";
import { EmptyAppointment } from "@/components/empty";
import Pagination from "@/components/pagination";
import Table from "@/components/table";

function InventoryManagement() {
//   const user = JSON.parse(getCookie("@user") || "{}");
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const currentYear = new Date().getFullYear().toString();
  const [itemsPerPage] = useState<number>(10);
  const [formData, setFormData] = useState<any>({ date: "" });
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const [searchQuery] = useState<string>("");
  // const role = getConfigByRole();
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

  const vitals: ShopPropType[] = useMemo(
    () => [
      {
        title: "Total Product Inventory",
        value: "100",
        iconColor: "#5F66E9",
        bgColor: "#5F66E933",
        textColor: "#5F66E9",
        link: "/pharmacy/product-breakdown/revenue_total",
      },
      {
        title: "Top-selling products",
        value: "13",
        iconColor: "#FF9533",
        bgColor: "#FF953333",
        textColor: "#FF9533",
        link: "/pharmacy/home",
      },
      {
        title: "Low-Stock Items",
        value: "23",
        iconColor: "#008B4D",
        bgColor: "#008B4D33",
        textColor: "#008B4D",
        link: "/pharmacy/home",
      },
      {
        title: "Product Expiring Soon",
        value: "9",
        iconColor: "#FF333F",
        bgColor: "#FF333F33",
        textColor: "#FF333F",
        link: "/pharmacy/product-breakdown/expiring_soon",
      },
      {
        title: "Out-of-Stock Items",
        value: "9",
        iconColor: "#EF33FF",
        bgColor: "#EF33FF33",
        textColor: "#EF33FF",
        link: "/pharmacy/product-breakdown/Out-of-Stock_Items",
      },
    ],
    []
  );

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const target = e.target as HTMLInputElement;
//     setFormData({
//       ...formData,
//       [target.name]: target.value,
//     });
//   };

  const handleDateChange = (text: string) => {
    setFormData({
      ...formData,
      date: text,
    });
  };

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

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setOrders(queries[0].data.data);
      console.log(queries[0].data.data);
    }
  }, [queries]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <TopFilterSection months={months} changeFunc={handleDateChange} />
        <div className='flex items-center gap-2'>
          <div className='relative mt-2'>
            <button title='notifications' className='relative'>
              <Icons.bell />
            </button>
            <div className='absolute top-0 right-0'>
              <Icons.dot size='12' color='#00C2C2' />
            </div>
          </div>
          <FullModal
            icon={<Icons.plus color='#5F66E9' />}
            title={"CREATE NEW PRODUCT CATEGORY"}
            btnTitle='Create Product Category'
            cn={
              "bg-white w-full text-sm text-[#5F66E9] hover:no-underline rounded-[4px] flex items-center justify-center px-2 py-2 border border-[#5F66E9]"
            }>
            <div className='flex justify-center items-center'></div>
          </FullModal>
        </div>
      </div>

      <div className='flex lg:gap-5 gap-3 items-center w-full my-5'>
        <FullModal
          icon={<Icons.plus />}
          title={"ADD PRODUCT TO INVENTORY"}
          btnTitle='Add Product to Inventory'
          cn={
            "bg-[#5F66E9] w-4/5 text-sm text-white hover:no-underline rounded-[4px] flex items-center justify-center px-8 py-3 border border-[#5F66E9]"
          }>
          <div className='flex justify-center items-center'></div>
        </FullModal>
        <FullModal
          icon={<Icons.plus color='#5F66E9' />}
          title={"ADD PRODUCT TO INVENTORY"}
          btnTitle='Upload Inventory'
          cn={
            "bg-white w-1/5 text-sm text-[#5F66E9] hover:no-underline rounded-[4px] flex items-center justify-center px-2 py-3 border border-[#5F66E9]"
          }>
          <div className='flex justify-center items-center'></div>
        </FullModal>
      </div>

      <div className='mt-5'>
        <div className='flex flex-col space-y-6 mt-5'>
          <div className='grid lg:grid-flow-col gap-2'>
            {vitals.map((vital, index) => (
              <ColoredCard
                index={index}
                title={vital.title}
                value={vital.value}
                iconColor={vital.iconColor}
                bgColor={vital.bgColor}
                textColor={vital.textColor}
                link={vital.link}
              />
            ))}
          </div>
        </div>
      </div>

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
}

export default InventoryManagement;
