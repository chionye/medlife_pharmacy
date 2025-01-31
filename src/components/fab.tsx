/** @format */

import { FabPropType } from "@/types";

const Fab: React.FC<FabPropType> = ({ icon, callback }) => {
  return (
    <button
      onClick={callback}
      className='fixed bottom-10 right-10 bg-[#585BA8CC] w-16 h-16 flex justify-center items-center rounded-full'>
      <img src={icon} alt='open modal' />
    </button>
  );
};

export default Fab;
