/** @format */

import { FormInput } from "@/components/form_input";
// import { ToastAction } from "@/components/ui/toast";
// import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
// import { useNotifier } from "@/hooks/useNotifier";
// import { setCookie } from "@/services/storage";
import { RegisterPropType } from "@/types";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import user from "@/assets/user-circle.svg";
import phone from "@/assets/phone.svg";
import envelope from "@/assets/mail.svg";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Stepper } from "@/components/stepper";

const Register = () => {
  const [formData, setFormData] = useState<RegisterPropType>({
    username: "",
    fullname: "",
    email: "",
    password: "",
    role: "patient",
  });
  const [currentStep, setCurrentStep] = useState(0);

  // const { toast } = useToast();
  // const navigate = useNavigate();
  const { loading } = useAxiosRequest<any>();
  // const { showNotifier, NotifierComponent } = useNotifier();

  const steps = ["1", "2", "3"];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  // const prevStep = () => {
  //   if (currentStep > 0) setCurrentStep(currentStep - 1);
  // };

  // const handleFormSubmit = async () => {
  //   try {
  //     const registerData = {
  //       ...formData,
  //       photo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.fullname}`,
  //     };
  //     const data = await sendRequest("post", "creuser", registerData);
  //     if (data.status) {
  //       setCookie("@user", JSON.stringify(data.data), 1);
  //       setCookie("@token", JSON.stringify(data.token), 1);
  //       toast({
  //         title: "Success",
  //         description: data.message,
  //         action: <ToastAction altText='done'>done</ToastAction>,
  //       });
  //       navigate(`/${data.data.role}/home`);
  //     } else {
  //       if (data.errors.length > 0) {
  //         data.errors.forEach((err: string) => {
  //           toast({
  //             title: "Sorry",
  //             description: err,
  //             action: <ToastAction altText='done'>done</ToastAction>,
  //           });
  //         });
  //       } else {
  //         toast({
  //           title: "Sorry",
  //           description: data.message,
  //           action: <ToastAction altText='done'>done</ToastAction>,
  //         });
  //       }
  //     }
  //     // }
  //   } catch (error: any) {
  //     console.error("Error occurred during registration:", error.message);
  //   }
  // };

  return (
    <div className='flex justify-center'>
      <div className='lg:px-0 px-3 mt-7 lg:w-3/4'>
        <Stepper steps={steps} currentStep={currentStep} />
        <div className='mt-5'>
          <FormInput
            type='text'
            name='fullname'
            label='Business Name *'
            placeholder='Mira'
            icon={<img src={user} alt='user circle image' />}
            cn={"border-b-2 border-b-[#585BA8] px-2 bg-[#F2F2F280]"}
            changeFunction={handleFormChange}
          />
        </div>
        <div className='mt-5'>
          <FormInput
            type='email'
            name='email'
            label='Email Address *'
            placeholder='mina@gmail.com'
            icon={<img src={envelope} alt='envelope image' />}
            cn={"border-b-2 border-b-[#585BA8] px-2 bg-[#F2F2F280]"}
            changeFunction={handleFormChange}
          />
        </div>
        <div className='mt-5'>
          <FormInput
            type='text'
            name='phone'
            label='Phone Number *'
            placeholder='09087654231'
            icon={<img src={phone} alt='phone image' />}
            cn={"border-b-2 border-b-[#585BA8] px-2 bg-[#F2F2F280]"}
            changeFunction={handleFormChange}
          />
        </div>
        <div className='mt-10'>
          <Button
            className='bg-[#585BA8] text-white w-full py-7'
            onClick={nextStep}
            disabled={loading}>
            {loading ? (
              <>
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
