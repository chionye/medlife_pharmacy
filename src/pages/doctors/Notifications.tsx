/** @format */

import pinned from "@/assets/pinned.svg";
import add from "@/assets/add.svg";
import task_done from "@/assets/task_done.svg";
import search from "@/assets/search.svg";
import filter from "@/assets/filter.svg";
import Dropdown from "@/components/dropdown";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { QueryProps } from "@/types";
import Query from "@/api/query";
import { getConfigByRole, getCookie } from "@/services/storage";
import { EmptyNotifications } from "@/components/empty";
import { CardWithButton } from "@/components/custom_cards";
import { getTotalAddedThisMonthAndYear } from "@/services/helpers";
import { GreetingSection, NotificationSection } from "@/components/section";
import TitleBar from "@/components/title_bar";

const DoctorNotifications = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [patients, setPatients] = useState<any>([]);
  const [notifications, setNotifications] = useState<any>([]);
  const [patientTotal, setPatientTotal] = useState<any>({
    thisYear: 0,
    thisMonth: 0,
  });

  const role = getConfigByRole();

  const cardValue = useMemo(
    () => [
      {
        title: "Total Number of Patients",
        buttonText: "Onboard New Patients",
        link: "/doctor/appointments",
        icon: add,
        secondaryIcon: pinned,
        count: patients.length,
        modal: true,
        type: "patient",
      },
      {
        title: "No of New Patients",
        icon: add,
        subtitle: "This Month",
        secondaryIcon: task_done,
        count: patientTotal.thisMonth,
      },
      {
        title: "No of New Patients",
        icon: add,
        subtitle: "This Year",
        secondaryIcon: task_done,
        count: patientTotal.thisYear,
      },
    ],
    [patientTotal.thisMonth, patientTotal.thisYear, patients.length]
  );

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "appointments",
        url: "patients/doctor",
        method: "post",
        payload: { patients_id: userData?.id },
      },
    ],
    [userData?.id]
  );

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

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setNotifications([]);
      setPatients(queries[0].data.data);
      const totals = getTotalAddedThisMonthAndYear(queries[0].data.data);

      setPatientTotal((prev: any) => ({
        ...prev,
        thisMonth: totals.thisMonth,
        thisYear: totals.thisYear,
      }));
    }
  }, []);

  return (
    <>
      {/* Header */}
      <GreetingSection role={role} dropdown={true} />

      {/* Stats Cards */}
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='grid lg:grid-flow-col gap-2'>
          {cardValue.map((item: any) => (
            <CardWithButton
              title={item.title ? item.title : ""}
              buttonText={item.buttonText ? item.buttonText : ""}
              link={item.link ? item.link : ""}
              icon={item.icon ? item.icon : ""}
              secondaryIcon={item.secondaryIcon ? item.secondaryIcon : ""}
              count={item.count ? item.count : "0"}
              modal={item.modal ? item.modal : false}
              subtitle={item.subtitle ? item.subtitle : ""}
              type={item.type ? item.type : ""}
            />
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className='mt-10 grid lg:grid-flow-col gap-2'>
        <div className='bg-[#00808026] border-[#00808026] flex justify-start p-2 border rounded-lg lg:col-span-3'>
          <img src={search} alt='search icon' />
          <Input
            type='text'
            placeholder='Search'
            className='border-0 bg-transparent shadow-none outline-none focus:outline-none'
          />
        </div>
        <Dropdown
          label='Filter By'
          cn='w-full h-13'
          icon={<img src={filter} alt='filter icon' />}
          options={appointmentOptions}
        />
      </div>

      {/* Table or Empty State */}
      {notifications.length > 0 ? (
        <div className='mt-10'>
          <TitleBar title={"Notifications"} />
          <NotificationSection notifications={[]} />
        </div>
      ) : (
        <EmptyNotifications />
      )}
    </>
  );
};

export default DoctorNotifications;
