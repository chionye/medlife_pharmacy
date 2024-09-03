export interface FabPropType {
    icon: string,
    callback: () => void,
}

export interface DropdownPropType {
  label: string;
  cn?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export interface FullModalPropType {
  children: React.ReactNode;
  title?: string;
  label?: string;
  cn?: string;
  icon?: React.ReactNode;
  footer?: boolean;
}

export interface FormInputPropType {
  label: string;
  type: string;
  name: string;
  cn?: string;
  value?: string;
  placeholder?:string;
  changeFunction: (e: any) => void;
}

export interface FormSelectPropType {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  cn?: string;
  options: string[];
  changeFunction: (e: any) => void;
}

export interface RegisterPropType {
  username: string;
  email: string;
  password: string;
  user_type: string;
}

export interface LoginPropType {
  email: string;
  password: string;
}

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
  tbody?: Record<string, string>[];
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