/** @format */
import { useEffect, useMemo, useState } from "react";
import { getConfigByRole, getCookie } from "@/services/storage";
import {
  getMonthlyAppointmentSummary,
  getMonthlyTotalsForYear,
  getTopPatientsAndDoctors,
  getTotalForAllTime,
  toTitleCase,
} from "@/services/helpers";
import Query from "@/api/query";
import { QueryProps, TopDoctorsPropType } from "@/types";

import pin from "@/assets/pin.svg";
import add from "@/assets/add.svg";
import { GreetingSection } from "@/components/section";
import { CardWithButton } from "@/components/custom_cards";
import TitleBar from "@/components/title_bar";
import { Divider } from "@chakra-ui/react";
import { Card } from "@/components/ui/card";
import Chart from "@/components/chart";

function AdminHome() {
  const user = JSON.parse(getCookie("@user") || "{}");
  const [patient, setPatient] = useState<any>([]);
  const [appointments, setAppointments] = useState<any>([]);
  const [doctor, setDoctor] = useState<TopDoctorsPropType[]>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [topPatients, setTopPatients] = useState<
    { name: string; count: number }[]
  >([]);
  const [topDoctors, setTopDoctors] = useState<
    { name: string; count: number }[]
  >([]);
  const role = getConfigByRole();

  const cardValue = useMemo(
    () => [
      {
        title: "Total Number of Patients",
        buttonText: "Onboard Patient",
        link: "/doctor/message",
        icon: add,
        secondaryIcon: pin,
        count: patient.length || "0",
        type: "patient",
        modal: true,
      },
      {
        title: "Total Number of Doctors",
        buttonText: "Onboard Doctor",
        link: "/doctor/appointments",
        icon: add,
        secondaryIcon: pin,
        count: doctor.length,
        type: "doctor",
        modal: true,
      },
      {
        title: "Total Transactions",
        icon: add,
        secondaryIcon: pin,
        count: transactions.length,
        buttonText: `Total Commission: ₦${getTotalForAllTime(
          transactions
        ).toLocaleString()}`,
        link: "/doctor/appointments",
      },
    ],
    [doctor.length, patient.length, transactions]
  );

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "patients",
        url: "admin/users",
        method: "post",
        payload: { role: "patient" },
      },
      {
        id: "doctors",
        url: "admin/users",
        method: "post",
        payload: { role: "doctor" },
      },
      {
        id: "transaction",
        url: `transactions/all/${user.id}`,
        method: "get",
        payload: null,
      },
      {
        id: "appointments",
        url: `appointment/all/${user.id}`,
        method: "get",
        payload: null,
      },
    ],
    []
  );

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    // Check if the queries exist and have data
    if (
      queries[0] &&
      queries[0].data &&
      queries[0].data[0] &&
      queries[0].data[0].status
    ) {
      setPatient(queries[0].data[0].data || []);
    }

    if (
      queries[1] &&
      queries[1].data &&
      queries[1].data[0] &&
      queries[1].data[0].status
    ) {
      setDoctor(queries[1].data[0].data || []);
    }
    if (
      queries[2] &&
      queries[2].data &&
      queries[2].data &&
      queries[2].data.status
    ) {
      setTransactions(queries[2].data.data || []);
    }
    if (
      queries[3] &&
      queries[3].data &&
      queries[3].data &&
      queries[3].data.status
    ) {
      const { topPatients, topDoctors } = getTopPatientsAndDoctors(
        queries[3].data.data
      );
      setAppointments(queries[3].data.data);
      setTopPatients(topPatients);
      setTopDoctors(topDoctors);
    }
  }, [
    queries[0].isPending,
    queries[1].isPending,
    queries[2].isPending,
    queries[3].isPending,
  ]);

  return (
    <>
      <GreetingSection
        name={user ? toTitleCase(user.fullname || user.username) : "Guest"}
        subtitle={"Welcome back admin!"}
        role={role}
      />

      <div className='flex flex-col space-y-6 mt-5'>
        <div className='w-full'>
          <div className='grid lg:grid-flow-col gap-2'>
            {cardValue.map((item: any, index: number) => (
              <CardWithButton key={index} {...item} />
            ))}
          </div>
          {/* &8358; */}
        </div>
      </div>

      <div className='flex flex-col lg:flex-row flex-wrap sm:px-0 lg:px-8 sm:gap-5 lg:gap-20 mt-5'>
        <div>
          <TitleBar title={"Transactions"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart
              data={getMonthlyTotalsForYear(
                transactions,
                new Date().getFullYear()
              )}
              xaxis={"month"}
              yaxis={"total"}
            />
          </Card>
        </div>
        <div>
          <TitleBar title={"Top Patient"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart data={topPatients} xaxis={"name"} yaxis={"count"} />
          </Card>
        </div>
        <div>
          <TitleBar title={"Top Physician"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart data={topDoctors} xaxis={"name"} yaxis={"count"} />
          </Card>
        </div>
        <div>
          <TitleBar title={"Appointments"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart
              data={getMonthlyAppointmentSummary(appointments)}
              xaxis={"month"}
              yaxis={"total"}
            />
          </Card>
        </div>
        {/*  <div>
          <TitleBar title={"Top Patients Category"} link={"/admin/home"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart data={undefined} xaxis={"name"} />
          </Card>
        </div> */}
      </div>
    </>
  );
}

export default AdminHome;
