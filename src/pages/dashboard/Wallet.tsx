/** @format */

import { Card } from "@/components/ui/card";
import eyeslash from "@/assets/eyeslash.svg";
// import { Button } from "@/components/ui/button";
import plus_red from "@/assets/plus_red.svg";
// import Dropdown from "@/components/dropdown";
// import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
// import { EmptyWallet } from "@/components/empty";
import WalletTransaction from "@/components/wallet_transaction";

const Wallet = () => {
  return (
    <>
      <div className='md:px-20 py-10'>
        <div>
          <h4 className='text-3xl font-bold'>Welcome Alexa 👌🏼</h4>
          <p className='text-sm font-thin'>18th June 2024 • 09:47</p>
        </div>
        <Card className={`bg-[url('/images/bg.png')] mt-4`}>
          <div
            className={`w-full md:py-14 md:px-6 py-6 px-3 bg-[#D20606E5] rounded-xl`}>
            <div className='flex items-center gap-3'>
              <p className='text-xl font-medium text-white'>
                Current e-Wallet Balance
              </p>
              <button>
                <img src={eyeslash} alt='eye slash' />
              </button>
            </div>
            <div className='mt-8 flex items-center justify-between'>
              <p className='md:text-5xl text-4xl font-semibold text-white'>&#8358;0.00</p>
              <NavLink
                to={"/dashboard/wallet/fund-wallet"}
                className='bg-white text-[#D20606] md:text-2xl text-lg flex justify-center md:py-2 pr-3 md:w-56 rounded-lg'>
                <span className='flex items-center'>
                  <img src={plus_red} alt='plus' />
                  <span>Fund Wallet</span>
                </span>
              </NavLink>
            </div>
          </div>
        </Card>
        <WalletTransaction />
      </div>
    </>
  );
};

export default Wallet;
