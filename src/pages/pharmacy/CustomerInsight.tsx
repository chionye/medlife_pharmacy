/** @format */
import { useEffect, useMemo, useState } from "react";
// import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import { QueryProps } from "@/types";
import {
  TopFilterSection,
  TopSummaryAndTitleSection,
} from "@/components/section";
import { Icons } from "@/constants/svgs";
import HalfDoughnut from "@/components/half_doughnut";
import TitleBar from "@/components/title_bar";
import { NavLink } from "react-router-dom";

function CustomerInsight() {
//   const user = JSON.parse(getCookie("@user") || "{}");
  const [orders, setOrders] = useState<any[]>([]);
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

  const ageGroups = [
    {
      label: "18-25 Yrs",
      percentage: "23",
    },
    {
      label: "25-34 Yrs",
      percentage: "64",
    },
    {
      label: "35-44 Yrs",
      percentage: "17",
    },
    {
      label: "45-54 Yrs",
      percentage: "8",
    },
    {
      label: "55+",
      percentage: "2",
    },
  ];

  const locations = [
    {
      label: "Okpara Square",
      percentage: "23",
    },
    {
      label: "Independent Layout",
      percentage: "64",
    },
    {
      label: "Transekulu",
      percentage: "17",
    },
    {
      label: "Coal Camp",
      percentage: "8",
    },
    {
      label: "Achara Layout",
      percentage: "2",
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
      console.log(queries[0].data.data, orders);
    }
  }, [orders, queries]);

  return (
    <div className='overflow-x-hidden'>
      <NavLink
        to={"/pharmacy/home"}
        className={"flex items-center gap-3 mb-5 w-fit"}>
        <Icons.chevronLeft />
        <span className='font-medium text-2xl'>Customer’s Insight</span>
      </NavLink>
      <TopFilterSection months={months} changeFunc={handleDateChange} />

      <TopSummaryAndTitleSection title='Order Request Summary'>
        <div className='flex flex-wrap justify-evenly gap-y-1 w-full'>
          <div className='border border-[#7094FF4D] w-full text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              Total Order: 150,000
            </p>
          </div>
          <div className='border border-[#7094FF4D] lg:w-[49%] text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              Average Purchase Frequency Gauge: 208
            </p>
          </div>
          <div className='border border-[#7094FF4D] lg:w-[49%] text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              Returning vs. New Customers Breakdown: 30% new, 70% returning
            </p>
          </div>
        </div>
      </TopSummaryAndTitleSection>

      <div className='flex lg:flex-row flex-col justify-between gap-2 mt-5'>
        <div>
          <TitleBar title={"Customer Insight"} />
          <div className='flex flex-col items-center justify-center'>
            <HalfDoughnut />
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
        <div className='lg:w-[33%]'>
          <TitleBar title={"Age Groups Visualization"} />
          {ageGroups.map((ageGroup: any, index: number) => (
            <div key={index}>
              <div className='flex items-center justify-between my-2'>
                <p className='text-[#333333] font-light text-[13.2px] mt-2'>
                  {ageGroup.label}
                </p>
                <p className='text-[#333333] font-light text-[13.2px] mt-1'>
                  {ageGroup.percentage}.0%
                </p>
              </div>
              <div className='h-[20.75px] w-full bg-[#D9D9D9] rounded-[3.77px]'>
                <div
                  className='bg-[#585BA8] h-[20.75px] rounded-[3.77px]'
                  style={{ width: `${ageGroup.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className='lg:w-[33%]'>
          <TitleBar title={"Location"} />
          {locations.map((location: any, index: number) => (
            <div key={index}>
              <div className='flex items-center justify-between my-2'>
                <p className='text-[#333333] font-light text-[13.2px] mt-2'>
                  {location.label}
                </p>
                <p className='text-[#333333] font-light text-[13.2px] mt-1'>
                  {location.percentage}.0%
                </p>
              </div>
              <div className='h-[20.75px] w-full bg-[#D9D9D9] rounded-[3.77px]'>
                <div
                  className='bg-[#585BA8] h-[20.75px] rounded-[3.77px]'
                  style={{ width: `${location.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerInsight;
