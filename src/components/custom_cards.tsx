/** @format */

import { NavLink } from "react-router-dom";
import { Card } from "./ui/card";
import { formatAmount } from "@/services/helpers";
import eyeslash from "@/assets/eyeslash.svg";
import plus_red from "@/assets/plus_red.svg";
import plus_white from "@/assets/plus_white.svg";
import FullModal from "./full_modal";
import { OnboardPatientForm } from "./onboard_form";
import { getConfigByRole } from "@/services/storage";

export const CardWithButton = ({
  title,
  buttonText,
  modal,
  link,
  icon,
  secondaryIcon,
  subtitle,
  count = 0,
}: any) => (
  <Card className='border flex justify-between rounded-xl p-6'>
    <div>
      <p className='text-sm text-[#073131] font-[600]'>{title}</p>
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
      ) : buttonText && modal ? (
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
}: {
  balance: string;
  withdraw?: boolean;
}) => (
  <Card className={`bg-[url('/images/bg.png')] mt-4`}>
    <div
      className={`w-full md:py-14 md:px-6 py-6 px-3 bg-[#D20606E5] rounded-xl`}>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <p className='text-xl font-medium text-white'>
            Current e-Wallet Balance
          </p>
          <button>
            <img src={eyeslash} alt='eye slash' />
          </button>
        </div>

        <NavLink
          to={`/${
            getConfigByRole() === "patient" ? "dashboard" : getConfigByRole()
          }/wallet/fund-wallet`}
          className={`${
            withdraw
              ? "bg-none text-white border border-[#FAFAFA]"
              : "bg-white text-[#D20606]"
          } md:text-2xl text-lg flex justify-center md:py-2 pr-3 md:w-56 rounded-lg`}>
          <span className='flex items-center'>
            <img src={withdraw ? plus_white : plus_red} alt='plus' />
            <span>Fund Wallet</span>
          </span>
        </NavLink>
      </div>
      <div className='mt-8 flex items-center justify-between'>
        <p className='md:text-5xl text-4xl font-semibold text-white'>
          &#8358;{formatAmount(parseFloat(balance || "0.00"))}
        </p>
        {withdraw && (
          <NavLink
            to={"/doctor/wallet/withdraw"}
            className={`bg-white text-[#D20606] md:text-2xl text-lg flex justify-center md:py-2 pr-3 md:w-56 rounded-lg`}>
            <span className='flex items-center'>
              <img src={plus_red} alt='plus' />
              <span>Withdraw Funds</span>
            </span>
          </NavLink>
        )}
      </div>
    </div>
  </Card>
);
