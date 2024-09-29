/** @format */

import { NavLink } from "react-router-dom";
import AppointmentHistory from "./appointment_history";
import MedicationHistory from "./medication_history";
import TitleBar from "./title_bar";
import {TopDoctors} from "./top_doctors";
import { Card } from "./ui/card";
import FullModal from "./full_modal";
import ChangeUserForm from "./settings_form";
import Mutation from "@/api/mutation";
import { useNotifier } from "@/hooks/useNotifier";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RescheduleAppointmentForm } from "./appointment_form";
import Dropdown from "@/components/dropdown";
import bell from "@/assets/bell.svg";
import empty_user from "@/assets/empty_user.svg";
import { NotificationCardPropType, NotificationPropType } from "@/types";

export const Section = ({ children, cn = null }: any) => (
  <div className={`${cn ? cn : "sm:w-full md:w-1/2"}`}>{children}</div>
);

export const DoctorPatientSection = ({
  doctors,
  title,
  link,
  patient_id,
  cn = null,
}: any) => (
  <Section cn={cn}>
    <TitleBar title={title} link={link} />
    <div className='grid md:grid-flow-row col-span-4 gap-2 mt-5'>
      {doctors.length ? (
        doctors
          .slice(0, 5)
          .map((doctor: any) => (
            <TopDoctors patient_id={patient_id} {...doctor} />
          ))
      ) : (
        <p className='text-xs text-[#073131] font-semibold'>
          No {title.indexOf("doctor") != -1 ? "Doctors" : "Patients"} yet
        </p>
      )}
    </div>
  </Section>
);

export const MedicationSection = ({ medications, title, link }: any) => (
  <>
    <TitleBar title={title} link={link} />
    <div className='grid md:grid-flow-row gap-2 mt-5'>
      {medications.length ? (
        medications
          .slice(0, 5)
          .map((medication: any, index: number) => (
            <MedicationHistory key={index} {...medication} />
          ))
      ) : (
        <p className='text-xs text-[#073131] font-semibold'>
          No Medications yet
        </p>
      )}
    </div>
  </>
);

