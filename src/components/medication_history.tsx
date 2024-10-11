/** @format */

import { MedicationHistoryPropType } from "@/types";
import { Card } from "./ui/card";

const MedicationHistory: React.FC<MedicationHistoryPropType> = ({
  medicine_name,
  dosage,
  frequency,
  note,
}) => {
  return (
    <div className='grid lg:grid-flow-row gap-2 mt-5'>
      <div className='lg:col-span-2 col-span-2'>
        <Card className='border rounded-xl p-4'>
          <p className='text-xs text-[#073131] font-semibold text-nowrap'>
            {medicine_name} {dosage}
          </p>
          <p className='text-xs text-[#073131] font-normal'>
            {frequency} {note}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MedicationHistory;
