/** @format */

import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { useState } from "react";
import Mutation from "@/api/mutation";
import { getCookie } from "@/services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";

const ChangeUserForm = ({
  fieldName,
  label,
  apiUrl,
  formType,
  options
}: {
  fieldName: string;
  label: string;
  apiUrl: string;
  formType?: string;
  options?: string[];
}) => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState({
    [fieldName]: userData?.[fieldName] || "",
  });

  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: apiUrl,
      content: formData,
    };
    console.log(formData);
    mutation.mutate(data);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-between gap-3'>
        {formType === "select" ? (
          <FormSelect
            options={options}
            name={fieldName}
            label={label}
            value={formData[fieldName]}
            changeFunction={handleFormChange}
          />
        ) : (
          <FormInput
            type='text'
            name={fieldName}
            label={label}
            value={formData[fieldName]}
            changeFunction={handleFormChange}
          />
        )}
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        {mutation.isPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Saving
          </>
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
};

export default ChangeUserForm