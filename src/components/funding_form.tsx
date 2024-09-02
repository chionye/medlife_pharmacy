/** @format */

import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";

const FundingForm = () => {
  const payment_method: string[] = [
    "Select Payment Method",
    "Credit Card",
    "PayPal",
    "Apple Pay"
  ];
  return (
    <div className='mt-2 w-full'>
      <div className='flex justify-between gap-3'>
        <FormInput
          type='text'
          name='amount'
          label=''
          placeholder='Enter Amount'
          changeFunction={() => console.log("test")}
        />
      </div>
      <div className='mt-4'>
        <FormSelect
          value='Select Payment Method'
          options={payment_method}
          name='payment_method'
          label=''
          changeFunction={() => console.log("test")}
        />
      </div>
      <Button className='bg-[#D20606] w-full mt-6 p-7'>Proceed</Button>
    </div>
  );
};

export default FundingForm;
