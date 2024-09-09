/** @format */

import { NavLink } from "react-router-dom";
import AppointmentHistory from "./appointment_history";
import MedicationHistory from "./medication_history";
import TitleBar from "./title_bar";
import TopDoctors from "./top_doctors";
import { Card } from "./ui/card";
import FullModal from "./full_modal";
import ChangeUserForm from "./settings_form";
import { toTitleCase } from "@/services/helpers";
import Mutation from "@/api/mutation";
import { useNotifier } from "@/hooks/useNotifier";
import { ReloadIcon } from "@radix-ui/react-icons";
// import { TopDoctorsPropType } from "@/types";

export const Section = ({ children }: any) => (
  <div className='sm:w-full md:w-1/2'>{children}</div>
);

export const DoctorPatientSection = ({ doctors, title, link }: any) => (
  <Section>
    <TitleBar title={title} link={link} />
    <div className='grid md:grid-flow-row col-span-4 gap-2 mt-5'>
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
      url: `appointment/status`,
      content: {
        appointment_id: id,
        action: status,
      },
    };

    mutation.mutate(data);
    if (mutation.isSuccess) {
      showNotifier({
        title: "Success",
        text: "You have approved this appointment",
        status: "success",
      });
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
      <Card
        className={`grid md:grid-flow-row mt-5 ${buttons && "rounded-none"}`}>
        {appointments.length ? (
          appointments.slice(0, 5).map((appointment: any, index: number) => (
            <>
              <AppointmentHistory key={index} {...appointment} />
              {buttons && (
                <div className='flex justify-center text-center items-center gap-2 pb-4 md:px-4'>
                  <button className='border border-[#D9D9D9] text-[#0000008C] text-[11px] md:px-14 px-9 py-[11px]'>
                    Cancel
                  </button>
                  <button
                    className='bg-[#4BB543] text-white text-[11px] md:px-14 px-9 py-[11px]'
                    onClick={() =>
                      handleButtonClick("approve", appointment.id)
                    }>
                    {mutation.isPending ? (
                      <>
                        <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                        Saving
                      </>
                    ) : (
                      "Approve"
                    )}
                  </button>
                  <button
                    className='bg-[#D20606] text-white text-[11px] md:px-14 px-9 py-[11px]'
                    onClick={() =>
                      handleButtonClick("approve", appointment.id)
                    }>
                    Reschedule
                  </button>
                </div>
              )}
            </>
          ))
        ) : (
          <p className='text-xs text-[#073131] font-semibold'>
            No Appointments yet
          </p>
        )}
        {NotifierComponent}
      </Card>
    </>
  );
};

export const GreetingSection = ({ name, subtitle, bell }: any) => (
  <div className='flex justify-between'>
    <div>
      <h4 className='text-3xl font-bold'>Welcome, {name} 👌🏼</h4>
      {subtitle && <p className='text-sm font-thin'>{subtitle}</p>}
    </div>
    {bell && (
      <NavLink to='/dashboard' className={"mt-2"}>
        <img src={bell} alt='notifications' />
      </NavLink>
    )}
  </div>
);

export const ProfileSection = ({ userData, children }: any) => (
  <div className='flex md:flex-row flex-col px-5 md:gap-20 mt-5'>
    {children}
    <div className='flex md:flex-row flex-col md:justify-between md:gap-32 gap-20 w-full md:pr-24'>
      <div>
        <div>
          <p className='text-lg text-[#073131] font-semibold text-nowrap'>
            Name
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {userData
              ? toTitleCase(userData.fullname || userData.username)
              : "Guest"}
          </p>
          <FullModal
            label='Change Name'
            title='Change Name'
            cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
            <div className='flex justify-center items-center'>
              <ChangeUserForm
                fieldName='fullname'
                label='Name'
                apiUrl='update_user'
              />
            </div>
          </FullModal>
        </div>
        <div className='mt-5'>
          <p className='text-lg text-[#073131] font-semibold text-nowrap'>
            Email
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {userData?.email || "jane.doe@example.com"}
          </p>
          <FullModal
            label='Change Email'
            title='Change Email'
            cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
            <div className='flex justify-center items-center'>
              <ChangeUserForm
                fieldName='email'
                label='Change Email'
                apiUrl='update_user'
              />
            </div>
          </FullModal>
        </div>
        <div className='mt-5'>
          <p className='text-lg text-[#073131] font-semibold text-nowrap'>
            Gender
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {toTitleCase(userData?.gender || "male")}
          </p>
          <FullModal
            label='Change Gender'
            title='Change Gender'
            cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
            <div className='flex justify-center items-center'>
              <ChangeUserForm
                fieldName='gender'
                label='Change Gender'
                apiUrl='update_user'
                formType='select'
                options={["male", "female"]}
              />
            </div>
          </FullModal>
        </div>
      </div>
      <div>
        <div>
          <p className='text-lg text-[#073131] font-semibold text-nowrap'>
            Phone Number
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {userData?.phone || "07012345678"}
          </p>
          <FullModal
            label='Change Phone Number'
            title='Change Phone Number'
            cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
            <div className='flex justify-center items-center'>
              <ChangeUserForm
                fieldName='phone'
                label='Change Phone Number'
                apiUrl='update_user'
              />
            </div>
          </FullModal>
        </div>
        <div className='mt-5'>
          <p className='text-lg text-[#073131] font-semibold text-nowrap'>
            Date of Birth
          </p>
          <p className='text-[16px] text-[#073131] font-normal mt-2'>
            {userData.dob || "10/05/1943"}
          </p>
          <FullModal
            label='Change Date of Birth'
            title='Change Date of Birth'
            cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
            <div className='flex justify-center items-center'>
              <ChangeUserForm
                fieldName='dob'
                label='Change Date of Birth'
                apiUrl='update_user'
              />
            </div>
          </FullModal>
        </div>
        <div className='mt-5'>
          <p className='text-lg text-[#073131] font-semibold text-nowrap'>
            Password
          </p>
          <div>
            <FullModal
              label='Change Password'
              title='Change Password'
              cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
              <div className='flex justify-center items-center'>
                <ChangeUserForm
                  fieldName='password'
                  label='Change Password'
                  apiUrl='update_user'
                />
              </div>
            </FullModal>
          </div>
          {/* <FullModal
                  label='Enable two-factor authentication'
                  title='Enable two-factor authentication'
                  cn={"text-xs text-[#00C2C2] font-normal mt-3"}>
                  <div className='flex justify-center items-center'>
                    <ChangeUserForm
                      fieldName='2fa'
                      label='Enable two-factor authentication'
                      apiUrl='update_user'
                    />
                  </div>
                </FullModal> */}
        </div>
      </div>
    </div>
  </div>
);
