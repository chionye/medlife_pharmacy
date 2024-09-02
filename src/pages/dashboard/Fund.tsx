import { EmptyWallet } from "@/components/empty";
import FundingForm from "@/components/funding_form";
import WalletTransaction from "@/components/wallet_transaction";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const Fund = () => {
  return (
    <>
      <NavLink to={"/dashboard/wallet"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Wallet Dashboard</p>
      </NavLink>
      <div className='md:px-20 py-5'>
        <h4 className='text-3xl font-bold'>Fund Wallet</h4>
        <p className='text-sm font-thin'>
          Current Balance:{" "}
          <span className='text-[#2E8B57] text-[16px] font-extrabold'>
            &#8358;0.00
          </span>
        </p>
        <div>
          <FundingForm />
        </div>
        <WalletTransaction />
      </div>
    </>
  );
}

export default Fund;