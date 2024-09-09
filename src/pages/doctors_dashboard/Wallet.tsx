/** @format */

import { useEffect, useState } from "react";
import { EmptyWallet } from "@/components/empty";
import WalletTransaction from "@/components/wallet_transaction";
import { getCookie } from "@/services/storage";
import { getDateFormat, toTitleCase } from "@/services/helpers";
import { QueryProps } from "@/types";
import Query from "@/api/query";
import { GreetingSection } from "@/components/section";
import { WalletCard } from "@/components/custom_cards";

const DoctorWallet = () => {
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
    console.log(queries[0].data);
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setWallet(queries[0].data.data);
    }
  }, []);

  return (
    <>
      <div className='md:px-20 py-10'>
        <GreetingSection
          name={
            userData
              ? toTitleCase(userData.fullname || userData.username)
              : "Guest"
          }
          subtitle={getDateFormat()}
        />
        <WalletCard balance={userData.balance} withdraw />
        {wallet.length > 0 ? (
          <WalletTransaction data={wallet} number={"4"} />
        ) : (
          <EmptyWallet />
        )}
      </div>
    </>
  );
};

export default DoctorWallet;
