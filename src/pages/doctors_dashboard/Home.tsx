/** @format */
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "@/services/storage";
import { toTitleCase } from "@/services/helpers";
import Query from "@/api/query";
import {
  AppointmentHistoryPropType,
  QueryProps,
  TopDoctorsPropType,
} from "@/types";

import video_icon from "@/assets/video_icon.svg";
import pin from "@/assets/pin.svg";
import add from "@/assets/add.svg";
import bell from "@/assets/bell.svg";
import {
  AppointmentSection,
  DoctorPatientSection,
  GreetingSection,
  Section,
} from "@/components/section";
import { CardWithButton } from "@/components/custom_cards";

function DoctorsHome() {
  const user = JSON.parse(getCookie("@user") || "{}");
  const [doctors, setDoctors] = useState<TopDoctorsPropType[]>([]);
  const [appointments, setAppointments] = useState<
    AppointmentHistoryPropType[]
  >([]);

  const cardValue = useMemo(
    () => [
      {
        title: "Chat Patient",
        buttonText: "Call A Patient",
        link: "/doctor/message",
        icon: add,
        secondaryIcon: video_icon,
      },
      {
        title: "Current Appointment",
        buttonText: "Create Appointment",
        link: "/doctor/appointments",
        icon: add,
        secondaryIcon: pin,
        count: appointments.length,
      },
      {
        title: "Total Calls",
        icon: add,
        secondaryIcon: video_icon,
        count: "0",
        subtitle: "Today",
      }
    ],
    [appointments.length]
  );

  const queryParamsArray: QueryProps = useMemo(
    () => [
      {
        id: "patients",
        url: "doctor/patients",
        method: "post",
        payload: { doctor_id: user?.id },
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
    if (queries[0].data?.status) setDoctors(queries[0].data.data || []);
    if (queries[1].data?.status) setAppointments(queries[2].data.data || []);
  }, [queries]);

  return (
    <>
      <GreetingSection
        name={user ? toTitleCase(user.fullname || user.username) : "Guest"}
        subtitle={"Welcome back doc!"}
        bell={bell}
      />

      <div className='flex flex-col space-y-6 mt-5'>
        <div className='w-full'>
          <div className='grid md:grid-flow-col gap-2'>
            {cardValue.map((item: any) => (
              <CardWithButton
                title={item.title ? item.title : ""}
                buttonText={item.buttonText ? item.buttonText : ""}
                link={item.link ? item.link : ""}
                icon={item.icon ? item.icon : ""}
                secondaryIcon={item.secondaryIcon ? item.secondaryIcon : ""}
                count={item.count ? item.count : ""}
                subtitle={item.subtitle ? item.subtitle : null}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row sm:px-0 md:px-8 sm:gap-5 md:gap-20 mt-5'>
        <DoctorPatientSection doctors={doctors} title='Top Patients' link='/' />
        <Section>
          <AppointmentSection
            appointments={appointments}
            link='/doctor/appointments'
            title='Appointment Request'
            buttons={true}
          />
          <AppointmentSection
            appointments={appointments}
            link='/doctor/appointments'
            title='Appointments'
          />
        </Section>
      </div>
    </>
  );
}

export default DoctorsHome;
