/** @format */

import { FormInput, FormSelect, FormTextArea } from "./form_input";
import { Button } from "./ui/button";
import { useState } from "react";
import { getCookie } from "@/services/storage";
import { PrescriptionFormProps } from "@/types";
import Mutation from "@/api/mutation";
import { useNotifier } from "@/hooks/useNotifier";
import { ReloadIcon } from "@radix-ui/react-icons";

const PrescriptionForm = ({
  patients,
}: {
  patients: { id: string; name: string }[];
}) => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState<PrescriptionFormProps>({
    user_id: patients[0]?.id || "",
    prescribed_by: userData.id,
    medicine_name: "",
    dosage: "",
    frequency: "",
    start_date: "",
    note: "",
  });
  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = () => {
    try {
      const data = {
        method: "post",
        url: `medication/create`,
        content: formData,
      };
      mutation.mutate(data, {
        onSuccess: (data) => {
          console.log(data);
          if (data.status) {
            showNotifier({
              title: "Success",
              text: "Your have successfully submitted your prescription!",
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
          console.log("Error submitting data:", error);
          showNotifier({
            title: "Error",
            text: "There was an error submitting your data. Please try again.",
            status: "error",
          });
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='flex flex-col mt-10 px-5 lg:gap-4'>
        <div className='w-full'>
          <FormSelect
            value={formData.user_id}
            options={patients}
            name={"user_id"}
            label={"Select Patient"}
            changeFunction={handleFormChange}
          />
        </div>
        <div className='flex lg:flex-row flex-col justify-between gap-3'>
          <FormInput
            type='text'
            name='medicine_name'
            label='Medicine'
            value={formData.medicine_name}
            placeholder='Enter Medicine Name'
            changeFunction={handleFormChange}
          />
          <FormInput
            type='text'
            name='dosage'
            label='Dosage'
            value={formData.dosage}
            placeholder='Enter Dosage'
            changeFunction={handleFormChange}
          />
        </div>
        <div className='flex lg:flex-row flex-col justify-between gap-3 lg:mt-0 mt-2'>
          <FormInput
            type='text'
            name='frequency'
            label='Frequency'
            value={formData.frequency}
            placeholder='Enter Frequency (2 tablets x 3 Daily)'
            changeFunction={handleFormChange}
          />
          <FormInput
            type='date'
            name='start_date'
            label='Start Date'
            value={formData.start_date}
            changeFunction={handleFormChange}
          />
        </div>
        <div className='flex justify-between gap-3 lg:mt-0 mt-3'>
          <FormTextArea
            name='note'
            label='Note'
            value={formData.note}
            changeFunction={handleFormChange}
          />
        </div>
        <Button
          className='bg-[#585BA8] w-full mt-6 p-7'
          onClick={handleFormSubmit}>
          {mutation.isPending ? (
            <>
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>
        {NotifierComponent}
      </div>
    </>
  );
};

export default PrescriptionForm;
