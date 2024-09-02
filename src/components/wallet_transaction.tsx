import { Card } from './ui/card';
// import { EmptyWallet } from './empty';
import { NavLink } from 'react-router-dom';
import Dropdown from './dropdown';
import { DropdownMenuGroup, DropdownMenuItem } from './ui/dropdown-menu';

const WalletTransaction = () => {
  return (
    <Card className='mt-10'>
      <div>
        <div className='md:px-5 md:py-6 px-3 py-3 border-b'>
          <Dropdown label='Today' cn='w-24'>
            <DropdownMenuGroup>
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>Tomorrow</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>Next Week</DropdownMenuItem>
            </DropdownMenuGroup>
          </Dropdown>
          <div className='flex items-center justify-between  mt-5'>
            <h4 className='text-xl font-medium'>Transaction Details</h4>
            <NavLink
              to={"/dashboard/wallet/transactions"}
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
          </div>
        </div>
        <div>
          {/* <EmptyWallet /> */}
          <div className='flex justify-between items-center border-b px-5 py-3'>
            <div>
              <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                ref_smcpt_4546789432345
              </p>
              <p className='text-[10px] text-[#050404BF] font-normal'>
                Monify, 10th May, 2024, 02:12pm
              </p>
            </div>
            <div>
              <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                &#8358;10,000
              </p>
              <p className='text-[10px] text-[#008080] font-normal text-right'>
                Successful
              </p>
            </div>
          </div>
          <div className='flex justify-between items-center border-b px-5 py-3'>
            <div>
              <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                ref_smcpt_4546789432345
              </p>
              <p className='text-[10px] text-[#050404BF] font-normal'>
                Monify, 10th May, 2024, 02:12pm
              </p>
            </div>
            <div>
              <p className='text-[16px] text-[#050404] font-semibold text-nowrap'>
                &#8358;10,000
              </p>
              <p className='text-[10px] text-[#008080] font-normal text-right'>
                Successful
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default WalletTransaction;