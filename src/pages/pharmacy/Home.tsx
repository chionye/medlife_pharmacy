/** @format */
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import { QueryProps, ShopPropType } from "@/types";
import medicine from "@/assets/medicine.png";
import {
  ExpireyProductSection,
  TopFilterSection,
  TopSellingProductSection,
} from "@/components/section";
import { ColoredCard } from "@/components/custom_cards";
import { Icons } from "@/constants/svgs";
import { Button } from "@/components/ui/button";
import CustomAreaChart from "@/components/CustomAreaChart";

function PharmacyHome() {
  const user = JSON.parse(getCookie("@user") || "{}");
  const [chartTab] = useState<string>("Monthly");
  const currentYear = new Date().getFullYear().toString();
  const [formData, setFormData] = useState<any>({ date: "" });
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

  const tabs = ["Add Product", "View Orders", "Update Inventory"];
  const chartTabs = ["Monthly", "Daily", "Weekly"];
  const dummyData = [
    {
      title: "Apennbnp",
      subtitle: "12 Capsules in 1 pack",
      availability: "In Stock",
      price: "55.00",
      imgSrc: medicine,
    },
    {
      title: "Clartin",
      subtitle: "Liquid ",
      availability: "In Stock",
      price: "55.00",
      imgSrc: medicine,
    },
    {
      title: "Apennbnp",
      subtitle: "12 Capsules in 1 pack",
      availability: "In Stock",
      price: "55.00",
      imgSrc: medicine,
    },
    {
      title: "Clartin",
      subtitle: "Liquid ",
      availability: "In Stock",
      price: "55.00",
      imgSrc: medicine,
    },
  ];
  const dummyData1 = [
    {
      title: "Pregnancy Kits",
      subtitle: "23/08/2025",
      availability: "In Stock: 200 Packs",
      price: "55.00",
      imgSrc: medicine,
    },
    {
      title: "Clartin",
      subtitle: "23/08/2025",
      availability: "In Stock: 200 Packs",
      price: "55.00",
      imgSrc: medicine,
    },
    {
      title: "Apennbnp",
      subtitle: "23/08/2025",
      availability: "In Stock: 200 Packs",
      price: "55.00",
      imgSrc: medicine,
    },
    {
      title: "Clartin",
      subtitle: "23/08/2025",
      availability: "In Stock: 200 Packs",
      price: "55.00",
      imgSrc: medicine,
    },
  ];

  const vitals: ShopPropType[] = useMemo(
    () => [
      {
        title: "Total Revenue",
        value: "₦8,300,000",
        iconColor: "#5F66E9",
        bgColor: "#5F66E933",
        textColor: "#5F66E9",
        link: "/pharmacy/total-revenue",
      },
      {
        title: "Order Volume",
        value: "32",
        iconColor: "#FF9533",
        bgColor: "#FF953333",
        textColor: "#FF9533",
        link: "/pharmacy/home",
      },
      {
        title: "Top-selling products",
        value: "13",
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
        link: "/pharmacy/home",
      },
      {
        title: "Pending Orders",
        value: "9",
        iconColor: "#EF33FF",
        bgColor: "#EF33FF33",
        textColor: "#EF33FF",
        link: "/pharmacy/home",
      },
    ],
    []
  );

  // const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;
  //   setFormData({
  //     ...formData,
  //     [target.name]: target.value,
  //   });
  // };

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
        id: "doctors",
        url: "doctors",
        method: "post",
        payload: { user_id: user?.id },
      },
      {
        id: "medications",
        url: "medications/list",
        method: "post",
        payload: { user_id: user?.id },
      },
      {
        id: "appointments",
        url: "appointment/list",
        method: "post",
        payload: { user_id: user?.id },
      },
    ],
    [user?.id]
  );

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    // if (queries[0].data?.status) setDoctors(queries[0].data.data || []);
  }, [queries]);

  return (
    <>
      <TopFilterSection months={months} changeFunc={handleDateChange} />

      <div className='flex lg:gap-5 gap-3 items-center w-fit my-5'>
        {tabs.map((tab: string, index: number) => (
          <Button
            className='bg-white border border-[#585BA8] rounded-[4px] text-[#585BA8] text-[13px] font-medium hover:bg-[#585BA8] hover:text-white'
            key={index}>
            {tab}
          </Button>
        ))}
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

      <div className='flex flex-col lg:flex-row sm:px-0 lg:px-8 sm:gap-5 lg:gap-20 mt-5'>
        <div className='lg:w-1/2 px-10 py-10 bg-[#0111A205] border border-[#0111A280] h-[439px] overflow-y-scroll overflow-x-hidden rounded-[10px] scrollable-y'>
          <TopSellingProductSection
            data={dummyData}
            link='/patient/top-doctors'
            title='Top-Selling Product'
            patient_id={user.id}
            cn={"w-full"}
          />
        </div>
        <div className='lg:w-1/2 px-10 py-10 bg-[#0111A205] border border-[#0111A280] h-[439px] overflow-y-scroll overflow-x-hidden rounded-[10px] scrollable-y'>
          <ExpireyProductSection
            data={dummyData1}
            link='/patient/top-doctors'
            title='Expiry Alert'
            patient_id={user.id}
            cn={"w-full"}
          />
        </div>
      </div>
      <div className='border border-[#0111A2] rounded-[10px] flex flex-col items-center justify-center py-10 mt-10'>
        <div className='w-full flex justify-between items-center px-10'>
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
    </>
  );
}

export default PharmacyHome;
