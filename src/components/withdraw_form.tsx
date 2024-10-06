/** @format */

import { useState } from "react";
import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { WithdrawPropType } from "@/types";
import { getCookie } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";
import Mutation from "@/api/mutation";
import { ReloadIcon } from "@radix-ui/react-icons";

const WithdrawForm = () => {
  const payment_method: string[] = [
    "Choose Bank",
    "Access Bank",
    "Kuda Microfinance Bank",
    "Zenith Bank",
    "Moniepoint Microfinance Bank",
    "UBA Bank",
    "GTBank",
    "FCMB",
    "Opay Microfinance Bank",
    "First Bank of Nigeria",
  ];

  const { showNotifier, NotifierComponent } = useNotifier();
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState<WithdrawPropType>({
    user_id: userData?.id,
    acc_number: "",
    acc_name: "",
    bank_name: "",
    amount: "",
  });

  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    console.log("clicked");
    if (
      parseFloat(formData.amount) <= 0 ||
      formData.acc_number === "Choose Bank"
    ) {
      showNotifier({
        title: "Oops!",
        text: "All fields are required",
        status: "warning",
      });
    }

    const data = {
      method: "post",
      url: `doctors/withdraw`,
      content: formData,
    };
    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status) {
          showNotifier({
            title: "Success",
            text: "Your withdrawal request was successfully submitted!",
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
      <div className='flex justify-between gap-3'>
        <FormSelect
          value={formData.bank_name}
          options={payment_method}
          name='bank_name'
          label='Bank Name'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='acc_name'
          label='Account Name'
          value={formData.acc_name}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='acc_number'
          label='Account Number'
          value={formData.acc_number}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='amount'
          label='Amount'
          value={formData.amount}
          changeFunction={handleFormChange}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        {mutation.isPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Please wait
          </>
        ) : (
          "Proceed"
        )}
      </Button>
      {NotifierComponent}
    </div>
  );
};

export default WithdrawForm;
