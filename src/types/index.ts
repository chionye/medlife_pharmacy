
import { Method } from "axios";
export interface FabPropType {
  icon: string;
  callback: () => void;
}

export interface DropdownPropType {
  label: string;
  cn?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  data?: any;
}

export interface DropdownOption {
  label: string;
  value?: string;
  items?: DropdownOption[];
  onClick?: () => void;
}

export interface DynamicDropdownProps {
  label: string;
  icon?: any;
  cn?: string;
  options: DropdownOption[];
}

export interface FullModalPropType {
  children: React.ReactNode;
  title?: string;
  label?: string;
  btnTitle?: string;
  cn?: string;
  icon?: React.ReactNode;
  footer?: boolean;
}

export interface StarRatingProps {
  label: string;
  onRatingChange: (rating: number) => void;
}

export interface UseNotifierPropType {
  title: string;
  text: string;
  status: string;
  button?: boolean;
  confirmText?: string;
  cancelText?: string;
  isModalOpen?: boolean;
  closeFunction?: (e: boolean) => void;
  confirmFunction?: () => void;
}

export interface NotifierPropType {
  title: string;
  text: string;
  status: string;
  button?: boolean;
  confirmText?: string;
  cancelText?: string;
  isModalOpen: boolean;
  closeFunction: (e: boolean) => void;
  confirmFunction?: () => void;
}

export interface FormInputPropType {
  label: string;
  type: string;
  name: string;
  cn?: string;
  value?: string;
  placeholder?: string;
  changeFunction: (e: any) => void;
}

export interface FormSelectPropType {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  cn?: string;
  options: any;
  changeFunction: (e: any) => void;
}

export interface FormTextAreaPropType {
  label: string;
  name: string;
  value: string;
  cn?: string;
  changeFunction: (e: any) => void;
}

export interface FundingPropType {
  amount: string;
  user_id: string;
  reference: string;
  gateway: string;
  description: string;
}

export interface ConsultationFeePropType {
  consultation_amount: string;
  specialization: string;
}

export interface WithdrawPropType {
  user_id: string;
  acc_number: string;
  acc_name: string;
  bank_name: string;
  amount: string;
}

export interface RegisterPropType {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginPropType {
  email: string;
  password: string;
}

export interface TopDoctorsPropType {
  username: string;
  fullname: string;
  specialization: string;
  rating: string;
  photo: string;
  key: number;
}

export interface MedicationHistoryPropType {
  medicine_name: string;
  dosage: string;
  frequency: string;
  note: string;
}

export interface DoctorPropType {
  fullname: string;
  specialization: string;
}

export interface AppointmentHistoryPropType {
  doctor: DoctorPropType;
  appointment_date: string;
  appointment_time: string;
  type: string;
  description: string;
}

export interface WalletHistoryPropType {
  reference: string;
  gateway: string;
  created_at: string;
  amount: string;
  status: string;
}

export type QueryProps = {
  id: string;
  url: string;
  method: Method;
  payload: Record<string, any> | null;
}[];

export interface PatientPropType {
  title: string;
  icon: string;
  value: string;
  unit: string;
}

export interface TitleBarPropType {
  title: string;
  link: string;
}

export interface TablePropType {
  thead: string[];
  tbody?: any;
  keys: string[];
}

export interface AppointmentPropType {
  title: string;
  description: string;
  appointment_time: string;
  appointment_date: string;
  link: string;
  type: string;
  doctor_id: string;
  patient_id: string;
}

export interface OnboardPatientPropType {
  doctor_id: string;
  role: string;
  email: string;
  password: string;
  fullname: string;
  country_code: string;
  country: string;
  gender: string;
  address: string;
  phone: string;
  username: string;
  allergies: string[];
  family_history: string;
  social_history: string;
  sogical_history: string;
  photo: any;
}

export interface AppointmentFormPropType {
  data: AppointmentPropType;
  changeFunction: (e: any) => void;
}

export interface UploadPropType {
  uploadType?: string;
  tag?: string;
  id?: string;
  icon?: string;
}

export type UserData = {
  [key: string]: any;
};

export type ContextValue = {
  userData?: UserData;
  updateData: (arg0: any) => void;
};
