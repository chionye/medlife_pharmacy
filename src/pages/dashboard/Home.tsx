/** @format */
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "@/services/storage";
import { toTitleCase } from "@/services/helpers";
import Query from "@/api/query";
import {
  AppointmentHistoryPropType,
  MedicationHistoryPropType,
  PatientPropType,
  QueryProps,
  TopDoctorsPropType,
} from "@/types";

import video_icon from "@/assets/video_icon.svg";
import pin from "@/assets/pin.svg";
import add from "@/assets/add.svg";
import bell from "@/assets/bell.svg";
import speedometer from "@/assets/speedometer.svg";
import height from "@/assets/height.svg";
import gauge from "@/assets/gauge.svg";
import glucose from "@/assets/glucose.svg";
import {
  AppointmentSection,
  DoctorPatientSection,
  GreetingSection,
  MedicationSection,
  Section,
} from "@/components/section";
import { CardWithButton, VitalCard } from "@/components/custom_cards";

function Home() {
  const user = JSON.parse(getCookie("@user") || "{}");
  const [doctors, setDoctors] = useState<TopDoctorsPropType[]>([]);
  const [medications, setMedications] = useState<MedicationHistoryPropType[]>(
    []
  );
  const [appointments, setAppointments] = useState<
    AppointmentHistoryPropType[]
  >([]);

  const cardValue = useMemo(
    () => [
      {
        title: "Chat a Doctor",
        buttonText: "Call A Doctor",
        link: "/dashboard/message",
        icon: add,
        secondaryIcon: video_icon,
      },
      {
        title: "Current Appointment",
        buttonText: "Book Appointment",
        link: "/dashboard/appointments",
        icon: add,
        secondaryIcon: pin,
        count: appointments.length,
      },
    ],
    [appointments.length]
  );

  const vitals: PatientPropType[] = useMemo(
    () => [
      {
        title: "My Weight",
        icon: speedometer,
        value: user?.weight || "0",
        unit: "kg",
      },
      {
        title: "My Height",
        icon: height,
        value: user?.height || "0",
        unit: "",
      },
      {
        title: "My Blood Pressure",
        icon: gauge,
        value: user?.blood_pressure || "0",
        unit: "",
      },
      {
        title: "Glucose Level",
        icon: glucose,
        value: user?.glucose_level || "0",
        unit: "",
      },
    ],
    [user?.blood_pressure, user?.glucose_level, user?.height, user?.weight]
  );

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
        url: "list_medications",
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
    if (queries[0].data?.status) setDoctors(queries[0].data.data || []);
    if (queries[1].data?.status) setMedications(queries[1].data.data || []);
    if (queries[2].data?.status) setAppointments(queries[2].data.data || []);
  }, [queries]);

  return (
    <>
      <GreetingSection
        name={user ? toTitleCase(user.fullname || user.username) : "Guest"}
        subtitle={"We sure hope you’re having a great day!"}
        bell={bell}
      />

      <div className='flex flex-col space-y-6 mt-5'>
        <div className='md:w-[67%] w-full'>
          <div className='grid md:grid-flow-col gap-2'>
            {cardValue.map((item: any) => (
              <CardWithButton
                title={item.title ? item.title : ""}
                buttonText={item.buttonText ? item.buttonText : ""}
                link={item.link ? item.link : ""}
                icon={item.icon ? item.icon : ""}
                secondaryIcon={item.secondaryIcon ? item.secondaryIcon : ""}
                count={item.count ? item.count : "0"}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='mt-10'>
        <h4 className='text-xl font-medium'>My Vitals</h4>
        <div className='flex flex-col space-y-6 mt-5'>
          <div className='grid md:grid-flow-col gap-2'>
            {vitals.map((vital, index) => (
              <VitalCard
                key={index}
                title={vital.title}
                value={vital.value}
                unit={vital.unit}
                icon={vital.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row sm:px-0 md:px-8 sm:gap-5 md:gap-20 mt-5'>
        <DoctorPatientSection doctors={doctors} link='/' title='Top Doctors' />
        <Section>
          <MedicationSection
            medications={medications}
            link='/dashboard/medication'
            title='My Medications'
          />
          <AppointmentSection
            appointments={appointments}
            link='/dashboard/appointments'
            title='Appointments'
          />
        </Section>
      </div>
    </>
  );
}

export default Home;
