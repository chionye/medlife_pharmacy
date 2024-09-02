/** @format */

// import { Card } from "./ui/card";
import profile from "@/assets/profile.svg";

const Header = ({ image }: { image: string }) => {
  return (
    <div className='pb-5'>
      <div className='bg-white text-[#000000] px-6 z-10 w-full border-b border-[#0080804D] '>
        <div className='flex items-center justify-between py-2 text-5x1'>
          <div className='font-bold text-[#000000] text-xl flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 24 24'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M8.557 2.75H4.682A1.93 1.93 0 0 0 2.75 4.682v3.875a1.94 1.94 0 0 0 1.932 1.942h3.875a1.94 1.94 0 0 0 1.942-1.942V4.682A1.94 1.94 0 0 0 8.557 2.75m10.761 0h-3.875a1.94 1.94 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942V4.682a1.93 1.93 0 0 0-1.932-1.932m0 10.75h-3.875a1.94 1.94 0 0 0-1.942 1.933v3.875a1.94 1.94 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942v-3.875a1.93 1.93 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.93 1.93 0 0 0 1.932 1.932h3.875a1.94 1.94 0 0 0 1.942-1.932v-3.875a1.94 1.94 0 0 0-1.942-1.942'></path>
            </svg>
            <span className='ml-2 font-[500] text-sm'>Overview</span>
          </div>
          <div className='flex items-center text-gray-500'>
            <span className='ml-2 font-[500] text-sm'>Alex Harthway</span>
            <img
              className={`bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2`}
              src={image ? image : profile}
              alt='avatar'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
