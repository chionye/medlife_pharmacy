/** @format */

import {
  AppointmentPropType,
  QueryProps,
} from "@/types";
import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { appointment_type_options } from "@/utils/forms/selectitems";
import Mutation from "@/api/mutation";
import { getCookie } from "@/services/storage";
import Query from "@/api/query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNotifier } from "@/hooks/useNotifier";

const BookAppointmentForm = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [doctors, setDoctors] = useState<any>([]);
  const [formData, setFormData] = useState<AppointmentPropType>({
    title: "",
    link: "",
    description: "",
    type: "none",
    doctor_id: "",
    patient_id: userData?.id,
    appointment_date: "",
    appointment_time: "",
  });

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `appointment/create`,
      content: formData,
    };
    mutation.mutate(data);
    if (mutation.isSuccess) {
      showNotifier({
        title: "Success",
        text: "Your appointment was successfully booked!",
        status: "success",
      });
    }else{
      showNotifier({
        title: "Error",
        text: "Failed to book appointment. Please try again later.",
        status: "error",
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
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
      setDoctors(data);
      setFormData(() => {
        return {
          ...formData,
          doctor_id: data[0].id,
        };
      });
    }
  }, []);

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-between gap-3'>
        <FormInput
          type='text'
          name='title'
          label='Title'
          value={formData.title}
          changeFunction={handleFormChange}
        />
        <FormSelect
          options={doctors}
          name='doctor_id'
          value={formData.doctor_id}
          label='Doctor'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='link'
          label='Meeting Link'
          value={formData.link}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='description'
          value={formData.description}
          label='Brief Detail of the Appointment'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormSelect
          options={appointment_type_options}
          name='type'
          value={formData.type}
          label='Appointment Type (Optional)'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4 flex justify-between gap-3'>
        <FormInput
          type='date'
          name='appointment_date'
          value={formData.appointment_date}
          label='Appointment Date'
          changeFunction={handleFormChange}
        />
        <FormInput
          type='time'
          name='appointment_time'
          value={formData.appointment_time}
          label='Appointment Time'
          changeFunction={handleFormChange}
        />
      </div>
      {/* <div className='mt-4'>
        <Upload
          uploadType='inline'
          tag='Upload  Document (Optional)'
          id='attachment'
        />
      </div>
      <div className='mt-4'>
        <Upload
          uploadType='inline'
          tag='Upload more Documents'
          id='attachment'
          icon={plus}
        />
      </div> */}
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        {mutation.isPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Saving
          </>
        ) : (
          "Book Appointment"
        )}
      </Button>
      {NotifierComponent}
    </div>
  );
};

const CreateAppointmentForm = () => {
  const user = getCookie("@user");
  const userData = user ? JSON.parse(user) : null;
  const [doctors, setDoctors] = useState<any>([]);
  const [formData, setFormData] = useState<AppointmentPropType>({
    title: "",
    link: "",
    description: "",
    type: "none",
    doctor_id: "",
    patient_id: userData?.id,
    appointment_date: "",
    appointment_time: "",
  });

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `appointment/create`,
      content: formData,
    };
    mutation.mutate(data);
    if (mutation.isSuccess) {
      showNotifier({
        title: "Success",
        text: "Your appointment was successfully booked!",
        status: "success",
      });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
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
      setDoctors(data);
      setFormData(() => {
        return {
          ...formData,
          doctor_id: data[0].id,
        };
      });
    }
  }, []);

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-between gap-3'>
        <FormInput
          type='text'
          name='title'
          label='Title'
          value={formData.title}
          changeFunction={handleFormChange}
        />
        <FormSelect
          options={doctors}
          name='doctor_id'
          value={formData.doctor_id}
          label='Doctor'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='link'
          label='Meeting Link'
          value={formData.link}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='description'
          value={formData.description}
          label='Brief Detail of the Appointment'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormSelect
          options={appointment_type_options}
          name='type'
          value={formData.type}
          label='Appointment Type (Optional)'
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4 flex justify-between gap-3'>
        <FormInput
          type='date'
          name='appointment_date'
          value={formData.appointment_date}
          label='Appointment Date'
          changeFunction={handleFormChange}
        />
        <FormInput
          type='time'
          name='appointment_time'
          value={formData.appointment_time}
          label='Appointment Time'
          changeFunction={handleFormChange}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        {mutation.isPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Saving
          </>
        ) : (
          "Create Appointment"
        )}
      </Button>
      {NotifierComponent}
    </div>
  );
};

export { BookAppointmentForm, CreateAppointmentForm };
