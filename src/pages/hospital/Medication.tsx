/** @format */

import Query from "@/api/query";
import MedicationHistory from "@/components/medication_history";
import { MedicationHistoryPropType, QueryProps } from "@/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const AdminMedication = () => {
  const { id } = useParams();
  const [medications, setMedications] = useState<any>([]);

  const queryParamsArray: QueryProps = [
    {
      id: "medications",
      url: "medications/list",
      method: "post",
      payload: { user_id: id },
    },
  ];
  const { queries } = Query(queryParamsArray);
  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      setMedications(queries[0].data.data);
    }
  }, []);

  return (
    <>
      <NavLink to={"/hospital/users"} className='flex items-center'>
        <ChevronLeft size={18} />
        <p className='text-sm font-normal'>Medications</p>
      </NavLink>
      <div className='lg:px-20 py-5'>
        <div className='grid lg:grid-flow-row gap-2 mt-5'>
          {medications.length > 0 ? (
            medications.map((medication: MedicationHistoryPropType) => (
              <MedicationHistory
                medicine_name={medication.medicine_name}
                dosage={medication.dosage}
                frequency={medication.frequency}
                note={medication.note}
              />
            ))
          ) : (
            <p className='text-xs text-[#073131] text-center font-semibold'>
              No Medications yet
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMedication;
