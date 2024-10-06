/** @format */

import { useState } from "react";
import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { ConsultationFeePropType } from "@/types";
import Mutation from "@/api/mutation";
import { getCookie } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";

const ConsultationForm = () => {
  const consultation_type: string[] = [
    "Select Consultation Type",
    "Initial consultation",
    "Cardiology",
    "follow-up appointment",
    "Procedure",
    "Dermatology",
    "Neurology",
    "Group Consultation",
  ];

  const { showNotifier, NotifierComponent } = useNotifier();
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState<ConsultationFeePropType>({
    consultation_amount: userData.consultation_amount,
    specialization: userData.specialization,
  });

  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `user/update_prof_info`,
      content: {
        ...formData,
        user_id: userData.id,
        address: userData.address,
        photo: userData.photo,
      },
    };

    mutation.mutate(data);
    if (mutation.isSuccess) {
      console.log(mutation.data);
      if (mutation.data.status) {
        if (mutation.isSuccess) {
          showNotifier({
            title: "Success",
            text: "Your consultation and rates was successfully updated!",
            status: "success",
          });
        }
      } else {
        const errorMessage = Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <div className='mt-2 w-full'>
      <div className='mt-4'>
        <FormSelect
          value={formData.specialization}
          options={consultation_type}
          name='specialization'
          label='Consultation Type'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='consultation_amount'
          label='Enter Flat Rate(per hour)'
          value={formData.consultation_amount}
          placeholder='Enter Flat Rate(per hour)'
          changeFunction={handleFormChange}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        Save
      </Button>
      {NotifierComponent}
    </div>
  );
};

export default ConsultationForm;
