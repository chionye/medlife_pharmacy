/** @format */
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "@/services/storage";
import Dropdown from "@/components/dropdown";
import Query from "@/api/query";
import {
  QueryProps,
} from "@/types";
import {
  TopFilterSection,
  TopSummaryAndTitleSection,
} from "@/components/section";
import { Icons } from "@/constants/svgs";
import { Button } from "@/components/ui/button";
import search from "@/assets/search.svg";
import { Divider } from "@chakra-ui/react";

function OrderManagement() {
  const user = JSON.parse(getCookie("@user") || "{}");
  const [currentTab, setCurrentTab] = useState<string>("New Request");
  const currentYear = new Date().getFullYear().toString();
  const [formData, setFormData] = useState<any>({ date: "" });
  const [searchQuery, setSearchQuery] = useState<string>("");
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

  const tabs = [
    "New Request",
    "All Request",
    "In Process",
    "Completed Request",
    "Cancelled Request",
  ];

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

  //  const filteredData = useMemo(() => {
  //    if (searchQuery) {
  //      return appointments.filter((item) =>
  //        (item.fullname || item.username)
  //          ?.toLowerCase()
  //          .includes(searchQuery.toLowerCase())
  //      );
  //    }
  //    return appointments;
  //  }, [appointments, searchQuery]);

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

  }, [queries]);

  return (
    <>
      <TopFilterSection months={months} changeFunc={handleDateChange} />

      <TopSummaryAndTitleSection title='Order Request Summary'>
        <div className='flex flex-wrap justify-evenly gap-y-1 w-full'>
          <div className='border border-[#7094FF4D] lg:w-[33%] text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              New Requests: 15
            </p>
          </div>
          <div className='border border-[#7094FF4D] lg:w-[33%] text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              All Requests: 3
            </p>
          </div>
          <div className='border border-[#7094FF4D] lg:w-[33%] text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              In Process: 208
            </p>
          </div>
          <div className='border border-[#7094FF4D] lg:w-[66%] text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              Completed Request: 208
            </p>
          </div>
          <div className='border border-[#7094FF4D] lg:w-[33%] text-center p-2 rounded-lg'>
            <p className='text-[12px] text-[#333333] font-medium'>
              Cancelled Request: 234
            </p>
          </div>
        </div>
      </TopSummaryAndTitleSection>

      <div className='flex gap-3 items-center my-5'>
        {tabs.map((tab, index) => (
          <Button
            key={index}
            className={`shadow-none hover:bg-white  hover:text-[#008B4D]  hover:border-b  hover:border-[#008B4D] ${
              currentTab === tab
                ? "bg-white text-[#008B4D] border-b border-[#008B4D]"
                : "bg-white text-[#333333]"
            } px-4 rounded-md`}
            onClick={() => setCurrentTab(tab)}>
            {tab}
          </Button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className='mt-10 grid lg:grid-flow-col gap-2'>
        <div className='bg-[#7854970A] border-[#D9C8E7] flex justify-start p-2 border rounded-lg lg:col-span-3 gap-2'>
          <img src={search} alt='search icon' />
          <input
            type='text'
            placeholder='Search'
            className='border-none bg-transparent shadow-none outline-none focus:outline-none w-full'
            value={searchQuery} // Bind search query state
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
          />
        </div>
        <Dropdown
          label='Filter By'
          cn='w-full h-13'
          options={appointmentOptions}
        />
      </div>

      <div className='flex flex-col lg:flex-row sm:gap-5 lg:gap-20 mt-5'>
        <div className='lg:w-[33%] rounded-[14.8px] border border-[#585BA8] bg-[#008B4D0A]'>
          <div className='p-3'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <span className='w-[53.92px] h-[53.92px] rounded-[4.49px] bg-[#585BA8] flex justify-center items-center text-white font-medium text-[22.47px]'>
                  <span>01</span>
                </span>
                <div>
                  <p className='text-[#333333] font-medium text-[14.38px]'>
                    Watson Joyce
                  </p>
                  <p className='text-[#008B4D] font-bold text-[10.78px] mt-1'>
                    Invoice #ED34DA1Z
                  </p>
                </div>
              </div>
              <div>
                <p className='text-[#333333] font-light text-[10.78px] flex items-center gap-2 bg-[#FFEDBE] rounded-[4.49px] px-1 py-1'>
                  <Icons.check />
                  <span>Pending</span>
                </p>
                <p className='text-[#333333] font-light text-[10.78px] flex items-center gap-2 mt-1'>
                  <Icons.dot />
                  <span>Pending</span>
                  <Icons.chevronDown />
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                Wednesday, 28, 2024
              </p>
              <p className='text-[#333333] font-light text-[14.38px] mt-1'>
                4 : 48 PM
              </p>
            </div>
            <Divider color={"black"} />
            <div className='flex items-center justify-between my-2'>
              <div className='flex items-center gap-2'>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  Qty
                </p>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  Items
                </p>
              </div>
              <p className='text-[#333333] font-light text-[14.38px] mt-1'>
                Price
              </p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <div className='flex items-center gap-2'>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  01
                </p>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  Accu-check ActiveTest Strip
                </p>
              </div>
              <p className='text-[#333333] font-bold text-[14.38px] mt-1'>
                ₦9300
              </p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <div className='flex items-center gap-2'>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  02
                </p>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  Apennbnp
                </p>
              </div>
              <p className='text-[#333333] font-bold text-[14.38px] mt-1'>
                ₦1300
              </p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <div className='flex items-center gap-2'>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  03
                </p>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  Omega 3 Oil
                </p>
              </div>
              <p className='text-[#333333] font-bold text-[14.38px] mt-1'>
                ₦4300
              </p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <div className='flex items-center gap-2'>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  04
                </p>
                <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                  Citrus Probiotics
                </p>
              </div>
              <p className='text-[#333333] font-bold text-[14.38px] mt-1'>
                ₦8300
              </p>
            </div>
            <Divider color={"black"} />
            <div className='flex items-center justify-between my-2'>
              <p className='text-[#333333] font-light text-[14.38px] mt-2'>
                Total
              </p>
              <p className='text-[#333333] font-bold text-[14.38px] mt-1'>
                ₦8300
              </p>
            </div>
            <div className='my-5 flex justify-between items-center'>
              <button
                className='border border-[#E70000] bg-transparent shadow-none py-[17.97px] px-[44.94px] rounded-[8.99px]'
                title='Delete Order'>
                <Icons.trash />
              </button>
              <button
                className='bg-[#008B4D] text-white lg:py-[17.97px] lg:px-14 rounded-[8.99px]'
                title='Accept Order'>
                Accept Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderManagement;
