/** @format */
import { OnboardPatientPropType, QueryProps } from "@/types";
import { FormInput, FormSelect, FormTextArea } from "./form_input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Mutation from "@/api/mutation";
import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNotifier } from "@/hooks/useNotifier";
import { UploadSingle } from "./upload";
import checker from "@/assets/checker.svg";

const OnboardPatientForm = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [allergies, setAllergies] = useState<string[]>([""]);
  const [userPhoto, setUserPhoto] = useState<Record<string, string | null>>({
    photo: userData?.photo || checker,
  });
  console.log(userData.id);

  const [formData, setFormData] = useState<OnboardPatientPropType>({
    doctor_id: userData.id.toString(),
    role: "patient",
    email: "",
    password: "",
    fullname: "",
    country_code: "+234",
    country: "Nigeria",
    gender: "male",
    address: "",
    phone: "",
    username: "",
    allergies: [],
    family_history: "",
    social_history: "",
    sogical_history: "",
    photo: "",
  });

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `doctor/create_patient`,
      content: { ...formData, allergies, photo: userPhoto.photo },
    };

    console.log(data);

    mutation.mutate(data);
    if (mutation.isSuccess) {
      showNotifier({
        title: "Success",
        text: "Patient was successfully added!",
        status: "success",
      });
    } else {
      showNotifier({
        title: "Error",
        text: "Failed to add patient. Please try again later.",
        status: "error",
      });
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAllergy = () => {
    setAllergies([...allergies, ""]);
  };

  const handleAllergyChange = (index: number, value: string) => {
    const updatedAllergies = [...allergies];
    updatedAllergies[index] = value;
    setAllergies(updatedAllergies);
  };

  const queryParamsArray: QueryProps = [
    {
      id: "doctors",
      url: "doctors",
      method: "post",
      payload: { user_id: userData?.id },
    },
  ];

  const { queries } = Query(queryParamsArray);

  useEffect(() => {
    if (queries[0].data?.status && queries[0].data.data?.length > 0) {
      const data = queries[0].data.data.map((item: any) => ({
        id: item.id,
        name: item.fullname || item.username,
      }));
      setFormData((prevData) => ({
        ...prevData,
        doctor_id: data[0]?.id || "",
      }));
    }
  }, []);

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-start items-center gap-1'>
        <div>
          <UploadSingle
            defaultPhoto={userPhoto.photo}
            updatePhotoFunction={setUserPhoto}
          />
        </div>
        <div className='w-full'>
          <div className='flex gap-2'>
            <FormInput
              type='text'
              name='fullname'
              label='Full Name'
              value={formData.fullname}
              changeFunction={handleFormChange}
            />
            <FormInput
              type='email'
              name='email'
              label='Email'
              value={formData.email}
              changeFunction={handleFormChange}
            />
          </div>
          <div className='flex gap-2 mt-3'>
            <FormInput
              type='password'
              name='password'
              label='Password'
              value={formData.password}
              changeFunction={handleFormChange}
            />
            <FormInput
              type='text'
              name='phone'
              label='Phone number'
              value={formData.phone}
              changeFunction={handleFormChange}
            />
          </div>
          <div className='flex gap-2 mt-3'>
            <FormInput
              type='text'
              name='username'
              label='Username'
              value={formData.username}
              changeFunction={handleFormChange}
            />
            <FormSelect
              options={["male", "female"]}
              name='gender'
              value={formData.gender}
              label='Gender'
              changeFunction={handleFormChange}
            />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='address'
          value={formData.address}
          label='Address'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        {allergies.map((allergy, index) => (
          <div key={index} className='flex gap-2 mt-2'>
            <FormInput
              type='text'
              name={`allergy_${index}`}
              label={`Allergy ${index + 1}`}
              value={allergy}
              changeFunction={(e) => handleAllergyChange(index, e.target.value)}
            />
          </div>
        ))}
        <Button className='mt-2' onClick={handleAddAllergy}>
          Add Another Allergy
        </Button>
      </div>
      <div className='mt-4'>
        <FormTextArea
          name='family_history'
          value={formData.family_history}
          label='Family History'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormTextArea
          name='social_history'
          value={formData.social_history}
          label='Social History'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormTextArea
          name='sogical_history'
          value={formData.sogical_history}
          label='Surgical History'
          changeFunction={handleFormChange}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}
        disabled={mutation.isPending}>
        {mutation.isPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Saving
          </>
        ) : (
          "Onboard Patient"
        )}
      </Button>

      {NotifierComponent}
    </div>
  );
};

export { OnboardPatientForm };
