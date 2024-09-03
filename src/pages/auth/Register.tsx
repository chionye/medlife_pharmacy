/** @format */

import { FormInput, FormSelect } from "@/components/form_input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import { setCookie } from "@/services/storage";
import { RegisterPropType } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState<RegisterPropType>({
    username: "",
    email: "",
    password: "",
    user_type: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading, sendRequest } = useAxiosRequest<any>();

  const role: string[] = ["Patient", "Doctor"];

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
      const data = await sendRequest("post", "create_user", formData);
      if (data.status) {
        setCookie("@user", JSON.stringify(data.data), 1);
        setCookie("@token", JSON.stringify(data.token), 1);
        toast({
          title: "Success",
          description: data.message,
          action: <ToastAction altText='done'>done</ToastAction>,
        });
        navigate("/dashboard/home");
      } else {
        if (data.errors.length > 0) {
          data.errors.forEach((err: string) => {
            toast({
              title: "Sorry",
              description: err,
              action: <ToastAction altText='done'>done</ToastAction>,
            });
          });
        }
      }
    } catch (error: any) {
      console.error("Error occurred during registration:", error.message);
    }
  };

  return (
    <div className='md:pr-28 md:px-0 px-3 mt-7'>
      <p className='text-3xl font-bold'>Sign Up</p>
      <div className='mt-5'>
        <FormSelect
          value={formData.user_type}
          options={role}
          name='user_type'
          cn={"w-full border border-[#000000] py-3 px-2"}
          label=''
          changeFunction={handleFormChange}
        />
      </div>
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
      <div className='mt-5'>
        <FormInput
          type='text'
          name='username'
          label='Username'
          value={formData.username}
          cn={"border border-[#000000] py-3 px-2"}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-5'>
        <FormInput
          type='password'
          name='password'
          value={formData.password}
          label='Password'
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
            "Sign Up"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Register;
