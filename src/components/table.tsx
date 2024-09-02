import { NavLink } from "react-router-dom";
import check from '@/assets/check.svg';
import { TablePropType } from "@/types";

const Table:React.FC<TablePropType> = ({thead, tbody}) => {
  return (
    <div className='w-full mb-8 overflow-x-scroll rounded-lg shadow-lg'>
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='text-sm h-[66px] font-semibold tracking-wide text-left text-[#FFFFFF] bg-[#D20606] border-b border-[#D20606]'>
              {thead && thead.map((item: string) => (
                <th className='px-4 py-3'>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white'>
            {tbody && ""}
            <tr className='text-gray-700 border-b'>
              <td className='px-4 py-3 text-xs font-normal'>1</td>
              <td className='px-4 py-3 text-xs font-normal'>
                Ezenwa Christopher .A
              </td>
              <td className='px-4 py-3 text-xs font-normal'>Cardiologist</td>
              <td className='px-4 py-3 text-xs font-normal'>
                01/06/2024 - 03:21pm (Upcoming)
              </td>
              <td className='px-4 py-3 text-xs font-normal'>Consultation</td>
              <td className='px-4 py-3 text-xs font-normal'>
                <span>The above patients....</span>
                <NavLink to={"/"} className={"underline text-[#333333]"}>
                  Read More
                </NavLink>
              </td>
              <td className='px-4 py-3 text-xs flex justify-center font-normal'>
                <img src={check} alt='status' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;