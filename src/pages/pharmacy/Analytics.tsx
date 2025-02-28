/** @format */
import { useEffect, useMemo, useState } from "react";
// import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import { QueryProps, ShopPropType } from "@/types";
import { TopFilterSection } from "@/components/section";
import { ColoredCard } from "@/components/custom_cards";
import { Icons } from "@/constants/svgs";
import { Button } from "@/components/ui/button";
import CustomAreaChart from "@/components/CustomAreaChart";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import { EmptyAppointment } from "@/components/empty";
import HalfDoughnut from "@/components/half_doughnut";
import TitleBar from "@/components/title_bar";

function Analytics() {
//   const user = JSON.parse(getCookie("@user") || "{}");
  const [orders, setOrders] = useState<any[]>([]);
  const [chartTab] = useState<string>("Monthly");
  const currentYear = new Date().getFullYear().toString();
  const [formData, setFormData] = useState<any>({ date: "" });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery] = useState<string>("");
  const [itemsPerPage] = useState<number>(10);
  const totalPages = Math.ceil(orders.length / itemsPerPage);
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

  const chartTabs = ["Monthly", "Daily", "Weekly"];
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
        title: "Total Revenue",
        value: "₦8,300,000",
        iconColor: "#5F66E9",
        bgColor: "#5F66E933",
        textColor: "#5F66E9",
        link: "/pharmacy/product-breakdown/revenue_total",
      },
      {
        title: "Average Order Value",
        value: "32",
        iconColor: "#FF9533",
        bgColor: "#FF953333",
        textColor: "#FF9533",
        link: "/pharmacy/home",
      },
      {
        title: "Order Volume",
        value: "13",
        iconColor: "#008B4D",
        bgColor: "#008B4D33",
        textColor: "#008B4D",
        link: "/pharmacy/home",
      },
      {
        title: "Expired Products",
        value: "9",
        iconColor: "#FF333F",
        bgColor: "#FF333F33",
        textColor: "#FF333F",
        link: "/pharmacy/product-breakdown/expired_products",
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

  const chartData = [
    {
      month: "Jan",
      total: 0,
      naxis: 100,
    },
    {
      month: "Feb",
      total: 1000,
      naxis: 200,
    },
    {
      month: "Mar",
      total: 200,
      naxis: 300,
    },
    {
      month: "Apr",
      total: 100,
      naxis: 0,
    },
    {
      month: "May",
      total: 90,
      naxis: 1000,
    },
  ];

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
    <div className='overflow-x-hidden'>
      <TopFilterSection months={months} changeFunc={handleDateChange} />

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

      <div className='border border-[#0111A2] rounded-[10px] flex flex-col items-center justify-center py-10 mt-10'>
        <div className='w-full flex justify-between items-center px-10 gap-2 overflow-x-scroll'>
          <p className='text-[#333333] font-medium text-[23px]'>Overview</p>
          <div className='flex items-center space-x-2'>
            {chartTabs.map((tab: string, index: number) => (
              <Button
                key={index}
                className={`${
                  chartTab === tab
                    ? "bg-[#50CD89]"
                    : "bg-white text-[#333333] shadow-none"
                } hover:bg-[#50CD89] hover:text-white px-[21px] py-[13px]`}>
                {tab}
              </Button>
            ))}
            <Button
              className={`bg-white border border-[#137C43] text-[#137C43] hover:bg-[#137C43] hover:text-white px-[21px] py-[13px]`}>
              <Icons.download />
              <span>Download</span>
            </Button>
          </div>
        </div>
        <div className='mt-5'>
          <CustomAreaChart
            data={chartData}
            xaxis={"month"}
            yaxis={"total"}
            naxis={"naxis"}
          />
        </div>
      </div>
      <div className='flex lg:flex-row flex-col items-start justify-center mt-5'>
        {/* Table or Empty State */}
        <div>
          <TitleBar title={"Top-Selling Product List"} />
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
        </div>
        <div>
          <TitleBar
            title={"Customer Insight"}
            link='/pharmacy/customer-insights'
          />
          <div className='flex flex-col items-center justify-center'>
            <div className='flex justify-center'>
              <HalfDoughnut />
            </div>
            <div className='flex items-center lg:ml-14 gap-1'>
              <Icons.dot color='#333333' size='9.64' />
              <p className='flex gap-52 text-lg font-medium'>
                <span>Male</span>
                <span>53%</span>
              </p>
            </div>
            <div className='flex items-center lg:ml-14 gap-1'>
              <Icons.dot color='#333333' size='9.64' />
              <p className='flex gap-48 text-lg font-medium'>
                <span>Female</span>
                <span>53%</span>
              </p>
            </div>
            <div className='flex items-center lg:ml-14 gap-1'>
              <p className='flex gap-48 text-lg font-medium'>
                <span>Others</span>
                <span>1%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
