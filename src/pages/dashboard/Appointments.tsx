/** @format */

import { Card } from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import pinned from "@/assets/pinned.svg";
import bell from "@/assets/bell.svg";
import add from "@/assets/add.svg";
import task_done from "@/assets/task_done.svg";
import search from "@/assets/search.svg";
import filter from "@/assets/filter.svg";
import Dropdown from "@/components/dropdown";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import { EmptyAppointment } from "@/components/empty";
import Table from "@/components/table";
// import FullModal from "@/components/fullmodal";

const Appointments = () => {
  const thead = [
    "SN",
    "Name of Medic",
    "Role",
    "Date and Time",
    "Appointment Type",
    "Appointment Details",
    "Status",
  ]
  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <Dropdown label='Today'>
            <DropdownMenuGroup>
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>Tomorrow</DropdownMenuItem>
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>Next Week</DropdownMenuItem>
            </DropdownMenuGroup>
          </Dropdown>
        </div>
        <NavLink to='/dashboard' className={"mt-2"}>
          <img src={bell} alt='plus icon' />
        </NavLink>
      </div>
      <div className='flex flex-col space-y-6 mt-5'>
        <div className='w-full'>
          <div className='grid md:grid-flow-col gap-2'>
            <div className='md:col-span-3 col-span-3'>
              <Card className='border flex justify-between rounded-xl p-8'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    Current Appointment
                  </p>
                  <p className='text-[26px]'>0</p>
                  <NavLink
                    to='/dashboard/shop'
                    className='bg-[#D20606] text-sm text-white hover:no-underline rounded-xl flex items-center justify-between px-8 py-1'>
                    <img src={add} alt='plus icon' />
                    <strong>Book Appointment</strong>
                  </NavLink>
                </div>
                <img src={pinned} alt='pin icon' />
              </Card>
            </div>
            <div className='md:col-span-3 col-span-3'>
              <Card className='border flex justify-between rounded-xl p-10'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    No of Appointment
                  </p>
                  <p className='text-[26px]'>0</p>
                  <p className='text-xs font-normal'>This Month</p>
                </div>
                <img src={task_done} alt='pin icon' />
              </Card>
            </div>
            <div className='md:col-span-3 col-span-3'>
              <Card className='border flex justify-between rounded-xl p-10'>
                <div>
                  <p className='text-sm text-[#073131] font-[600]'>
                    Current Appointment
                  </p>
                  <p className='text-[26px]'>0</p>
                  <p className='text-xs font-normal'>This Year</p>
                </div>
                <img src={task_done} alt='pin icon' />
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 grid md:grid-flow-col gap-2'>
        <div className='bg-[#00808026] border-[#00808026] flex justify-start p-2 border rounded-lg md:col-span-3 col-span-3'>
          <img src={search} alt='search' />
          <Input
            type='text'
            placeholder='Search'
            className='border-0 bg-transparent shadow-none outline-none focus:outline-none'
          />
        </div>
        <div className='flex justify-start md:col-span-1 col-span-3'>
          <Dropdown
            label='Filter By'
            cn={"w-full h-13"}
            icon={<img src={filter} alt='filter' />}>
            <DropdownMenuGroup className='w-full'>
              <DropdownMenuItem>Successful Appointment</DropdownMenuItem>
              <DropdownMenuItem>Cancelled/Missed Appointment</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Cardiologist</DropdownMenuItem>
                    <DropdownMenuItem>Psychiatrist</DropdownMenuItem>
                    <DropdownMenuItem>Dietician</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>Next Week</DropdownMenuItem>
            </DropdownMenuGroup>
          </Dropdown>
        </div>
      </div>
      <div className='mt-10'>
        <Table thead={thead} tbody={[]} />
      </div>
    </>
  );
};

export default Appointments;
