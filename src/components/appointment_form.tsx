import { FormInput, FormSelect } from "./form_input";
import { Button } from "./ui/button";
import Upload from "./upload";
import plus from "@/assets/plus.svg";

const AppointmentForm = () => {
  const appointment_type_options: string[] = [
    "none",
    "consultation",
    "follow-up",
    "Wellness Exam",
    "Immunization",
    "Mental Health Consultation",
    "Lab Test Results",
    "Pain Management",
    "Pre-operative Evaluation",
    "Dental Check-up",
    "Counseling Session",
    "Therapy Session",
  ];
  return (
    <div className='mt-10 w-full'>
      <div className='flex justify-between gap-3'>
        <FormInput
          type='text'
          name='patients_name'
          label="Patient's Name"
          changeFunction={() => console.log("test")}
        />
        <FormInput
          type='text'
          name='medic'
          label='Medic'
          changeFunction={() => console.log("test")}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='address'
          label='Home Address'
          changeFunction={() => console.log("test")}
        />
      </div>
      <div className='mt-4'>
        <FormInput
          type='text'
          name='appointment_detail'
          label='Brief Detail of the Appointment'
          changeFunction={() => console.log("test")}
        />
      </div>
      <div className='mt-4'>
        <FormSelect
          value='none'
          options={appointment_type_options}
          name='appointment_type'
          label='Appointment Type (Optional)'
          changeFunction={() => console.log("test")}
        />
      </div>
      <div className='mt-4 flex justify-between gap-3'>
        <FormSelect
          value='none'
          options={appointment_type_options}
          name='date'
          label='Select Date'
          changeFunction={() => console.log("test")}
        />
        <FormSelect
          value='none'
          options={appointment_type_options}
          name='time'
          label='Select Preferred Time'
          changeFunction={() => console.log("test")}
        />
      </div>
      <div className='mt-4'>
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
      </div>
      <Button className='bg-[#D20606] w-full mt-6 p-7'>
        Book Appointment
      </Button>
    </div>
  );
}

export default AppointmentForm;