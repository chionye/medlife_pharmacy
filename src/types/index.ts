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
  placeholder?:string;
  changeFunction: () => void;
}

export interface FormSelectPropType {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  options: string[];
  changeFunction: () => void;
}

export interface TitleBarPropType {
  title: string;
  link: string;
}

export interface TablePropType {
  thead: string[];
  tbody: Record<string, string>[];
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