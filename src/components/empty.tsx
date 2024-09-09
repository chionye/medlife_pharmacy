/** @format */

import empty_appointment from "@/assets/empty_appointment.svg";
import empty_wallet from "@/assets/empty_wallet.svg";
import FullModal from "./full_modal";
import { BookAppointmentForm, CreateAppointmentForm } from "./appointment_form";
import { getConfigByRole } from "@/services/storage";

const EmptyAppointment = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='md:w-[400px] w-full'>
        <img src={empty_appointment} alt='no appointment' />
        <p className='text-sm text-[#05040480] text-center font-normal'>
          Book an appointment: Click the "Book Appointment" button to browse
          available times with your preferred doctor.
        </p>
        <FullModal
          cn={
            "bg-[#D20606] md:w-[400px] w-full mt-6 h-[72px] rounded  text-white"
          }
          label='Book Appointment'>
          <div className='py-4 border-[#00C2C2] border bg-[#F3FCFC] flex items-center px-2'>
            <p className='font-normal text-sm'>
              {getConfigByRole() === "patient"
                ? "Book Appointment"
                : "Create Appointment"}
            </p>
          </div>
          <div className='flex justify-center items-center'>
            {getConfigByRole() === "patient" ? <BookAppointmentForm /> : <CreateAppointmentForm />}
          </div>
        </FullModal>
      </div>
    </div>
  );
};

const EmptyWallet = () => {
  return (
    <div className='flex justify-center items-center'>
      <div className='md:w-[400px] w-full'>
        <img src={empty_wallet} alt='no appointment' />
        <p className='text-[14px] font-semibold text-center'>No Transaction</p>
        <p className='text-[12px] text-[#05040480] text-center font-normal mt-1'>
          Ooops, there are no transactions yet.
        </p>
      </div>
    </div>
  );
};

export { EmptyAppointment, EmptyWallet };
