/** @format */

import MedicationHistory from "@/components/medication_history";
import { ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const Medication = () => {
  return (
    <>
      <NavLink to={"/dashboard/home"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Medications</p>
      </NavLink>
      <div className='md:px-20 py-5'>
        <MedicationHistory />
      </div>
    </>
  );
};

export default Medication;
