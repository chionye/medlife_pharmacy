/** @format */
import { useEffect, useMemo, useState } from "react";
import { getConfigByRole, getCookie } from "@/services/storage";
import { toTitleCase } from "@/services/helpers";
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
  const [doctor, setDoctor] = useState<TopDoctorsPropType[]>([]);
  // const [transactions, setTransactions] = useState<any>([]);
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
        title: "Daily Transaction",
        icon: add,
        secondaryIcon: pin,
        count: "0",
        buttonText: "Total Commission : #43,230",
        link: "/doctor/appointments",
      },
    ],
    [doctor.length, patient.length]
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
        url: `user/transactions/${user.id}`,
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
  }, [queries]);

  return (
    <>
      <GreetingSection
        name={user ? toTitleCase(user.fullname || user.username) : "Guest"}
        subtitle={"Welcome back admin!"}
        role={role}
      />

      <div className='flex flex-col space-y-6 mt-5'>
        <div className='w-full'>
          <div className='grid md:grid-flow-col gap-2'>
            {cardValue.map((item: any, index: number) => (
              <CardWithButton key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row flex-wrap sm:px-0 md:px-8 sm:gap-5 md:gap-20 mt-5'>
        <div>
          <TitleBar title={"Frequent Patient"} link={"/admin/home"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart data={undefined} />
          </Card>
        </div>
        <div>
          <TitleBar title={"Top Physician"} link={"/admin/home"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart data={undefined} />
          </Card>
        </div>
        <div>
          <TitleBar title={"Medication"} link={"/admin/home"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart data={undefined} />
          </Card>
        </div>
        <div>
          <TitleBar title={"Top Patients Category"} link={"/admin/home"} />
          <Divider className='mt-5' />
          <Card className='mt-5'>
            <Chart data={undefined} />
          </Card>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
