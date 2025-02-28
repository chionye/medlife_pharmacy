/** @format */

import { FormInput } from "@/components/form_input";
import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import lock from "@/assets/lock.svg";
import eye from "@/assets/view-off.svg";
import { RegisterPropType } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from "@/assets/user-circle.svg";
import phone from "@/assets/phone.svg";
import envelope from "@/assets/mail.svg";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Stepper } from "@/components/stepper";
import OtpInput from "react-otp-input";
import { handleCheckEmail } from "@/services/helpers";
import { ToastAction } from "@/components/ui/toast";
// import { setCookie } from "@/services/storage";
const Register = () => {
  const [formData, setFormData] = useState<RegisterPropType>({
    username: "",
    user_id: "",
    business_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
  });
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [emailError, setEmailError] = useState<string>("");
  const { loading, sendRequest } = useAxiosRequest<any>();

  const steps = ["1", "2", "3"];

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    if (target.name === "email") {
      if (!handleCheckEmail(target.value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [target.name]: target.value,
    }));
  };

  // const handleRegisterMerchant = async () => {
  //   try {
  //     const { business_name, email, phone_number } = formData;
  //     const data = await sendRequest("post", "pharmacy/merchant/create", {
  //       business_name,
  //       email,
  //       phone_number,
  //     });
  //     console.log(data);
  //     if (data.status) {
  //       const response = data.data;
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         user_id: response.user_id,
  //       }));
  //       setCookie("@token", JSON.stringify(response.token), 1);
  //       setCurrentStep(currentStep + 1);
  //     } else {
  //       if (data.error || data.errors || data.message) {
  //         const errorMessage = data.message
  //           ? data.message
  //           : data.error
  //           ? data.error
  //           : Array.isArray(data.errors)
  //           ? data.errors.join("\n")
  //           : data.errors;
  //         toast({
  //           title: "Sorry",
  //           description: errorMessage,
  //           action: <ToastAction altText='done'>done</ToastAction>,
  //         });
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Error occurred during OTP verification:", error.message);
  //   }
  // };

  const handleResendOTP = async () => {
    try {
      const { business_name, email, phone_number } = formData;
      const data = await sendRequest("post", "merchant/create", {
        business_name,
        email,
        phone_number,
      });
      console.log(data);
      if (data.status) {
        setCurrentStep(currentStep + 1);
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
      navigate(`/${data.data.role}/home`);
    } catch (error: any) {
      console.error("Error occurred during OTP verification:", error.message);
    }
  };

  // const handleConfirmOTP = async () => {
  //   try {
  //     const { email } = formData;
  //     const data = await sendRequest("post", "otp/confirm", {
  //       email,
  //       otp,
  //     });
  //     console.log(data);
  //     if (data.status) {
  //       setCurrentStep(currentStep + 1);
  //     } else {
  //       if (data.error || data.errors || data.message) {
  //         const errorMessage = data.message
  //           ? data.message
  //           : data.error
  //           ? data.error
  //           : Array.isArray(data.errors)
  //           ? data.errors.join("\n")
  //           : data.errors;
  //         toast({
  //           title: "Sorry",
  //           description: errorMessage,
  //           action: <ToastAction altText='done'>done</ToastAction>,
  //         });
  //       }
  //     }
  //     navigate(`/${data.data.role}/home`);
  //   } catch (error: any) {
  //     console.error("Error occurred during OTP verification:", error.message);
  //   }
  // };

  // const handleSetPassword = async () => {
  //   try {
  //     const { password, confirm_password, user_id } = formData;
  //     if (password !== confirm_password) {
  //       toast({
  //         title: "Sorry",
  //         description: "Passwords do not match",
  //         action: <ToastAction altText='done'>done</ToastAction>,
  //       });
  //       return;
  //     }
  //     const data = await sendRequest("post", "user/updateAny", {
  //       user_id,
  //       password,
  //     });
  //     if (data.status) {
  //       setCurrentStep(currentStep + 1);
  //     } else {
  //       if (data.error || data.errors || data.message) {
  //         const errorMessage = data.message
  //           ? data.message
  //           : data.error
  //           ? data.error
  //           : Array.isArray(data.errors)
  //           ? data.errors.join("\n")
  //           : data.errors;
  //         toast({
  //           title: "Sorry",
  //           description: errorMessage,
  //           action: <ToastAction altText='done'>done</ToastAction>,
  //         });
  //       }
  //     }
  //     navigate(`/${data.data.role}/home`);
  //   } catch (error: any) {
  //     console.error("Error occurred during OTP verification:", error.message);
  //   }
  // };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // if (currentStep === 0) {
      //   handleRegisterMerchant();
      // }
      // if (currentStep > 0) {
      //   setCurrentStep(currentStep + 1);
      // }
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === steps.length - 1) {
      navigate("/onboarding");
    }
  };

  const stepArray = [
    <>
      <div className='mt-5'>
        <FormInput
          type='text'
          name='business_name'
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
        <p className='text-red-500 text-sm'>{emailError}</p>
      </div>
      <div className='mt-5'>
        <FormInput
          type='text'
          name='phone_number'
          label='Phone Number *'
          placeholder='09087654231'
          icon={<img src={phone} alt='phone image' />}
          cn={"border-b-2 border-b-[#585BA8] px-2 bg-[#F2F2F280]"}
          changeFunction={handleFormChange}
        />
      </div>
    </>,
    <>
      <p className='text-[25px] text-[#1D252D]'>OTP</p>
      <p className='text-lg text-[#45443F]'>
        An activation code has been sent to your email
      </p>
      <div className='mt-5 flex justify-center items-center gap-2'>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderSeparator={<span className='w-5'></span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: 75,
            height: 54,
            border: "1px solid #E8E8E8",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          containerStyle={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <Button
          className='bg-transparent text-lg text-[#585BA8] text-center shadow-none hover:bg-white underline'
          onClick={handleResendOTP}>
          Resend code
        </Button>
      </div>
    </>,
    <>
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
      <div className='mt-5'>
        <FormInput
          type='password'
          name='confirm_password'
          label='Confirm Password'
          placeholder='*****************'
          icon={<img src={lock} alt='lock image' />}
          rightIcon={<img src={eye} alt='eye image' />}
          cn={"border-b-2 border-b-[#585BA8] px-2 bg-[#F2F2F280]"}
          changeFunction={handleFormChange}
        />
      </div>
    </>,
  ];

  return (
    <div className='flex justify-center pb-10'>
      <div className='lg:px-0 px-3 mt-7 lg:w-3/4'>
        <Stepper steps={steps} currentStep={currentStep} />
        {stepArray[currentStep]}
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
            ) : currentStep === steps.length - 1 ? (
              "Register"
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
