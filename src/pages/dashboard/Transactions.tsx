import WalletTransaction from "@/components/wallet_transaction";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const Transactions = () => {
  return (
    <>
      <NavLink to={"/dashboard/wallet"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Wallet Dashboard</p>
      </NavLink>
      <div className='md:px-20 py-5'>
        <WalletTransaction />
      </div>
    </>
  );
};

export default Transactions;