export const AppointmentSection = ({
  appointments,
  title,
  link,
  buttons,
}: any) => {
  const { showNotifier, NotifierComponent } = useNotifier();

  const { mutation } = Mutation();

  const handleButtonClick = (status: string, id: string) => {
    const data = {
      method: "post",
      url: status === "approve" ? `appointment/status` : "appointment/cancel",
      content: {
        appointment_id: id,
        action: status,
      },
    };

    mutation.mutate(data);
    if (mutation.isSuccess) {
      if (mutation.data.status) {
        const action = status === "approve" ? "approved" : "canceled";
        showNotifier({
          title: "Success",
          text: `You have ${action} this appointment`,
          status: "success",
        });
      } else {
        const errorMessage = Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    } else {
      showNotifier({
        title: "Error",
        text: "Failed to update appointment data. Please try again later.",
        status: "error",
      });
    }
  };

  return (
    <>
      <TitleBar title={title} link={link} />
      <div
        className={`grid md:grid-flow-row mt-5 space-y-2 ${buttons && "rounded-none"}`}>
        {appointments.length ? (
          appointments.slice(0, 5).map((appointment: any, index: number) => (
            <Card>
              <AppointmentHistory key={index} {...appointment} />
              {buttons && (
                <div className='flex justify-center text-center items-center gap-2 pb-4 md:px-4'>
                  <button
                    className='border border-[#D9D9D9] text-[#0000008C] text-[11px] md:px-14 px-8 py-[11px]'
                    onClick={() => handleButtonClick("cancel", appointment.id)}>
                    {mutation.isPending ? (
                      <>
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                        Canceling
                      </>
                    ) : (
                      "Cancel"
                    )}
                  </button>
                  <button
                    className='bg-[#4BB543] text-white text-[11px] md:px-14 px-8 py-[11px]'
                    onClick={() =>
                      handleButtonClick("approve", appointment.id)
                    }>
                    {mutation.isPending ? (
                      <>
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                        Processing
                      </>
                    ) : (
                      "Approve"
                    )}
                  </button>
                  <FullModal
                    title={"Reschedule Appointment"}
                    label='Reschedule'
                    cn={
                      "bg-[#D20606] text-white text-[11px] md:px-14 px-8 py-[11px]"
                    }>
                    <div className='flex justify-center items-center'>
                      <RescheduleAppointmentForm appointment={appointment} />
                    </div>
                  </FullModal>
                </div>
              )}
            </Card>
          ))
        ) : (
          <p className='text-xs text-[#073131] font-semibold'>
            No Appointments yet
          </p>
        )}
        {NotifierComponent}
      </div>
    </>
  );
};

export const GreetingSection = ({
  name,
  subtitle,
  role,
  dropdown,
  timeOptions,
}: {
  name?: string;
  subtitle?: string;
  role?: string | null;
  dropdown?: boolean;
  timeOptions?: any;
}) => {
  return dropdown ? (
    <div className='flex justify-between items-center'>
      <Dropdown label='Today' options={timeOptions} />
      <NavLink to={`/${role}/notifications`} className='mt-2'>
        <img src={bell} alt='bell icon' />
      </NavLink>
    </div>
  ) : (
    <div className='flex justify-between'>
      <div>
        <h4 className='text-3xl font-bold'>Welcome, {name} 👌🏼</h4>
        {subtitle && <p className='text-sm font-thin'>{subtitle}</p>}
      </div>
      {bell && (
        <NavLink to={`/${role}/notifications`} className={"mt-2"}>
          <img src={bell} alt='notifications' />
        </NavLink>
      )}
    </div>
  );
};

export const ProfileSection = ({ children }: any) => (
  <div className='flex md:flex-row flex-col px-5 md:gap-20 mt-5'>
    {children}
  </div>
);

export const NotificationSection = ({
  notifications,
}: NotificationCardPropType) => (
  <>
    {notifications.length > 0 &&
      notifications.map((notification: NotificationPropType) => (
        <Card className='mt-2'>
          <div className='flex justify-between gap-20 items-end p-4'>
            <div className='flex justify-start items-center gap-2'>
              <img src={empty_user} alt='user image' />
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-[#66676B] font-semibold text-nowrap'>
                  {notification.title}
                </p>
                <p className='text-[16px] text-[#050404] font-normal'>
                  {notification.message}
                </p>
                <p className='text-sm text-[#ADAFB5] font-normal'>
                  {notification.timestamp}
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1'>
                <NavLink
                  to={"/"}
                  className='text-xs text-[#14600F] font-normal'>
                  View More
                </NavLink>
              </div>
            </div>
          </div>
        </Card>
      ))}
  </>
);

const renderModalForm = (
  fieldName: string,
  label: string,
  apiUrl: string,
  formType = "text",
  options?: string[]
) => (
  <FullModal
    label={`Change ${label}`}
    title={`Change ${label}`}
    cn='text-xs text-[#00C2C2] font-normal mt-3'>
    <div className='flex justify-center items-center'>
      <ChangeUserForm
        fieldName={fieldName}
        label={`Change ${label}`}
        apiUrl={apiUrl}
        formType={formType}
        options={options}
      />
    </div>
  </FullModal>
);

export const RenderUserInfo = (
  label: string,
  value: string | null,
  fieldName: string,
  apiUrl: string,
  formType = "text",
  options?: string[]
) => (
  <div className='mt-5'>
    <p className='text-lg text-[#073131] font-semibold'>{label}</p>
    <p className='text-[16px] text-[#073131] font-normal mt-2'>
      {value || `Change your ${label}`}
    </p>
    {renderModalForm(fieldName, label, apiUrl, formType, options)}
  </div>
);
