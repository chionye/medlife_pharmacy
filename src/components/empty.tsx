/** @format */

import empty_appointment from "@/assets/empty_appointment.svg";
import empty_wallet from "@/assets/empty_wallet.svg";
import empty_notifications from "@/assets/empty_notifications.svg";
import FullModal from "./full_modal";
import { BookAppointmentForm, CreateAppointmentForm } from "./appointment_form";
import { getConfigByRole } from "@/services/storage";
import { OnboardDoctorForm, OnboardPatientForm } from "./onboard_form";

const EmptyAppointment = () => {
  const role = getConfigByRole() || null;
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='lg:w-[400px] w-full'>
        <img src={empty_appointment} alt='no appointment' />
        <p className='text-sm text-[#05040480] text-center font-normal'>
          Book an appointment: Click the "Book Appointment" button to browse
          available times with your preferred doctor.
        </p>
        <FullModal
          cn={
            "bg-[#D20606] lg:w-[400px] w-full mt-6 h-[72px] rounded  text-white"
          }
          label={
            role === "patient" ? "Book Appointment" : "Create Appointment"
          }>
          <div className='py-4 border-[#00C2C2] border bg-[#F3FCFC] flex items-center px-2'>
            <p className='font-normal text-sm'>
              {role === "patient" ? "Book Appointment" : "Create Appointment"}
            </p>
          </div>
          <div className='flex justify-center items-center'>
            {role === "patient" ? (
              <BookAppointmentForm />
            ) : (
              <CreateAppointmentForm />
            )}
          </div>
        </FullModal>
      </div>
    </div>
  );
};

const EmptyPatients = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='lg:w-[400px] w-full'>
        <img src={empty_appointment} alt='no appointment' />
        <p className='text-sm text-[#05040480] text-center font-normal'>
          Admin, your role in patient onboarding is crucial in creating a world
          where everyone, no matter their location, can easily connect with the
          medical expertise they need..
        </p>
        <FullModal
          title={"Onboard a Patient"}
          btnTitle='Onboard New Patients'
          scrollBehavior='outside'
          cn={
            "bg-[#D20606] lg:w-[400px] w-full mt-6 h-[72px] rounded  text-white"
          }>
          <div className='flex justify-center items-center'>
            <OnboardPatientForm />
          </div>
        </FullModal>
      </div>
    </div>
  );
};

const EmptyDoctors = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='lg:w-[400px] w-full'>
        <img src={empty_appointment} alt='no appointment' />
        <p className='text-sm text-[#05040480] text-center font-normal'>
          Admin, let's bridge the geographic divide in healthcare. By onboarding
          skilled physicians, we can empower patients to connect with the care
          they need, regardless of location.
        </p>
        <FullModal
          title={"Onboard a Doctor"}
          btnTitle='Onboard New Doctor'
          cn={
            "bg-[#D20606] lg:w-[400px] w-full mt-6 h-[72px] rounded  text-white"
          }>
          <div className='flex justify-center items-center'>
            <OnboardDoctorForm />
          </div>
        </FullModal>
      </div>
    </div>
  );
};

const EmptyWallet = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='lg:w-[400px] w-full'>
        <img src={empty_wallet} alt='no appointment' />
        <p className='text-[14px] font-semibold text-center'>No Transaction</p>
        <p className='text-[12px] text-[#05040480] text-center font-normal mt-1'>
          Ooops, there are no transactions yet.
        </p>
      </div>
    </div>
  );
};

const EmptyNotifications = () => (
  <div className='flex justify-center items-center mt-5'>
    <div className='lg:w-[400px] w-full flex flex-col justify-center items-center'>
      <img src={empty_notifications} alt='no appointment' />
      <p className='text-[14px] font-semibold text-center'>
        No notifications Yet
      </p>
      <p className='text-[12px] text-[#05040480] text-center font-normal mt-1'>
        Your notifications will be appear on this page
      </p>
    </div>
  </div>
);

export {
  EmptyAppointment,
  EmptyWallet,
  EmptyNotifications,
  EmptyPatients,
  EmptyDoctors,
};
