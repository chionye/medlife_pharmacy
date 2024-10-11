/** @format */

import { useEffect, useState } from "react";
import { FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { SubscriptionPropType, SubscriptioPlansProp } from "@/types";
import { getCookie } from "@/services/storage";
import { useNotifier } from "@/hooks/useNotifier";
import Mutation from "@/api/mutation";
import { useNavigate } from "react-router-dom";

const SubscriptionForm = ({ plans }: { plans: SubscriptioPlansProp[] }) => {
  const subscription_plans: SubscriptioPlansProp[] = plans;
  const navigate = useNavigate();
  const { showNotifier, NotifierComponent } = useNotifier();
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [formData, setFormData] = useState<SubscriptionPropType>({
    user_id: userData.id,
    plan_id: "",
    plan_name: subscription_plans[0]?.name || "", // Store selected plan name
  });

  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `plan/subscribe`,
      content: {
        user_id: formData.user_id.toString(),
        plan_id: formData.plan_id.toString(),
      },
    };
    mutation.mutate(data, {
      onSuccess: (data) => {
        if (data.status) {
          showNotifier({
            title: "Success",
            text: `You have successfully subscribed to ${formData.plan_name} plan`,
            status: "success",
          });
        } else if (data.error || data.errors || data.message) {
          const errorMessage = data.message
            ? data.message
            : data.error
            ? data.error
            : Array.isArray(data.errors)
            ? data.errors.join("\n")
            : data.errors;
          if (errorMessage === "Insufficient balance") {
            showNotifier({
              title: "Error",
              text: "Insufficient balance to subscribe to this plan, please fund your account to continue",
              status: "error",
              button: true,
              confirmText: "Fund",
              cancelText: "Cancel",
              confirmFunction: () => {
                navigate("/patient/wallet/fund-wallet");
              },
            });
          } else {
            showNotifier({
              title: "Error",
              text: errorMessage,
              status: "error",
            });
          }
        }
      },
      onError: (error) => {
        console.log("Error submitting data:", error);
        showNotifier({
          title: "Error",
          text: "There was an error submitting your data. Please try again.",
          status: "error",
        });
      },
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;
    setFormData({
      ...formData,
      plan_id: selectedValue,
      plan_name: selectedText,
    });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      plan_id: subscription_plans[0]?.id || "",
    });
  }, [plans]);

  return (
    <div className='mt-2 w-full'>
      <div className='mt-4'>
        <FormSelect
          value={formData.plan_id}
          options={subscription_plans}
          name='gateway'
          label=''
          changeFunction={handleFormChange}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        Subscribe
      </Button>
      {NotifierComponent}
    </div>
  );
};

export default SubscriptionForm;
