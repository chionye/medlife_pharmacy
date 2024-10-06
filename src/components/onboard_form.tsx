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
import { Plus } from "lucide-react";
import { Badge } from "./ui/badge";
const OnboardPatientForm = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [allergies, setAllergies] = useState<string[]>([""]);
  const [userPhoto, setUserPhoto] = useState<Record<string, string | null>>({
    photo: userData?.photo || checker,
  });

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

    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status) {
          showNotifier({
            title: "Success",
            text: "Patient was successfully added!",
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
          showNotifier({
            title: "Error",
            text: errorMessage,
            status: "error",
          });
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
        doctor_id: data[0]?.id.toString() || "",
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

const OnboardDoctorForm = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;

  // Initial states
  const [certifications, setCertifications] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [formInput, setFormInput] = useState({
    certification: "",
    language: "",
    specialization: "",
  });

  const [userPhoto, setUserPhoto] = useState<Record<string, string | null>>({
    photo: userData?.photo || "",
  });

  const [formData, setFormData] = useState({
    admin_id: userData.id,
    role: "doctor",
    email: "",
    clinic_affiliation: "",
    years_of_experience: "",
    dob: "",
    password: "",
    fullname: "",
    country_code: "+234",
    country: "Nigeria",
    gender: "male",
    address: "",
    phone: "",
    username: "",
    photo: "",
  });

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `website/settings`,
      content: {
        ...formData,
        certifications,
        languages,
        specialization,
        photo: userPhoto.photo,
      },
    };
    console.log(data);

    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status) {
          showNotifier({
            title: "Success",
            text: "Doctor was successfully added!",
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
          showNotifier({
            title: "Error",
            text: errorMessage,
            status: "error",
          });
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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle array input updates
  const handleAddArrayItem = (
    field: "certification" | "language" | "specialization"
  ) => {
    const inputValue = formInput[field];
    if (inputValue.trim() === "") return;

    switch (field) {
      case "certification":
        setCertifications([...certifications, inputValue]);
        break;
      case "language":
        setLanguages([...languages, inputValue]);
        break;
      case "specialization":
        setSpecialization([...specialization, inputValue]);
        break;
      default:
        break;
    }

    setFormInput({ ...formInput, [field]: "" });
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    switch (field) {
      case "certification":
        setCertifications(certifications.filter((_, i) => i !== index));
        break;
      case "language":
        setLanguages(languages.filter((_, i) => i !== index));
        break;
      case "specialization":
        setSpecialization(specialization.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  return (
    <div className='mt-10 w-full'>
      {/* Upload and basic form */}
      <div className='flex justify-start items-center gap-1'>
        <div>
          <UploadSingle
            defaultPhoto={userPhoto.photo || checker}
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
              label='username'
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
          <div className='flex gap-2 mt-3'>
            <FormInput
              type='date'
              name='dob'
              label='dob'
              value={formData.dob}
              changeFunction={handleFormChange}
            />
            <FormInput
              type='number'
              name='years_of_experience'
              label='years_of_experience'
              value={formData.years_of_experience}
              changeFunction={handleFormChange}
            />
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <FormInput
          type='text'
          name='clinic_affiliation'
          label='clinic_affiliation'
          value={formData.clinic_affiliation}
          changeFunction={handleFormChange}
        />
      </div>
      {/* Certifications */}
      <div className='mt-4'>
        <div className='flex gap-2 items-end'>
          <FormInput
            type='text'
            name='certification'
            label='Certifications'
            value={formInput.certification}
            changeFunction={(e) =>
              setFormInput({ ...formInput, certification: e.target.value })
            }
          />
          <Button
            onClick={() => handleAddArrayItem("certification")}
            className='mb-2'>
            <Plus color='#ffffff' />
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {certifications.map((item, index) => (
            <Badge variant='outline'>
              <span key={index} className='flex gap-3'>
                <span>{item}</span>
                <span
                  className='badge-remove cursor-pointer'
                  onClick={() => handleRemoveArrayItem("certification", index)}>
                  x
                </span>
              </span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className='mt-4'>
        <div className='flex gap-2 items-end'>
          <FormInput
            type='text'
            name='language'
            label='Languages'
            value={formInput.language}
            changeFunction={(e) =>
              setFormInput({ ...formInput, language: e.target.value })
            }
          />
          <Button
            onClick={() => handleAddArrayItem("language")}
            className='mb-2'>
            <Plus color='#ffffff' />
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {languages.map((item, index) => (
            <Badge variant='outline'>
              <span key={index} className='flex gap-3'>
                <span>{item}</span>
                <span
                  className='badge-remove'
                  onClick={() => handleRemoveArrayItem("language", index)}>
                  x
                </span>
              </span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Specialization */}
      <div className='mt-4'>
        <div className='flex gap-2 items-end'>
          <FormInput
            type='text'
            name='specialization'
            label='Specialization'
            value={formInput.specialization}
            changeFunction={(e) =>
              setFormInput({ ...formInput, specialization: e.target.value })
            }
          />
          <Button
            onClick={() => handleAddArrayItem("specialization")}
            className='mb-2'>
            <Plus color='#ffffff' />
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {specialization.map((item, index) => (
            <Badge variant='outline'>
              <span key={index} className='flex gap-3'>
                <span>{item}</span>
                <span
                  className='badge-remove'
                  onClick={() =>
                    handleRemoveArrayItem("specialization", index)
                  }>
                  x
                </span>
              </span>
            </Badge>
          ))}
        </div>
      </div>
      {/* Submit Button */}
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
          "Onboard Doctor"
        )}
      </Button>

      {NotifierComponent}
    </div>
  );
};

const EditDoctorForm = ({ doctor }: { doctor: any }) => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;

  // Initial states
  const [certifications, setCertifications] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [formInput, setFormInput] = useState({
    certification: "",
    language: "",
    specialization: "",
  });

  const [userPhoto, setUserPhoto] = useState<Record<string, string | null>>({
    photo: userData?.photo || "",
  });

  const [formData, setFormData] = useState({
    admin_id: userData.id,
    role: "doctor",
    email: doctor.email || "",
    clinic_affiliation: doctor.clinic_affiliation,
    years_of_experience: doctor.years_of_experience,
    dob: doctor.dob,
    password: doctor.password,
    fullname: doctor.fullname,
    country_code: doctor.country_code,
    country: doctor.country,
    gender: doctor.gender || "male",
    address: doctor.address,
    phone: doctor.phone,
    username: doctor.username,
    photo: doctor.photo,
  });

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `website/settings`,
      content: {
        ...formData,
        certifications,
        languages,
        specialization,
        photo: userPhoto.photo,
      },
    };
    console.log(data);

    mutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status) {
          showNotifier({
            title: "Success",
            text: "Doctor was successfully updated!",
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
          showNotifier({
            title: "Error",
            text: errorMessage,
            status: "error",
          });
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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle array input updates
  const handleAddArrayItem = (
    field: "certification" | "language" | "specialization"
  ) => {
    const inputValue = formInput[field];
    if (inputValue.trim() === "") return;

    switch (field) {
      case "certification":
        setCertifications([...certifications, inputValue]);
        break;
      case "language":
        setLanguages([...languages, inputValue]);
        break;
      case "specialization":
        setSpecialization([...specialization, inputValue]);
        break;
      default:
        break;
    }

    setFormInput({ ...formInput, [field]: "" });
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    switch (field) {
      case "certification":
        setCertifications(certifications.filter((_, i) => i !== index));
        break;
      case "language":
        setLanguages(languages.filter((_, i) => i !== index));
        break;
      case "specialization":
        setSpecialization(specialization.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  return (
    <div className='mt-10 w-full'>
      {/* Upload and basic form */}
      <div className='flex justify-start items-center gap-1'>
        <div>
          <UploadSingle
            defaultPhoto={userPhoto.photo || checker}
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
              label='username'
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
          <div className='flex gap-2 mt-3'>
            <FormInput
              type='date'
              name='dob'
              label='dob'
              value={formData.dob}
              changeFunction={handleFormChange}
            />
            <FormInput
              type='number'
              name='years_of_experience'
              label='years_of_experience'
              value={formData.years_of_experience}
              changeFunction={handleFormChange}
            />
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <FormInput
          type='text'
          name='clinic_affiliation'
          label='clinic_affiliation'
          value={formData.clinic_affiliation}
          changeFunction={handleFormChange}
        />
      </div>
      {/* Certifications */}
      <div className='mt-4'>
        <div className='flex gap-2 items-end'>
          <FormInput
            type='text'
            name='certification'
            label='Certifications'
            value={formInput.certification}
            changeFunction={(e) =>
              setFormInput({ ...formInput, certification: e.target.value })
            }
          />
          <Button
            onClick={() => handleAddArrayItem("certification")}
            className='mb-2'>
            <Plus color='#ffffff' />
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {certifications.map((item, index) => (
            <Badge variant='outline'>
              <span key={index} className='flex gap-3'>
                <span>{item}</span>
                <span
                  className='badge-remove cursor-pointer'
                  onClick={() => handleRemoveArrayItem("certification", index)}>
                  x
                </span>
              </span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className='mt-4'>
        <div className='flex gap-2 items-end'>
          <FormInput
            type='text'
            name='language'
            label='Languages'
            value={formInput.language}
            changeFunction={(e) =>
              setFormInput({ ...formInput, language: e.target.value })
            }
          />
          <Button
            onClick={() => handleAddArrayItem("language")}
            className='mb-2'>
            <Plus color='#ffffff' />
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {languages.map((item, index) => (
            <Badge variant='outline'>
              <span key={index} className='flex gap-3'>
                <span>{item}</span>
                <span
                  className='badge-remove'
                  onClick={() => handleRemoveArrayItem("language", index)}>
                  x
                </span>
              </span>
            </Badge>
          ))}
        </div>
      </div>

      {/* Specialization */}
      <div className='mt-4'>
        <div className='flex gap-2 items-end'>
          <FormInput
            type='text'
            name='specialization'
            label='Specialization'
            value={formInput.specialization}
            changeFunction={(e) =>
              setFormInput({ ...formInput, specialization: e.target.value })
            }
          />
          <Button
            onClick={() => handleAddArrayItem("specialization")}
            className='mb-2'>
            <Plus color='#ffffff' />
          </Button>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {specialization.map((item, index) => (
            <Badge variant='outline'>
              <span key={index} className='flex gap-3'>
                <span>{item}</span>
                <span
                  className='badge-remove'
                  onClick={() =>
                    handleRemoveArrayItem("specialization", index)
                  }>
                  x
                </span>
              </span>
            </Badge>
          ))}
        </div>
      </div>
      {/* Submit Button */}
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
          "Onboard Doctor"
        )}
      </Button>

      {NotifierComponent}
    </div>
  );
};

export { OnboardPatientForm, OnboardDoctorForm, EditDoctorForm };
