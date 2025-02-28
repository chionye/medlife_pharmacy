/** @format */

import { FormInput, FormSelect } from "@/components/form_input";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useAxiosRequest from "@/hooks/useAxiosRequest";
import { setCookie } from "@/services/storage";
import { OnboardingPropType } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import chevronLeft from "@/assets/chevron_left.svg";
import Upload from "@/components/upload";
import { formConfig, formConfig2 } from "@/utils/forms/onboarding";

const Onboarding = () => {
  const [formData, setFormData] = useState<OnboardingPropType>({
    cac_number: "",
    owners_name: "",
    home_address: "",
    business_number: "",
    business_location: "",
    bank_name: "",
    account_number: "",
    opening_day: "",
    closing_day: "",
    opening_time: "",
    closing_time: "",
    number_of_employees: "",
    user_id: "",
    business_name: "",
    phone_number: "",
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
      const data = await sendRequest(
        "post",
        "pharmacy/merchant/register_business",
        formData
      );
      if (data.status) {
        const response = data.data;
        setCookie("@user", JSON.stringify(response), 1);
        toast({
          title: "Success",
          description: data.message,
          action: <ToastAction altText='done'>done</ToastAction>,
        });
        navigate(`/`);
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
    <div className='lg:px-10'>
      <Link
        to={"/register"}
        className={"text-lg font-medium flex items-center gap-2"}>
        <img src={chevronLeft} alt='back arrow' />
        Back to Sign Up
      </Link>
      <p className='text-[#D0342C] text-lg font-bold mt-5'>
        To ensure a smooth onboarding experience and avoid any GLITCHES, please
        complete the entire onboarding process once you start.
      </p>
      <div className='flex flex-wrap gap-5 mt-5'>
        {formConfig.map((config: any, index: number) =>
          config.type !== "select" ? (
            <div key={index} className='lg:w-[45%] w-full'>
              <FormInput
                type={config.type}
                name={config.name}
                label={config.label}
                placeholder={config.placeholder}
                cn={
                  "border border-[#DEE0E8] px-[16px] bg-[#F2F2F280] hover:outline-none w-full py-[13px]"
                }
                changeFunction={handleFormChange}
              />
            </div>
          ) : (
            <div className='lg:w-[45%] w-full'>
              <FormSelect
                options={config.options}
                name={config.name as keyof typeof formData}
                value={
                  formData[config.name as keyof typeof formData] ||
                  config.options[0]
                }
                cn={
                  "border border-[#DEE0E8] px-[16px] bg-[#F2F2F280] hover:outline-none w-full py-[13px]"
                }
                label={config.label}
                changeFunction={handleFormChange}
              />
            </div>
          )
        )}
        <div className='lg:w-[45%] w-full'>
          <Upload uploadType='single' tag='Upload Verification ID' />
        </div>
      </div>

      <p className='text-[#050404] text-lg font-bold mt-5'>
        Business Working Days
      </p>

      <div className='flex flex-wrap gap-5 mt-5'>
        {formConfig2.map((config: any, index: number) =>
          config.type !== "select" ? (
            <div key={index} className='lg:w-[45%] w-full'>
              <FormInput
                type={config.type}
                name={config.name}
                label={config.label}
                placeholder={config.placeholder}
                cn={
                  "border border-[#DEE0E8] px-[16px] bg-[#F2F2F280] hover:outline-none w-full py-[13px]"
                }
                changeFunction={handleFormChange}
              />
            </div>
          ) : (
            <div
              className={`${config.width ? "lg:w-full" : "lg:w-[45%]"} w-full`}>
              <FormSelect
                options={config.options}
                name={config.name as keyof typeof formData}
                value={
                  formData[config.name as keyof typeof formData] ||
                  config.options[0]
                }
                cn={
                  "border border-[#DEE0E8] px-[16px] bg-[#F2F2F280] hover:outline-none w-full py-[13px]"
                }
                label={config.label}
                changeFunction={handleFormChange}
              />
            </div>
          )
        )}
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
            "Click to Proceed"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
