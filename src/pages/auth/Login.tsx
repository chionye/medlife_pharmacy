/** @format */

import { FormInput } from "@/components/form_input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import { setCookie } from "@/services/storage";
import { LoginPropType } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import envelope from "@/assets/mail.svg";
import lock from "@/assets/lock.svg";
import eye from "@/assets/view-off.svg";

const Login = () => {
  const [formData, setFormData] = useState<LoginPropType>({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading, sendRequest } = useAxiosRequest<any>();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const data = await sendRequest("post", "login_user", formData);
      if (data.status) {
        const fulluser = data.data;
        if (fulluser.photo.indexOf("dicebear") == -1) {
          fulluser.photo = `https://api.medlifelink.life/images/profiles/${fulluser.photo}`;
        }
        setCookie("@user", JSON.stringify(fulluser), 1);
        setCookie("@token", JSON.stringify(data.token), 1);
        toast({
          title: "Success",
          description: data.message,
          action: <ToastAction altText='done'>done</ToastAction>,
        });
        navigate(`/pharmacy/home`);
      } else {
        if (data.error || data.errors || data.message) {
          const errorMessage = data.message
            ? data.message
            : data.error
            ? data.error
            : Array.isArray(data.errors)
            ? data.errors.join("\n")
            : data.errors;
          toast({
            title: "Sorry",
            description: errorMessage,
            action: <ToastAction altText='done'>done</ToastAction>,
          });
        }
      }
    } catch (error: any) {
      console.error("Error occurred during registration:", error.message);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='lg:px-0 px-3 mt-7 lg:w-3/4'>
        <div className='mt-5'>
          <FormInput
            type='email'
            name='email'
            label='Email'
            placeholder='mina@gmail.com'
            icon={<img src={envelope} alt='envelope image' />}
            cn={"border-b-2 border-b-[#585BA8] px-2 bg-[#F2F2F280]"}
            changeFunction={handleFormChange}
          />
        </div>
        <div className='mt-5'>
          <FormInput
            type='password'
            name='password'
            label='Password'
            placeholder='*****************'
            icon={<img src={lock} alt='lock image' />}
            rightIcon={<img src={eye} alt='eye image' />}
            cn={"border-b-2 border-b-[#585BA8] px-2 bg-[#F2F2F280]"}
            changeFunction={handleFormChange}
          />
        </div>
        <div className='flex justify-end mt-3'>
          <NavLink to={""} className={"text-lg font-light"}>
            Forgot your password?
          </NavLink>
        </div>
        <div className='mt-10'>
          <Button
            className='bg-[#585BA8] text-white w-full py-7'
            onClick={handleFormSubmit}
            disabled={loading}>
            {loading ? (
              <>
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
