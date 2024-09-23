/** @format */

import { FormInput } from "@/components/form_input";
import { Button } from "@/components/ui/button";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import { ChangePasswordPropType } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useNotifier } from "@/hooks/useNotifier";

const ChangePassword = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<ChangePasswordPropType>({
    email: location.state?.email || "",
    password: "",
    new_password: "",
  });
  const { showNotifier, NotifierComponent } = useNotifier();

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
      const data = await sendRequest("post", "user/changePassword", formData);
      if (data.status) {
        showNotifier({
          title: "Success",
          text: data.message,
          status: "success",
        });
        navigate("/");
      } else {
        const errorMessage = data.data.errors.join("\n");
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    } catch (error: any) {
      console.error("Error occurred during registration:", error.message);
    }
  };

  return (
    <div className='md:pr-28 md:px-0 px-3 mt-10'>
      <p className='text-3xl font-bold'>Forgot Password?</p>
      <div className='mt-5'>
        <FormInput
          type='password'
          name='password'
          value={formData.password}
          label='New Password'
          cn={"border border-[#000000] py-3 px-2"}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-5'>
        <FormInput
          type='password'
          name='new_password'
          value={formData.new_password}
          label='Confirm Password'
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
        {NotifierComponent}
      </div>
    </div>
  );
};

export default ChangePassword;
