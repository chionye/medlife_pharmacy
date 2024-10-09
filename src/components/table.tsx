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
import { useRef, useState } from "react";
import FullModal from "./full_modal";
import { AppointmentDetails } from "./appointment_form";
import video_call from "@/assets/video_call.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Mutation from "@/api/mutation";
import { getConfigByRole, getCookie } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";
import { PatientsDetails } from "./top_patients";
import CustomModal from "./custom_modal";
import { DoctorsDetails } from "@/components/top_doctors";
import { EditDoctorForm } from "./onboard_form";

const Table: React.FC<TablePropType> = ({ thead, tbody, keys }) => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const role = getConfigByRole();

  const { mutation } = Mutation();
  const navigate = useNavigate();
  // State to manage the selected patient for modal
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  // Ref to trigger FullModal programmatically
  const modalRef = useRef<HTMLButtonElement>(null);
  const doctorModalRef = useRef<HTMLButtonElement>(null);

  const handleViewPatientProfile = (patient: any) => {
    setSelectedPatient(patient); // Set the selected patient details
    modalRef.current?.click(); // Trigger modal opening programmatically
  };

  const handleViewDoctorDetails = (doctor: any) => {
    setSelectedDoctor(doctor); // Set the selected doctor details
    doctorModalRef.current?.click(); // Trigger doctor modal opening programmatically
  };

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

    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status) {
          showNotifier({
            title: "Success",
            text: `You have marked this appointment as completed`,
            status: "success",
          });
        } else if (data.error || data.errors || data.message) {
          const errorMessage = data.message
            ? data.message
            : data.error
            ? data.error
            : Array.isArray(data.errors)
            ? data.errors.join("\n")
            : data.errors;
          showNotifier({
            title: "Error",
            text: errorMessage,
            status: "error",
          });
        }
      },
      onError: (error) => {
        console.log("Error submitting feedback:", error);
        showNotifier({
          title: "Error",
          text: "There was an error submitting your feedback. Please try again.",
          status: "error",
        });
      },
    });
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
                            to={item[key]}
                            className={"w-full flex justify-center"}>
                            <img src={video_call} alt='' className='w-5' />
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
                      ) : key === "view" ? (
                        <td className='px-4 py-3 text-xs font-normal text-center'>
                          <div className='flex w-full justify-center'>
                            <Dropdown
                              label=''
                              cn='h-13'
                              showArrow={false}
                              icon={<img src={options} alt='View More' />}
                              options={[
                                {
                                  label: "View Patient’s Profile",
                                  child: (
                                    <div
                                      onClick={() =>
                                        handleViewPatientProfile(item)
                                      }>
                                      View Patient’s Profile
                                    </div>
                                  ),
                                },
                                {
                                  label: "Medicine Prescription",
                                  child: (
                                    <NavLink
                                      to={`/${role}/medication/${item.id}`}>
                                      Medicine Prescription
                                    </NavLink>
                                  ),
                                },
                              ]}
                            />
                          </div>
                        </td>
                      ) : key === "manage_physician" ? (
                        <td className='px-4 py-3 text-xs font-normal text-center'>
                          <div className='flex w-full justify-center'>
                            <Dropdown
                              label=''
                              cn='h-13'
                              showArrow={false}
                              icon={
                                <img src={options} alt='Manage Physician' />
                              }
                              options={[
                                {
                                  label: "Edit Physicain’s Profile",
                                  child: (
                                    <div
                                      onClick={() =>
                                        handleViewDoctorDetails(item)
                                      }>
                                      Edit Physicain’s Profile
                                    </div>
                                  ),
                                },
                                // { label: "Activate Physician" },
                                // { label: "Deactivate Physician" },
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
                            scrollBehavior='outside'
                            cn={"underline text-[#333333]"}>
                            <div className='flex justify-center items-center'>
                              <DoctorsDetails {...item} />
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
        {/* Hidden buttons to trigger modals programmatically */}
        <button ref={modalRef} style={{ display: "none" }}>
          Open Patient Modal
        </button>
        <button ref={doctorModalRef} style={{ display: "none" }}>
          Open Doctor Modal
        </button>

        {/* FullModal for viewing patient details */}
        {selectedPatient && (
          <CustomModal
            title={"Patient’s Profile"}
            isOpen={!!selectedPatient}
            onClose={() => setSelectedPatient(null)}>
            <div className='flex justify-center items-center'>
              <PatientsDetails {...selectedPatient} />
            </div>
          </CustomModal>
        )}

        {/* FullModal for viewing doctor details */}
        {selectedDoctor && (
          <CustomModal
            title={"Edit Doctor’s Profile"}
            isOpen={!!selectedDoctor}
            onClose={() => setSelectedDoctor(null)}>
            <div className='flex justify-center items-center'>
              <EditDoctorForm doctor={selectedDoctor} />
            </div>
          </CustomModal>
        )}
      </div>
    </div>
  );
};

export default Table;
