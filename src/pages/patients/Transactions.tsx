/** @format */

import Query from "@/api/query";
import { EmptyWallet } from "@/components/empty";
import WalletTransaction from "@/components/wallet_transaction";
import { getCookie } from "@/services/storage";
import { QueryProps } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Transactions = () => {
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
      <NavLink to={"/patient/wallet"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Wallet Dashboard</p>
      </NavLink>
      <div className='md:px-20 py-5'>
        {wallet.length > 0 ? (
          <WalletTransaction data={wallet} />
        ) : (
          <EmptyWallet />
        )}
      </div>
    </>
  );
};

export default Transactions;
