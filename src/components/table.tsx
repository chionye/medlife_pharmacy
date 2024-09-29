/** @format */

import check from "@/assets/check.svg";
import redo from "@/assets/redo.svg";
import denied from "@/assets/denied.svg";
import { TablePropType } from "@/types";
import {
  getAgeFromDOB,
  getDateFormat,
  getNestedValue,
} from "@/services/helpers";
import options from "@/assets/options.svg";
import Dropdown from "./dropdown";
import { useMemo } from "react";
import FullModal from "./full_modal";
import { AppointmentDetails } from "./appointment_form";
import video_call from "@/assets/video_call.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Mutation from "@/api/mutation";
import { getCookie } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";

const Table: React.FC<TablePropType> = ({ thead, tbody, keys }) => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const details = useMemo(
    () => [
      { label: "Create Appointment" },
      { label: "Update Patient’s Appointment" },
      { label: "View Patient’s Profile" },
      { label: "Medicine Prescription" },
      { label: "Rate Patient’s Performance" },
    ],
    []
  );

  const { mutation } = Mutation();
  const navigate = useNavigate();

  const { showNotifier, NotifierComponent } = useNotifier();

  const handleStatusCompleted = (id: string) => {
    const data = {
      method: "post",
      url: `appointment/status`,
      content: {
        appointment_id: id,
        action: "completed",
      },
    };

    mutation.mutate(data);
    if (mutation.isSuccess) {
      if (mutation.data.status) {
        showNotifier({
          title: "Success",
          text: `You have marked this appointment as completed`,
          status: "success",
        });
      } else {
        const errorMessage = mutation.data.message
          ? mutation.data.message
          : Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        console.log(errorMessage, mutation.data);
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    }
  };

  function createCallSession(patient_id: number) {
    // Generate or fetch the callId
    const callId = `call-${Math.random().toString(16).substring(2)}`;
    const data = {
      method: "post",
      url: `call/create`,
      content: { callId, doctors_id: userData.id, patients_id: patient_id },
    };
    mutation.mutate(data);

    // Redirect the patient and doctor to the call page
    navigate(`/call/${callId}`);
  }

  return (
    <div className='w-full mb-8 overflow-x-scroll rounded-lg shadow-lg'>
      <div className='w-full overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='text-sm h-[66px] font-semibold tracking-wide text-left text-[#FFFFFF] bg-[#D20606] border-b border-[#D20606]'>
              {thead &&
                thead.map((item: string) => (
                  <th className='px-4 py-3'>{item}</th>
                ))}
            </tr>
          </thead>
          <tbody className='bg-white'>
            {tbody &&
              tbody.map((item: any, index: number) => (
                <tr className='text-gray-700 border-b'>
                  {keys &&
                    keys.map((key: string) => {
                      return key === "status" ? (
                        <td className='px-4 py-3 text-xs flex justify-center font-normal'>
                          {item[key] === "completed" ||
                          item[key] === "active" ? (
                            <img src={check} alt='status' />
                          ) : item[key] === "approve" ||
                            item[key] === "pending" ? (
                            <img src={redo} alt='status' />
                          ) : (
                            <img src={denied} alt='status' />
                          )}
                        </td>
                      ) : key === "description" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          <p className='truncate w-24'>{item[key]}</p>
                          <FullModal
                            title={"Appointment Details"}
                            label='Read More'
                            cn={"underline text-[#333333]"}>
                            <div className='flex justify-center items-center'>
                              <AppointmentDetails appointment={item} />
                            </div>
                          </FullModal>
                        </td>
                      ) : key === "SN" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          {index + 1}
                        </td>
                      ) : key === "dob" || key === "created_at" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          {key === "dob"
                            ? `${getAgeFromDOB(
                                item[key] || item["created_at"]
                              )} yrs`
                            : getDateFormat(item[key], "date")}
                        </td>
                      ) : key === "response" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          <FullModal
                            title={"Appointment Details"}
                            label='Update Here'
                            cn={"underline text-[#333333]"}>
                            <div className='flex justify-center items-center'>
                              <AppointmentDetails appointment={item} />
                            </div>
                          </FullModal>
                        </td>
                      ) : key === "link" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          <NavLink
                            to={item.status === "pending" ? item[key] : "#"}
                            className={"w-full flex justify-center"}>
                            {item.status === "pending" ? (
                              <img src={video_call} alt='' className='w-5' />
                            ) : (
                              "Link Expired"
                            )}
                          </NavLink>
                        </td>
                      ) : key === "completed" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          <Button
                            onClick={() => handleStatusCompleted(item.id)}
                            className={
                              "w-full flex justify-center bg-[#4BB543]"
                            }>
                            Completed
                          </Button>
                        </td>
                      ) : key === "call_patient" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          <Button
                            variant={"ghost"}
                            className={"w-full flex justify-center"}
                            onClick={() => createCallSession(item.id)}>
                            <img src={video_call} alt='' className='w-5' />
                          </Button>
                        </td>
                      ) : key.indexOf(".") != -1 ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          {getNestedValue(item, key)}
                        </td>
                      ) : key === "view_more" ? (
                        <td className='px-4 py-3 text-xs font-normal text-center'>
                          <div className='flex w-full justify-center'>
                            <Dropdown
                              label='View More'
                              cn='w-full h-13'
                              icon={<img src={options} alt='View More' />}
                              options={details}
                            />
                          </div>
                        </td>
                      ) : key === "manage_physician" ? (
                        <td className='px-4 py-3 text-xs font-normal text-center'>
                          <div className='flex w-full justify-center'>
                            <Dropdown
                              label=''
                              cn='w-full h-13'
                              icon={
                                <img src={options} alt='Manage Physician' />
                              }
                              options={[
                                { label: "Edit Physicain’s Profile" },
                                { label: "Activate Physician" },
                                { label: "Deactivate Physician" },
                              ]}
                            />
                          </div>
                        </td>
                      ) : key === "view_detail" ? (
                        <td className='px-4 py-3 text-xs font-normal'>
                          <p className='truncate w-24'>{item[key]}</p>
                          <FullModal
                            title={"Doctors Details"}
                            label='View more'
                            cn={"underline text-[#333333]"}>
                            <div className='flex justify-center items-center'>
                              <AppointmentDetails appointment={item} />
                            </div>
                          </FullModal>
                        </td>
                      ) : (
                        <td className='px-4 py-3 text-xs font-normal'>
                          {item[key]}
                        </td>
                      );
                    })}
                </tr>
              ))}
          </tbody>
        </table>
        {NotifierComponent}
      </div>
    </div>
  );
};

export default Table;
