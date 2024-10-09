/** @format */

import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { useState } from "react";
import Mutation from "@/api/mutation";
import { getCookie, setCookie } from "@/services/storage";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNotifier } from "@/hooks/useNotifier";
import { useNavigate } from "react-router";

const ChangeUserForm = ({
  fieldName,
  label,
  apiUrl,
  formType,
  options,
}: {
  fieldName: string;
  label: string;
  apiUrl: string;
  formType?: string;
  options?: string[];
}) => {
  const user = getCookie("@user");
  const navigate = useNavigate();
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState({
    [fieldName]: userData?.[fieldName] || "",
  });

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const updateData = { ...formData, user_id: userData.id };
    const data = {
      method: "post",
      url: apiUrl,
      content: updateData,
    };
    mutation.mutate(data, {
      onSuccess: (data) => {
        if (data.status) {
          showNotifier({
            title: "Success",
            text: `Your ${fieldName} has been successfully updated!`,
            status: "success",
          });
          if (apiUrl === "user/updateany") {
            setCookie("@user", JSON.stringify(data.data), 1);
          }
          navigate(0);
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
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

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
      {NotifierComponent}
    </div>
  );
};

export default ChangeUserForm;
