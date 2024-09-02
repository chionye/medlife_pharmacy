/** @format */
// import { useState } from "react";
import { Card } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import video_icon from "@/assets/video_icon.svg";
import pin from "@/assets/pin.svg";
import add from "@/assets/add.svg";
import bell from "@/assets/bell.svg";
import speedometer from "@/assets/speedometer.svg";
import height from "@/assets/height.svg";
import gauge from "@/assets/gauge.svg";
import glucose from "@/assets/glucose.svg";
import doctor from "@/assets/doctor.svg";
import star from "@/assets/star.svg";
import user from "@/assets/user.svg";
import calendar from "@/assets/calendar.svg";
import clock from "@/assets/clock.svg";
import MedicationHistory from "@/components/medication_history";
import TopDoctors from "@/components/top_doctors";
import TitleBar from "@/components/title_bar";
// import { getCookieData } from "../../services/storage";
// import moment from "moment";
// import { Skeleton } from "@/components/ui/skeleton";
// import Chart from "@/components/chart";
// import Query from "../../api/query";

function Home() {
  //   const [userData] = useState<any>(getCookieData("user"));
  //   const [productData, setProductData] = useState<any>([]);
  //   const [transactionData, setTransactionData] = useState<any>([]);
  //   const queryParamsArray = [
  //     {
  //       id: "products",
  //       url: "product/",
  //     },
  //     {
  //       id: "transactions",
  //       url: "user/transactions",
  //     },
  //   ];
  //   const { queries } = Query(queryParamsArray);
  //   useEffect(() => {
  //     console.log(queries[1].data, queries[0].data);
  //     if (queries[0].isSuccess) {
  //       setProductData(queries[0].data.message);
  //     }
  //     if (queries[1].isSuccess) {
  //       setTransactionData(queries[1].data.data);
  //     }
  //   }, [queries]);

  return (
    <>
      <div className='flex justify-between'>
        <div>
          <h4 className='text-3xl font-bold'>Welcome, Mrs. Alexa</h4>
          <p className='text-sm font-thin'>
            We sure hope you’re having a great day!{" "}
          </p>
        </div>
        <NavLink to='/dashboard' className={"mt-2"}>
          <img src={bell} alt='plus icon' />
        </NavLink>
      </div>
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='md:w-[60%] w-full'>
          <div className='grid md:grid-flow-col gap-2'>
            <div className='md:col-span-3 col-span-3'>
              <Card className='border flex justify-between rounded-xl p-6'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    Chat a Doctor
                  </p>
                  <NavLink
                    to='/dashboard/shop'
                    className='bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between mt-10 px-8 py-1'>
                    <img src={add} alt='logo' />
                    <strong>Call A Doctor</strong>
                  </NavLink>
                </div>
                <img src={video_icon} alt='logo' className=' rounded-full' />
              </Card>
            </div>
            <div className='md:col-span-3 col-span-3'>
              <Card className='border flex justify-between rounded-xl p-6'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    Current Appointment
                  </p>
                  <p className='text-[26px]'>0</p>
                  <NavLink
                    to='/dashboard/appointments'
                    className='bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1 '>
                    <img src={add} alt='plus icon' />
                    <strong>Book Appointment</strong>
                  </NavLink>
                </div>
                <img src={pin} alt='pin icon' />
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <h4 className='text-xl font-medium'>My Body Vitals</h4>
      </div>
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='w-full'>
          <div className='grid md:grid-flow-col gap-2'>
            <div className='md:col-span-2 col-span-2'>
              <Card className='border flex justify-between rounded-xl p-12'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>My Weight</p>
                  <p className='text-[26px] mt-3'>47kg</p>
                </div>
                <img src={speedometer} alt='logo' className=' rounded-full' />
              </Card>
            </div>
            <div className='md:col-span-2 col-span-2'>
              <Card className='border flex justify-between rounded-xl p-12'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>My Height</p>
                  <p className='text-[26px] mt-3'>178</p>
                </div>
                <img src={height} alt='pin icon' />
              </Card>
            </div>
            <div className='md:col-span-2 col-span-2'>
              <Card className='border flex justify-between rounded-xl p-12'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    My Blood Pressure
                  </p>
                  <p className='text-[26px] mt-3'>140/90</p>
                </div>
                <img src={gauge} alt='logo' className=' rounded-full' />
              </Card>
            </div>
            <div className='md:col-span-2 col-span-2'>
              <Card className='border flex justify-between rounded-xl p-12'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    Glucose Level
                  </p>
                  <p className='text-[26px] mt-3'>89 - 72</p>
                </div>
                <img src={glucose} alt='pin icon' />
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row sm:px-0 md:px-8 sm:gap-5 md:gap-20 mt-5'>
        <div className='sm:w-full md:w-1/2'>
          <TitleBar title={"Top Doctors"} link='/' />
          <TopDoctors />
        </div>
        <div className='sm:w-full md:w-1/2'>
          <TitleBar title={"My Medication"} link='/dashboard/medication' />
          <MedicationHistory />
          <div className="mt-5">
            <TitleBar title={"Appointment"} link='/dashboard/appointments' />
            <div className='grid md:grid-flow-row gap-2 mt-5'>
              <div className='md:col-span-2 col-span-2'>
                <Card className='border flex justify-start gap-20 items-end rounded-xl p-4'>
                  <div className='flex justify-start items-center gap-2'>
                    <img src={user} alt='user image' />
                    <div className='flex flex-col gap-1'>
                      <p className='text-xs text-[#073131] font-semibold text-nowrap'>
                        Christopher Ezenwa
                      </p>
                      <p className='text-xs text-[#073131] font-normal'>
                        Dental Specialist
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='flex gap-1'>
                      <img src={calendar} alt='' />
                      <p className='text-xs text-[#073131] font-normal'>
                        23rd Sept, 2024
                      </p>
                    </div>
                    <div className='flex gap-1'>
                      <img src={clock} alt='' />
                      <p className='text-xs text-[#073131] font-normal'>
                        04:30pm
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
