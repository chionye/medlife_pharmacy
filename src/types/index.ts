/** @format */

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
  child?: React.ReactNode;
  items?: DropdownOption[];
  onClick?: () => void;
}

export interface DynamicDropdownProps {
  label: string;
  icon?: any;
  cn?: string;
  options: DropdownOption[];
  value?: string;
  showArrow?: boolean;
  dropdownType?: string | null;
  changeFunction?: (e: string) => void;
  openChange?: (open: boolean) => void;
  dropDownClickFn?: (e: any) => void;
}

export interface FullModalPropType {
  children: React.ReactNode;
  title?: string;
  label?: string;
  btnTitle?: string;
  cn?: string;
  icon?: React.ReactNode;
  footer?: boolean;
  overlayClose?: boolean;
  scrollBehavior?: "inside" | "outside";
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
  disabled?: boolean;
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
  disabled?: boolean;
  changeFunction: (e: any) => void;
}

export interface FormTextAreaPropType {
  label: string;
  name: string;
  value: string;
  cn?: string;
  disabled?: boolean;
  changeFunction: (e: any) => void;
}

export interface FormPinPropType {
  label: string;
  value: string;
  changeFunction: any;
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

export interface ResetPasswordPropType {
  email: string;
}

export interface ChangePasswordPropType {
  email: string;
  password: string;
  new_password: string;
}

export interface OTPPropType {
  email: string;
  otp: string;
}

export interface LoginPropType {
  email: string;
  password: string;
}

export interface TopDoctorsPropType {
  username: string;
  fullname?: string;
  phone?: string;
  gender?: string;
  specialization?: string;
  email?: string;
  rating?: string;
  dob?: string;
  created_at?: string;
  photo?: string;
  key?: number;
  reviews?: number;
  id?: number;
  patient_id?: number;
  allergies?: string[];
  family_history?: string;
  social_history?: string;
  sogical_history?: string;
  certifications?: string[];
  languages?: string[];
  clinic_affiliation?: string;
  years_of_experience?: string;
}

export interface MedicationHistoryPropType {
  medicine_name: string;
  dosage: string;
  frequency: string;
  note: string;
}

export interface DoctorPropType {
  fullname: string;
  username: string;
  specialization: string;
}

export interface AppointmentHistoryPropType {
  doctor: DoctorPropType;
  appointment_date: string;
  appointment_time: string;
  type: string;
  status?: string;
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
  link?: string;
}

export interface TablePropType {
  thead: string[];
  tbody?: any;
  keys: string[];
  role?: string;
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

export interface AppointmentDetailsPropType {
  title: string;
  description: string;
  type: string;
  appointment_id: string;
  appointment_time: string;
  appointment_date: string;
  link: string;
}

export interface User {
  id: number;
  user_id: string;
  fullname: string;
  balance: number;
  email: string;
  username: string;
  phone: string;
  country_code: string;
  country: string;
  gender: string;
  address: string;
  specialization: string;
  verification_code: string | null;
  email_verified: number;
  status: string;
  role: string;
  created_by: string;
  rating: string;
  dob: string;
  consultation_amount: string;
  role_id: string;
  email_verified_at: string | null;
  weight: string;
  height: string;
  blood_pressure: string;
  glucose_level: string;
  photo: string;
  created_at: string;
  updated_at: string;
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

export interface NotificationPropType {
  title: string;
  message: string;
  timestamp: string;
}

export interface NotificationCardPropType {
  notifications: NotificationPropType[];
}

export interface WebsiteSettingsPropType {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  about_us: string;
  password: string;
  created_at: string | null;
  updated_at: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PrescriptionFormProps {
  user_id:string;
  prescribed_by: string;
  medicine_name:string;
  dosage:string;
  frequency:string;
  start_date:string;
  note:string;
}