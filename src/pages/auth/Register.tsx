/** @format */

import { FormInput, FormSelect } from "@/components/form_input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import { useNotifier } from "@/hooks/useNotifier";
import { setCookie } from "@/services/storage";
import { RegisterPropType } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState<RegisterPropType>({
    username: "",
    fullname: "",
    email: "",
    password: "",
    role: "patient",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { loading, sendRequest } = useAxiosRequest<any>();
  const { showNotifier, NotifierComponent } = useNotifier();

  const roles: string[] = ["patient", "doctor"];

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
      const registerData = {
        ...formData,
        photo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.fullname}`,
      };
      // if (formData.role === "doctor") {
      //   showNotifier({
      //     title: "SIGNING UP AS A DOCTOR?",
      //     text: "To ensure seamless integration of your practice, a one-time fee of #30,000 is required for every six-month period. This fee covers the cost of platform integration, maintenance, and support.",
      //     status: "error",
      //     button: true,
      //     auth: true,
      //     confirmText: "Continue",
      //     cancelText: "Cancel",
      //     confirmFunction: async () => {
      //       const data = await sendRequest("post", "create_user", registerData);
      //       if (data.status) {
      //         setCookie("@user", JSON.stringify(data.data), 1);
      //         setCookie("@token", JSON.stringify(data.token), 1);
      //         toast({
      //           title: "Success",
      //           description: data.message,
      //           action: <ToastAction altText='done'>done</ToastAction>,
      //         });
      //         if (data.data.role === "patient") {
      //           navigate("/patient/home");
      //         } else if (data.data.role === "doctor") {
      //           navigate("/doctor/home");
      //         } else if (data.data.role === "hospital") {
      //           navigate("/hospital/home");
      //         }
      //       } else {
      //         if (data.errors.length > 0) {
      //           data.errors.forEach((err: string) => {
      //             toast({
      //               title: "Sorry",
      //               description: err,
      //               action: <ToastAction altText='done'>done</ToastAction>,
      //             });
      //           });
      //         } else {
      //           toast({
      //             title: "Sorry",
      //             description: data.message,
      //             action: <ToastAction altText='done'>done</ToastAction>,
      //           });
      //         }
      //       }
      //     },
      //   });
      // } else {
        const data = await sendRequest("post", "create_user", registerData);
        if (data.status) {
          setCookie("@user", JSON.stringify(data.data), 1);
          setCookie("@token", JSON.stringify(data.token), 1);
          toast({
            title: "Success",
            description: data.message,
            action: <ToastAction altText='done'>done</ToastAction>,
          });
          if (data.data.role === "patient") {
            navigate("/patient/home");
          } else if (data.data.role === "doctor") {
            navigate("/doctor/home");
          } else if (data.data.role === "hospital") {
            navigate("/hospital/home");
          }
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
      // }
    } catch (error: any) {
      console.error("Error occurred during registration:", error.message);
    }
  };

  return (
    <div className='lg:pr-28 lg:px-0 px-3 mt-7'>
      <p className='text-3xl font-bold'>Sign Up</p>
      <div className='mt-5'>
        <FormSelect
          value={formData.role}
          options={roles}
          name='role'
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
          name='fullname'
          label='Fullname'
          value={formData.fullname}
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
        {NotifierComponent}
      </div>
    </div>
  );
};

export default Register;
