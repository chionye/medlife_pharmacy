/** @format */

import { Card } from "./ui/card";
import { NavLink, useLocation } from "react-router-dom";
import { WalletHistoryPropType } from "@/types";
import { formatAmount, getDateFormat, toTitleCase } from "@/services/helpers";
import { DateSection } from "./section";

const WalletTransaction: React.FC<any> = ({ data, number = null }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Card className='mt-10'>
      <div>
        <div className='md:px-5 md:py-6 px-3 py-3 border-b'>
          <DateSection />
          <div className='flex items-center justify-between  mt-5'>
            <h4 className='text-xl font-medium'>Transaction Details</h4>
            {pathname === "/patient/wallet" && (
              <NavLink
                to={"/patient/wallet/transactions"}
                className={"text-[#D20606] flex gap-2 items-center"}>
                <span>View all</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1.3em'
                  height='1.3em'
                  viewBox='0 0 24 24'>
                  <path
                    fill='#d20606'
                    d='m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z'></path>
                </svg>
              </NavLink>
            )}
          </div>
        </div>
        <div>
          {data &&
            data.map((transaction: WalletHistoryPropType, index: number) => {
              return number && index <= number ? (
                <div
                  className='flex justify-between items-center border-b px-5 py-3'
                  key={index}>
                  <div>
                    <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                      {transaction.reference}
                    </p>
                    <p className='text-[10px] text-[#050404BF] font-normal'>
                      {transaction.gateway},{" "}
                      {getDateFormat(transaction.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                      &#8358;{formatAmount(parseFloat(transaction.amount))}
                    </p>
                    <p className='text-[10px] text-[#008080] font-normal text-right'>
                      {toTitleCase(transaction.status)}
                    </p>
                  </div>
                </div>
              ) : !number ? (
                <div
                  className='flex justify-between items-center border-b px-5 py-3'
                  key={index}>
                  <div>
                    <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                      {transaction.reference}
                    </p>
                    <p className='text-[10px] text-[#050404BF] font-normal'>
                      {transaction.gateway},{" "}
                      {getDateFormat(transaction.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                      &#8358;{formatAmount(parseFloat(transaction.amount))}
                    </p>
                    <p className='text-[10px] text-[#008080] font-normal text-right'>
                      {toTitleCase(transaction.status)}
                    </p>
                  </div>
                </div>
              ) : null;
            })}
        </div>
      </div>
    </Card>
  );
};

export default WalletTransaction;
