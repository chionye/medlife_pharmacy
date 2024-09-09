/** @format */

// import { EmptyWallet } from "@/components/empty";
import Query from "@/api/query";
import { EmptyWallet } from "@/components/empty";
import WalletTransaction from "@/components/wallet_transaction";
import WithdrawForm from "@/components/withdraw_form";
import { formatAmount } from "@/services/helpers";
import { getCookie } from "@/services/storage";
import { QueryProps } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const DoctorWithdraw = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [wallet, setWallet] = useState<any>([]);
  const queryParamsArray: QueryProps = [
    {
      id: "wallet",
      url: `user/transactions/${userData?.id}`,
      method: "get",
      payload: null,
    },
  ];

  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setWallet(queries[0].data.data);
    }
  }, []);

  return (
    <>
      <NavLink to={"/dashboard/wallet"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Wallet Dashboard</p>
      </NavLink>
      <div className='md:px-20 py-5'>
        <h4 className='text-3xl font-bold'>Withdraw Funds</h4>
        <p className='text-sm font-thin'>
          Current Balance:{" "}
          <span className='text-[#2E8B57] text-[16px] font-extrabold'>
            &#8358;{formatAmount(userData.balance)}
          </span>
        </p>
        <div>
          <WithdrawForm />
        </div>
        {wallet.length > 0 ? (
          <WalletTransaction data={wallet} />
        ) : (
          <EmptyWallet />
        )}
      </div>
    </>
  );
};

export default DoctorWithdraw;
