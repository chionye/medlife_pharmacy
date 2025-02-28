/** @format */

import { NavLink, useNavigate } from "react-router-dom";
import AppointmentHistory from "./appointment_history";
import MedicationHistory from "./medication_history";
import TitleBar from "./title_bar";
import { TopDoctors } from "./top_doctors";
import { Card } from "./ui/card";
import FullModal from "./full_modal";
import ChangeUserForm from "./settings_form";
import Mutation from "@/api/mutation";
import { useNotifier } from "@/hooks/useNotifier";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RescheduleAppointmentForm } from "./appointment_form";
import bell from "@/assets/bell.svg";
import chevron_down from "@/assets/chevron_down.svg";
import empty_user from "@/assets/empty_user.svg";
import { NotificationCardPropType, NotificationPropType } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Icons } from "@/constants/svgs";
import { getFormattedDate, getFormattedTime } from "@/services/helpers";
import { FormSelect } from "./form_input";

export const Section = ({ children, cn = null }: any) => (
  <div className={`${cn ? cn : "sm:w-full lg:w-1/2"}`}>{children}</div>
);

export const DoctorPatientSection = ({
  doctors,
  title,
  link,
  cn = null,
}: any) => (
  <Section cn={cn}>
    <TitleBar title={title} link={link} />
    <div className='grid lg:grid-flow-row col-span-4 gap-2 mt-5'>
      {doctors.length ? (
        doctors.slice(0, 5).map((doctor: any) => <TopDoctors {...doctor} />)
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
    <div className='grid lg:grid-flow-row gap-2 mt-5'>
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
  appointmentRequest = false,
}: any) => {
  const { showNotifier, NotifierComponent } = useNotifier();
  const navigate = useNavigate();

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

    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status) {
          const action = status === "approve" ? "approved" : "canceled";
          showNotifier({
            title: "Success",
            text: `You have ${action} this appointment`,
            status: "success",
          });
          navigate("/doctor/home");
        } else if (data.error || data.errors || data.message) {
          const errorMessage = data.message
            ? data.message
            : data.error
            ? data.error
            : Array.isArray(data.errors)
            ? data.errors.join("\n")
            : data.errors;
          showNotifier({
            title: "Error",
            text: errorMessage,
            status: "error",
          });
        }
      },
      onError: (error) => {
        console.log("Error submitting feedback:", error);
        showNotifier({
          title: "Error",
          text: "There was an error submitting your feedback. Please try again.",
          status: "error",
        });
      },
    });
  };

  return (
    <>
      <TitleBar title={title} link={link} />
      <div
        className={`grid lg:grid-flow-row mt-5 space-y-2 ${
          buttons && "rounded-none"
        }`}>
        {appointments.length ? (
          appointments.slice(0, 5).map((appointment: any, index: number) => {
            return appointmentRequest && appointment.status !== "cancelled" ? (
              <Card>
                <AppointmentHistory key={index} {...appointment} />
                {buttons && (
                  <div className='flex justify-between text-center items-center gap-2 pb-4 lg:px-4 px-2'>
                    <button
                      className='border border-[#D9D9D9] w-full text-[#0000008C] text-[11px] lg:px-14 px-8 py-[11px]'
                      onClick={() =>
                        handleButtonClick("cancel", appointment.id)
                      }>
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
                      className='bg-[#4BB543] w-full text-white text-[11px] lg:px-14 px-8 py-[11px]'
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
                        "bg-[#585BA8] text-white w-full text-[11px] lg:px-14 px-8 py-[11px]"
                      }>
                      <div className='flex justify-center items-center'>
                        <RescheduleAppointmentForm appointment={appointment} />
                      </div>
                    </FullModal>
                  </div>
                )}
              </Card>
            ) : !appointmentRequest ? (
              <Card>
                <AppointmentHistory key={index} {...appointment} />
                {buttons && (
                  <div className='flex justify-center text-center items-center gap-2 pb-4 lg:px-4'>
                    <button
                      className='border border-[#D9D9D9] text-[#0000008C] text-[11px] lg:px-14 px-8 py-[11px]'
                      onClick={() =>
                        handleButtonClick("cancel", appointment.id)
                      }>
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
                      className='bg-[#4BB543] text-white text-[11px] lg:px-14 px-8 py-[11px]'
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
                        "bg-[#585BA8] text-white text-[11px] lg:px-14 px-8 py-[11px]"
                      }>
                      <div className='flex justify-center items-center'>
                        <RescheduleAppointmentForm appointment={appointment} />
                      </div>
                    </FullModal>
                  </div>
                )}
              </Card>
            ) : null;
          })
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
}: {
  name?: string;
  subtitle?: string;
  role?: string | null;
  dropdown?: boolean;
}) => {
  return dropdown ? (
    <div className='flex justify-between items-center'>
      <DateSection />
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
  <div className='flex lg:flex-row flex-col lg:items-start lg:gap-20 mt-5'>
    {children}
  </div>
);

export const DateSection = () => {
  const [field, setField] = useState<Date | undefined>();
  const handleChangeDate = (e: Date | undefined) => {
    setField(e);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit pl-3 text-left text-[22.5px] rounded-[9px] text-[#00C2C2] flex items-center gap-2 font-normal",
            !field && "text-muted-foreground"
          )}>
          {field ? format(field, "PPP") : <span>Today</span>}
          <img src={chevron_down} alt='chevron down' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={field}
          onSelect={handleChangeDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

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
    cn='text-xs text-[#00C2C2] text-left font-normal mt-3'>
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
    <p className='lg:text-lg text-[16px] text-[#073131] font-semibold'>
      {label}
    </p>
    <p className='lg:text-[16px] text-sm text-[#073131] font-normal mt-2'>
      {value || `Change your ${label}`}
    </p>
    {renderModalForm(fieldName, label, apiUrl, formType, options)}
  </div>
);

export const TopSellingProductSection = ({
  data,
  title,
  link,
  cn = null,
}: any) => (
  <Section cn={cn}>
    <TitleBar title={title} link={link} />
    <div className='flex flex-col gap-2 mt-5'>
      {data.length ? (
        data.slice(0, 5).map((item: any) => (
          <div className='flex justify-between items-center border border-[#0111A280] bg-[#0111A205] p-2 rounded-[7px]'>
            <div className='flex items-center gap-4'>
              <img src={item.imgSrc} alt='' className='w-[84px]' />
              <div>
                <p className='text-[15px] font-medium text-[#333333]'>
                  {item.title}
                </p>
                <p className='text-[13px] font-regular text-[#333333] mt-2'>
                  Serving : {item.subtitle}
                </p>
              </div>
            </div>

            <div className='flex flex-col items-end'>
              <p className='text-[15px] font-regular text-[#137C43]'>
                {item.availability}
              </p>
              <p className='text-[13px] font-regular text-[#6E4C31] mt-2'>
                Unit Price: #{item.price}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-xs text-[#073131] font-semibold'>No data yet</p>
      )}
    </div>
  </Section>
);

export const ExpireyProductSection = ({
  data,
  title,
  link,
  cn = null,
}: any) => (
  <Section cn={cn}>
    <TitleBar title={title} link={link} />
    <div className='flex flex-col gap-2 mt-5'>
      {data.length ? (
        data.slice(0, 5).map((item: any) => (
          <div className='flex justify-between items-center border border-[#0111A280] bg-[#0111A205] p-2 rounded-[7px]'>
            <div className='flex items-center gap-4'>
              <img src={item.imgSrc} alt='' className='w-[84px]' />
              <div>
                <p className='text-[15px] font-medium text-[#333333]'>
                  {item.title}
                </p>
                <p className='text-[13px] font-regular text-[#333333] mt-2'>
                  Expiry Date: {item.subtitle}
                </p>
              </div>
            </div>

            <div className='flex flex-col items-end'>
              <p className='text-[15px] font-regular text-[#137C43]'>
                {item.availability}
              </p>
              <p className='text-[13px] font-regular text-[#6E4C31] mt-2'>
                Unit Price: #{item.price}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-xs text-[#073131] font-semibold'>No data yet</p>
      )}
    </div>
  </Section>
);

export const TopFilterSection = ({
  months,
  changeFunc,
}: {
  months: any;
  changeFunc: (e: string) => void;
}) => {
  const [field, setField] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setField(target.value);
    changeFunc(target.value);
  };
  return (
    <div className='flex lg:flex-row flex-col gap-3 items-center w-fit'>
      <p className='text-lg font-extrabold text-[#2E3A59] text-nowrap'>
        Real Time Data
      </p>
      <div className='flex gap-3 items-center w-fit'>
        <FormSelect
          options={months}
          name={"date"}
          value={field}
          cn={
            "border border-[#5F66E9] px-[20px] bg-white hover:outline-none w-full py-[13px] rounded-[10px]"
          }
          label={""}
          changeFunction={handleChange}
        />
        <p className='flex items-center text-nowrap gap-2'>
          <Icons.calendar /> <span>{getFormattedDate()}</span>
        </p>
        <p className='flex items-center text-nowrap gap-2'>
          <Icons.clock /> <span>{getFormattedTime()}</span>
        </p>
      </div>
    </div>
  );
};

export const TopSummaryAndTitleSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='flex flex-col items-center justify-center bg-[#5F66E91A] rounded-[20px] p-7 mt-5'>
      <div className='flex justify-center items-center gap-4 '>
        <Icons.lightBulb />
        <p className='text-xl font-extrabold'>{title}</p>
      </div>
      <div className='flex w-full justify-center mt-2'>{children}</div>
    </div>
  );
};
