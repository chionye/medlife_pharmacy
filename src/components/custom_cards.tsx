/** @format */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Card } from "./ui/card";
import { formatAmount } from "@/services/helpers";
import plus_red from "@/assets/plus_red.svg";
import plus_white from "@/assets/plus_white.svg";
import stars from "@/assets/stars.svg";
import FullModal from "./full_modal";
import { OnboardDoctorForm, OnboardPatientForm } from "./onboard_form";
import { getConfigByRole } from "@/services/storage";
import { BookAppointmentForm } from "./appointment_form";

export const CardWithButton = ({
  title,
  buttonText,
  modal = false,
  type,
  link,
  icon,
  secondaryIcon,
  subtitle,
  count = 0,
  star = false,
}: any) => (
  <Card className='border flex justify-between rounded-xl p-6'>
    <div>
      <p className='text-sm text-[#073131] font-[600]'>{title}</p>
      {star && <img src={stars} alt='icon' />}
      {count ? (
        <p className='text-[26px]'>{count}</p>
      ) : (
        <p className='text-[26px]'>&nbsp;</p>
      )}
      {subtitle && <p className='text-xs font-normal'>{subtitle}</p>}
      {buttonText && !modal ? (
        <NavLink
          to={link}
          className='bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1'>
          <img src={icon} alt='icon' />
          <strong>{buttonText}</strong>
        </NavLink>
      ) : buttonText && modal && type === "patient" ? (
        <FullModal
          icon={<img src={icon} alt='open modal' />}
          title={"Onboard a Patient"}
          btnTitle='Onboard New Patients'
          cn={
            "bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1"
          }>
          <div className='flex justify-center items-center'>
            <OnboardPatientForm />
          </div>
        </FullModal>
      ) : modal && buttonText && type === "user" ? (
        <FullModal
          icon={<img src={icon} alt='open modal' />}
          title={"Book Appointment"}
          btnTitle='Book Appointment'
          cn={
            "bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1"
          }>
          <div className='flex justify-center items-center'>
            <BookAppointmentForm />
          </div>
        </FullModal>
      ) : modal && buttonText && type === "doctor_appointment" ? (
        <FullModal
          icon={<img src={icon} alt='open modal' />}
          title={"Create Appointment"}
          btnTitle='Create Appointment'
          cn={
            "bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1"
          }>
          <div className='flex justify-center items-center'>
            <BookAppointmentForm />
          </div>
        </FullModal>
      ) : buttonText && modal && type === "doctor" ? (
        <FullModal
          icon={<img src={icon} alt='open modal' />}
          title={"Onboard a Doctor"}
          btnTitle='Onboard New Doctor'
          scrollBehavior='outside'
          cn={
            "bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1"
          }>
          <div className='flex justify-center items-center'>
            <OnboardDoctorForm />
          </div>
        </FullModal>
      ) : null}
    </div>
    <img src={secondaryIcon} alt='secondary icon' className='w-[64.41px]' />
  </Card>
);

export const VitalCard = ({ title, value, unit, icon }: any) => (
  <Card className='border flex justify-between rounded-xl px-6 py-8'>
    <div>
      <p className='text-sm text-[#073131] font-[600]'>{title}</p>
      <p className='text-[26px] mt-3'>
        {value}
        {unit}
      </p>
    </div>
    <img src={icon} alt='vital icon' />
  </Card>
);

export const WalletCard = ({
  balance,
  withdraw,
  showFund = true,
  showSubscribe = false,
}: {
  balance: string;
  withdraw?: boolean;
  showFund?: boolean;
  showSubscribe?: boolean;
}) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // State to toggle balance visibility

  const handleToggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible); // Toggle the balance visibility
  };

  return (
    <Card className={`bg-[url('/images/bg.png')] mt-4`}>
      <div
        className={`w-full lg:py-14 lg:px-6 py-6 px-3 bg-[#D20606E5] rounded-xl`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <p className='text-xl font-medium text-white'>
              Current e-Wallet Balance
            </p>
            <button onClick={handleToggleBalance} className='text-white'>
              {isBalanceVisible ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.3em'
                  height='1.3em'
                  viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13'></path>
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.3em'
                  height='1.3em'
                  viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3s3-1.358 3-3s-1.359-3-3-3'></path>
                  <path
                    fill='currentColor'
                    d='M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5m0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5'></path>
                </svg>
              )}
            </button>
          </div>
          {showFund && (
            <NavLink
              to={`/${getConfigByRole()}/wallet/fund-wallet`}
              className={`${
                withdraw
                  ? "bg-none text-white border border-[#FAFAFA]"
                  : "bg-white text-[#D20606]"
              } lg:text-2xl text-lg flex justify-center lg:py-2 pr-3 lg:w-56 rounded-lg`}>
              <span className='flex items-center'>
                <img src={withdraw ? plus_white : plus_red} alt='plus' />
                <span>Fund Wallet</span>
              </span>
            </NavLink>
          )}
        </div>
        <div className='mt-8 flex items-center justify-between'>
          <p className='lg:text-5xl text-4xl font-semibold text-white'>
            {isBalanceVisible
              ? `₦${formatAmount(parseFloat(balance || "0.00"))}` // Show balance if visible
              : "*****"}{" "}
            {/* Show asterisks if hidden */}
          </p>
          {withdraw && (
            <NavLink
              to={`/${getConfigByRole()}/wallet/withdraw`}
              className={`bg-white text-[#D20606] lg:text-2xl text-lg flex justify-center lg:py-2 pr-3 lg:w-56 rounded-lg`}>
              <span className='flex items-center'>
                <img src={plus_red} alt='plus' />
                <span>Withdraw Funds</span>
              </span>
            </NavLink>
          )}
          {showSubscribe && (
            <NavLink
              to={`/${getConfigByRole()}/wallet/subscribe`}
              className={`bg-none text-white border border-[#FAFAFA]] lg:text-2xl text-lg flex justify-center lg:py-2 pr-3 lg:w-56 rounded-lg`}>
              <span className='flex items-center'>
                <img src={plus_white} alt='plus' />
                <span>Subscribe</span>
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </Card>
  );
};
