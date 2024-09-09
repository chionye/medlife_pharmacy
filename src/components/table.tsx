/** @format */

import { NavLink } from "react-router-dom";
import check from "@/assets/check.svg";
import { TablePropType } from "@/types";
import { getNestedValue } from "@/services/helpers";
import options from "@/assets/options.svg";
import Dropdown from "./dropdown";
import { useMemo } from "react";

const Table: React.FC<TablePropType> = ({ thead, tbody, keys }) => {
  const details = useMemo(
    () => [
      { label: "Create Appointment" },
      { label: "Update Patient’s Appointment" },
      { label: "View Patient’s Profile" },
      { label: "Medicine Prescription" },
      { label: "Rate Patient’s Performance" },
    ],
    []
  );
  
  return (
    <div className='w-full mb-8 overflow-x-scroll rounded-lg shadow-lg'>
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='text-sm h-[66px] font-semibold tracking-wide text-left text-[#FFFFFF] bg-[#D20606] border-b border-[#D20606]'>
              {thead &&
                thead.map((item: string) => (
                  <th className='px-4 py-3'>{item}</th>
                ))}
            </tr>
          </thead>
          <tbody className='bg-white'>
            {tbody &&
              tbody.map((item: any, index: number) => (
                <tr className='text-gray-700 border-b'>
                  {keys &&
                    keys.map((key: string) => {
                      return key === "status" ? (
                        <td className='px-4 py-3 text-xs flex justify-center font-normal'>
                          <img src={check} alt='status' />
                        </td>
                      ) : key === "description" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          <p className='truncate w-24'>{item[key]}</p>
                          <NavLink
                            to={"/"}
                            className={"underline text-[#333333]"}>
                            Read More
                          </NavLink>
                        </td>
                      ) : key === "SN" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          {index + 1}
                        </td>
                      ) : key.indexOf(".") != -1 ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          {getNestedValue(item, key)}
                        </td>
                      ) : key === "view_more" ? (
                        <td className='px-4 py-3 text-xs font-normal text-center'>
                          <div className='flex w-full justify-center'>
                            <Dropdown
                              label='View More'
                              cn='w-full h-13'
                              icon={<img src={options} alt='View More' />}
                              options={details}
                            />
                          </div>
                        </td>
                      ) : (
                        <td className='px-4 py-3 text-xs font-normal'>
                          {item[key]}
                        </td>
                      );
                    })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
