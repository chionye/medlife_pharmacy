/** @format */

import {
  AppointmentDetailsPropType,
  AppointmentPropType,
  QueryProps,
} from "@/types";
import { FormInput, FormSelect, FormTextArea } from "./form_input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { appointment_type_options } from "@/utils/forms/selectitems";
import Mutation from "@/api/mutation";
import { getConfigByRole, getCookie } from "@/services/storage";
import Query from "@/api/query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNotifier } from "@/hooks/useNotifier";
import { getDateFormat, toTitleCase } from "@/services/helpers";
import { Label } from "./ui/label";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-date-picker/dist/DatePicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FRONTEND_URL } from "@/constants/api";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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
      if (mutation.data.status) {
        showNotifier({
          title: "Success",
          text: "Your appointment was successfully booked!",
          status: "success",
        });
      } else {
        const errorMessage = Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
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

  const createCallSession = () => {
    const callId = `call-${Math.random().toString(16).substring(2)}`;
    const callLink = `${FRONTEND_URL}/call/${callId}`;

    console.log(callId, formData.patient_id);

    // Post the call session to the backend
    // const data = {
    //   method: "post",
    //   url: `call/create`,
    //   content: {
    //     callId,
    //     doctors_id: formData.doctor_id,
    //     patients_id: formData.patient_id,
    //   },
    // };
    // mutation.mutate(data);

    // Set the generated call link in the form data
    setFormData({
      ...formData,
      link: callLink,
    });
  };

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
      <div className='mt-4 flex items-center gap-3'>
        <FormInput
          type='text'
          name='link'
          label='Meeting Link'
          value={formData.link}
          changeFunction={handleFormChange}
        />
        <Button onClick={createCallSession} className='bg-[#D20606] mt-6'>
          Generate Link
        </Button>
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
      if (mutation.data.status) {
        showNotifier({
          title: "Success",
          text: "Your appointment was successfully created!",
          status: "success",
        });
      } else {
        const errorMessage = Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    } else {
      showNotifier({
        title: "Error",
        text: "Failed to created appointment. Please try again later.",
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

const AppointmentDetails = ({ appointment }: any) => {
  const [formData, setFormData] = useState<AppointmentDetailsPropType>({
    title: appointment.title,
    description: appointment.description,
    type: appointment.type,
    appointment_id: appointment.id,
    appointment_time: appointment.appointment_time,
    appointment_date: appointment.appointment_date,
    link: appointment.link,
  });
  const role = getConfigByRole();

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `appointment/update`,
      content: formData,
    };
    mutation.mutate(data);
    if (mutation.isSuccess) {
      if (mutation.data.status) {
        showNotifier({
          title: "Success",
          text: "Your appointment was successfully updated!",
          status: "success",
        });
      } else {
        const errorMessage = Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    } else {
      showNotifier({
        title: "Error",
        text: "Failed to update appointment. Please try again later.",
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

  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-between'>
        <p className='text-[12px] font-normal'>
          Name: <br />
          {appointment.patient
            ? toTitleCase(
                appointment.patient.fullname || appointment.patient.username
              )
            : "Guest"}
        </p>
        <p className='text-[12px] font-normal'>
          Date of Birth:
          <br /> {getDateFormat(appointment.patient.dob, "date")}
        </p>
        <p className='text-[12px] font-normal'>
          Date and Time:
          <br /> {getDateFormat(appointment.patient.created_at, "date")}
        </p>
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='title'
          label='Appointment Title:'
          value={formData.title}
          changeFunction={handleFormChange}
          disabled={role === "patient"}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='type'
          label='Appointment Type:'
          value={formData.type}
          changeFunction={handleFormChange}
          disabled={role === "patient"}
        />
      </div>
      <div className='mt-4'>
        <FormTextArea
          name='description'
          label='Reason for the Appointment:'
          value={formData.description}
          cn={"h-[600px]"}
          changeFunction={handleFormChange}
          disabled={role === "patient"}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        {mutation.isPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Updating
          </>
        ) : (
          "Update"
        )}
      </Button>
      {NotifierComponent}
    </div>
  );
};

const RescheduleAppointmentForm = ({ appointment }: any) => {
  const [formData, setFormData] = useState<AppointmentDetailsPropType>({
    title: appointment.title,
    description: appointment.description,
    type: appointment.type,
    appointment_id: appointment.id,
    appointment_time: appointment.appointment_time,
    appointment_date: appointment.appointment_date,
    link: appointment.link,
  });
  const [theDate, setTheDate] = useState<Value>(new Date());
  const [theTime, setTheTime] = useState<any>("10:00");

  const { showNotifier, NotifierComponent } = useNotifier();
  const { mutation } = Mutation();

  const handleFormSubmit = () => {
    const data = {
      method: "post",
      url: `appointment/create`,
      content: {
        ...formData,
        appointment_time: theTime,
        appointment_date: theDate,
      },
    };
    mutation.mutate(data);
    if (mutation.isSuccess) {
      if (mutation.data.status) {
        showNotifier({
          title: "Success",
          text: "Your appointment was successfully created!",
          status: "success",
        });
      } else {
        const errorMessage = Array.isArray(mutation.data.errors)
          ? mutation.data.errors.join("\n")
          : mutation.data.errors;
        showNotifier({
          title: "Error",
          text: errorMessage,
          status: "error",
        });
      }
    } else {
      showNotifier({
        title: "Error",
        text: "Failed to created appointment. Please try again later.",
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

  return (
    <div className='mt-10 w-full'>
      <div className='mt-4 flex justify-between gap-2'>
        <div>
          <Label className='text-sm font-normal'>Appointment Date</Label>
          <DatePicker
            onChange={setTheDate}
            value={theDate}
            className={"w-full h-10"}
          />
        </div>
        <div>
          <Label className='text-sm font-normal'>Appointment Time</Label>
          <TimePicker
            onChange={setTheTime}
            value={theTime}
            className={"w-full h-10"}
          />
        </div>
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='title'
          label='Appointment Title:'
          value={formData.title}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='type'
          label='Appointment Type:'
          value={formData.type}
          changeFunction={handleFormChange}
        />
      </div>
      <div className='mt-4'>
        <FormTextArea
          name='description'
          label='Reason for the Appointment:'
          value={formData.description}
          cn={"h-[600px]"}
          changeFunction={handleFormChange}
        />
      </div>
      <Button
        className='bg-[#D20606] w-full mt-6 p-7'
        onClick={handleFormSubmit}>
        {mutation.isPending ? (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            Updating
          </>
        ) : (
          "Update"
        )}
      </Button>
      {NotifierComponent}
    </div>
  );
};

export {
  BookAppointmentForm,
  CreateAppointmentForm,
  AppointmentDetails,
  RescheduleAppointmentForm,
};
