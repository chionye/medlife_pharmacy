/** @format */

import pinned from "@/assets/pinned.svg";
import add from "@/assets/add.svg";
import task_done from "@/assets/task_done.svg";
import { useEffect, useMemo, useState } from "react";
import { QueryProps } from "@/types";
import Query from "@/api/query";
import { getConfigByRole, getCookie } from "@/services/storage";
import { CardWithButton } from "@/components/custom_cards";
import {
  calculatePatientAverageRating,
  getTotalAddedThisMonthAndYear,
} from "@/services/helpers";
import { GreetingSection } from "@/components/section";

const AdminPerformance = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [patients, setPatients] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  // const [filterSelect, setFilterSelect] = useState<string>("Patient");
  const [patientTotal, setPatientTotal] = useState<any>({
    thisYear: 0,
    thisMonth: 0,
  });
  // const [searchQuery, setSearchQuery] = useState<string>("");
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [itemsPerPage] = useState<number>(10);
  // const totalPages = Math.ceil(patients.length / itemsPerPage);
  const role = getConfigByRole();

  // const thead = useMemo(
  //   () => [
  //     "SN",
  //     "Name of Patients",
  //     "Patient’s Age",
  //     "Last Appointment",
  //     "Upcoming Appointment",
  //     "Appoinment Details",
  //     "Status",
  //     "View More",
  //   ],
  //   []
  // );

  // const keys = useMemo(
  //   () => [
  //     "SN",
  //     "fullname",
  //     "dob",
  //     "created_at",
  //     "updated_at",
  //     "description",
  //     "status",
  //     "view_more",
  //   ],
  //   []
  // );

  const cardValue = useMemo(
    () => [
      {
        title: "Number of consultations",
        buttonText: "Onboard New Patients",
        link: "/doctor/appointments",
        icon: add,
        secondaryIcon: pinned,
        count: appointments.length,
        modal: true,
      },
      {
        title: "Total Patients",
        icon: add,
        star: true,
        secondaryIcon: task_done,
        count: patients.length,
      },
      {
        title: "Patient satisfaction ratings",
        icon: add,
        star: true,
        secondaryIcon: task_done,
        count: calculatePatientAverageRating(ratings, "patient"),
      },
      {
        title: "Doctor performance metrics",
        icon: add,
        star: true,
        secondaryIcon: task_done,
        count: calculatePatientAverageRating(ratings, "doctor"),
      },
      {
        title: "Number of prescriptions issued",
        icon: add,
        secondaryIcon: task_done,
        count: patientTotal.thisYear,
      },
    ],
    [appointments.length, patientTotal.thisYear, ratings]
  );

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "doctors",
        url: "doctors",
        method: "post",
        payload: { user_id: userData.id },
      },
      {
        id: "rating",
        url: "ratings",
        method: "post",
        payload: { user_id: userData.id },
      },
      {
        id: "appointments",
        url: `appointment/all/${userData.id}`,
        method: "get",
        payload: null,
      },
    ],
    []
  );

  // const filterOptions = useMemo(() => [{ label: "Patient" }], []);

  // const handleFilterChange = (selectedValue: string) => {
  //   setFilterSelect(selectedValue);
  // };

  const { queries } = Query(queryParamsArray);

  // const filteredData = useMemo(() => {
  //   return patients.filter((item) =>
  //     item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // }, [patients, searchQuery]);

  // const paginatedData = useMemo(() => {
  //   const start = (currentPage - 1) * itemsPerPage;
  //   const end = start + itemsPerPage;
  //   return filteredData.slice(start, end);
  // }, [currentPage, filteredData, itemsPerPage]);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setPatients(queries[0].data.data);
      const totals = getTotalAddedThisMonthAndYear(queries[0].data.data);

      setPatientTotal((prev: any) => ({
        ...prev,
        thisMonth: totals.thisMonth,
        thisYear: totals.thisYear,
      }));
    }
    if (queries[1] && queries[1].data && queries[1].data.status) {
      setRatings(queries[1].data.data || []);
    }
    if (queries[2] && queries[2].data && queries[2].data.status) {
      setAppointments(queries[2].data.data || []);
    }
  }, [queries[0].isPending, queries[1].isPending, queries[2].isPending]);

  return (
    <>
      {/* Header */}
      <GreetingSection role={role} dropdown={true} />

      {/* Stats Cards */}
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='grid md:grid-flow-col gap-2'>
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
              star={item.star ? item.star : false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminPerformance;
