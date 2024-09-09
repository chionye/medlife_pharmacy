
import { useState } from "react";
import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { FundingPropType } from "@/types";
import { getCookie } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";

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

  // const { mutation } = Mutation();

  const handleFormSubmit = () => {
    console.log("clicked");
    if (
      parseFloat(formData.amount) <= 0 ||
      formData.gateway === "Select Payment Method"
    ) {
      return showNotifier({
        title: "Oops!",
        text: "All fields are required",
        status: "warning",
      });
    }

    // const data = {
    //   method: "post",
    //   url: `fund_wallet`,
    //   content: formData,
    // };

    // mutation.mutate(data);
    // if (mutation.isSuccess) {
    //   showNotifier({
    //     title: "TRANSACTION SUCCESS",
    //     text: "",
    //     status: "success",
    //   });
    // } else {
    //   showNotifier({
    //     title: "Error",
    //     text: "Failed to fund wallet. Please try again later.",
    //     status: "error",
    //   });
    // }
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
        onClick={handleFormSubmit}>
        Proceed
      </Button>
      {NotifierComponent}
    </div>
  );
};

export default FundingForm;
