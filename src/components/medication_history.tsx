import { Card } from "./ui/card";

const MedicationHistory = () => {
  return (
    <div className='grid md:grid-flow-row gap-2 mt-5'>
      <div className='md:col-span-2 col-span-2'>
        <Card className='border rounded-xl p-4'>
          <p className='text-xs text-[#073131] font-semibold text-nowrap'>
            Acetonin 500 mg
          </p>
          <p className='text-xs text-[#073131] font-normal'>
            Take with food every morning.
          </p>
        </Card>
      </div>
      <div className='md:col-span-2 col-span-2'>
        <Card className='border rounded-xl p-4'>
          <p className='text-xs text-[#073131] font-semibold text-nowrap'>
            Prolaxin 10mg
          </p>
          <p className='text-xs text-[#073131] font-normal'>
            Twice a day after meals
          </p>
        </Card>
      </div>
    </div>
  );
}

export default MedicationHistory;