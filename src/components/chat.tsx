import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import user from "@/assets/user.svg";

const Chat = () => {
  return (
    <div>
      <NavLink
        to={"/dashboard/home"}
        className='flex items-center md:gap-5 gap-2 text-[#333333CC] w-fit mt-3'>
        <ChevronLeft size={34} />
        <img src={user} alt='user image' />
        <div className='bg-[#D206060A]'>
          <p>Dr Peter Smith</p>
          <p>Active now</p>
        </div>
      </NavLink>
    </div>
  );
}

export default Chat