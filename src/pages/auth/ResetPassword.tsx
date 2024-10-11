/** @format */

import { FormInput } from "@/components/form_input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import { setCookie } from "@/services/storage";
import { ResetPasswordPropType } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState<ResetPasswordPropType>({
    email: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading, sendRequest } = useAxiosRequest<any>();

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const data = await sendRequest("post", "user/forgotpassword", formData);
      if (data.status) {
        setCookie("@user", JSON.stringify(data.data), 1);
        setCookie("@token", JSON.stringify(data.token), 1);
        toast({
          title: "Success",
          description: data.message,
          action: <ToastAction altText='done'>done</ToastAction>,
        });
        // Pass the email to the verify page via navigate
        navigate("/verify", { state: { email: formData.email } });
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
      <p className='text-3xl font-bold'>Forgot Password?</p>
      <div className='mt-5'>
        <FormInput
          type='email'
          name='email'
          value={formData.email}
          label='Email Address'
          cn={"border border-[#000000] py-3 px-2"}
          changeFunction={handleFormChange}
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
        <div className='text-center text-[#D20606] text-lg mt-10'>
          <NavLink to={"/"}>Back to Login</NavLink>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
