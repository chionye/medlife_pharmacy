/** @format */

// import { EmptyWallet } from "@/components/empty";
import Query from "@/api/query";
import SubscriptionForm from "@/components/subscription_form";
import { formatAmount } from "@/services/helpers";
import { getCookie } from "@/services/storage";
import { QueryProps } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Subscribe = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [plans, setPlans] = useState<any>([]);
  const queryParamsArray: QueryProps = [
    {
      id: "plans",
      url: `plan/all`,
      method: "get",
      payload: null,
    },
  ];

  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setPlans(queries[0].data.data);
    }
  }, [queries[0].isPending]);

  return (
    <>
      <NavLink to={"/patient/wallet"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Wallet Dashboard</p>
      </NavLink>
      <div className='lg:px-20 py-5'>
        <h4 className='text-3xl font-bold'>Subscribe to a plan</h4>
        <p className='text-sm font-thin'>
          Current Balance:{" "}
          <span className='text-[#2E8B57] text-[16px] font-extrabold'>
            &#8358;{formatAmount(userData.balance)}
          </span>
        </p>
        <div>
          <SubscriptionForm plans={plans} />
        </div>
      </div>
    </>
  );
};

export default Subscribe;
