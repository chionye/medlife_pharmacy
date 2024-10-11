/** @format */

import { FormPinInput } from "@/components/form_input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import { setCookie } from "@/services/storage";
import { OTPPropType } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<OTPPropType>({
    email: location.state?.email || "",
    otp: "",
  });
  // const [value, setValue] = useState<string>("");

  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading, sendRequest } = useAxiosRequest<any>();

  const handleChangeOtp = (value: string) => {
    setFormData({
      ...formData,
      otp: value,
    });
  }

  const handleFormSubmit = async () => {
    console.log(formData);
    try {
      const data = await sendRequest("post", "otp/confirm", formData);
      if (data.status) {
        setCookie("@user", JSON.stringify(data.data), 1);
        setCookie("@token", JSON.stringify(data.token), 1);
        toast({
          title: "Success",
          description: data.message,
          action: <ToastAction altText='done'>done</ToastAction>,
        });
        navigate("/change-password", { state: { email: formData.email } });
      } else {
        if (data.errors.length > 0) {
          data.errors.forEach((err: string) => {
            toast({
              title: "Sorry",
              description: err,
              action: <ToastAction altText='done'>done</ToastAction>,
            });
          });
        } else {
          toast({
            title: "Sorry",
            description: data.message,
            action: <ToastAction altText='done'>done</ToastAction>,
          });
        }
      }
    } catch (error: any) {
      console.error("Error occurred during registration:", error.message);
    }
  };

  return (
    <div className='lg:pr-28 lg:px-0 px-3 mt-10'>
      <p className='text-3xl font-bold'>Verify OTP</p>
      <div className='mt-5'>
        <FormPinInput
          value={formData.otp}
          label='Enter OTP'
          changeFunction={handleChangeOtp}
        />
      </div>
      <div className='mt-10'>
        <Button
          className='bg-[#D20606] text-white w-full py-7'
          onClick={handleFormSubmit}
          disabled={loading}>
          {loading ? (
            <>
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>
        <div className='text-center text-lg mt-10'>
          <p className='text-lg font-normal'>Haven’t Received Code?</p>
          <button className='text-[#D20606]'>Resend</button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
