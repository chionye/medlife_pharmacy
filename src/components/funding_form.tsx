/** @format */

import { useState } from "react";
import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { FundingPropType } from "@/types";
import { getCookie } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";
import { PaystackButton } from "react-paystack";
import Mutation from "@/api/mutation";

const FundingForm = () => {
  const payment_method: string[] = [
    "Select Payment Method",
    "Credit Card",
    "PayPal",
    "Apple Pay",
  ];

  const { showNotifier, NotifierComponent } = useNotifier();
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState<FundingPropType>({
    amount: "",
    user_id: userData.id,
    reference: "",
    gateway: "Select Payment Method",
    description: "wallet funding",
  });
  const publicKey = "pk_test_dca5b77edb197ab7d1f958b73bc20fef6aa84983";

  const { mutation } = Mutation();

  const handleFormSubmit = (ref: string) => {
    const data = {
      method: "post",
      url: `fund_wallet`,
      content: { ...formData, reference: ref },
    };
    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status) {
          showNotifier({
            title: "TRANSACTION SUCCESS",
            text: "",
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

  const componentProps = {
    email: userData.email,
    amount: parseFloat(formData.amount) * 100,
    metadata: {
      name: userData.fullname,
      phone: userData.phone,
      custom_fields: [
        {
          display_name: "Funding Invoice",
          variable_name: "ref",
          value: `ref-${Math.random().toString(16).substring(2)}`,
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: ({ reference }: { reference: string }) => {
      console.log(reference);
      handleFormSubmit(reference);
    },
    onClose: () => alert("Wait! Don't leave :("),
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
        <FormInput
          type='text'
          name='amount'
          label=''
          value={formData.amount}
          placeholder='Enter Amount'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormSelect
          value={formData.gateway}
          options={payment_method}
          name='gateway'
          label=''
          changeFunction={handleFormChange}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        disabled={formData.gateway === "Select Payment Method"}>
        {formData.gateway === "Credit Card" ? (
          <PaystackButton {...componentProps} />
        ) : (
          <>Pay Now</>
        )}
      </Button>
      {NotifierComponent}
    </div>
  );
};

export default FundingForm;
