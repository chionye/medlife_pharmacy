/** @format */

import banks from "@/data/banks.json";
import days from "@/data/days.json";

export const formConfig = [
  {
    label: "CAC Number",
    type: "text",
    name: "cac_number",
    placeholder: "Enter CAC Number",
  },
  {
    label: "Business Owners Name",
    type: "text",
    name: "owners_name",
    placeholder: "Enter Business Owners Name",
  },
  {
    label: "Name of Business",
    type: "text",
    name: "business_name",
    placeholder: "Enter Business Name",
  },
  {
    label: "Home Address",
    type: "text",
    name: "home_address",
    placeholder: "Enter Home Address",
  },
  {
    label: "Business Phone Number",
    type: "text",
    name: "business_number",
    placeholder: "Enter Business Phone Number",
  },
  {
    label: "Phone Number",
    type: "text",
    name: "phone_number",
    placeholder: "Enter Phone Number",
  },
  {
    label: "Business Location",
    type: "text",
    name: "business_location",
    placeholder: "Enter Business Location",
  },
  {
    label: "Select Bank",
    type: "select",
    name: "bank_name",
    options: banks.data,
  },
  {
    label: "Account Number",
    type: "text",
    name: "account_number",
    placeholder: "Enter Account Number",
  },
];

export const formConfig2 = [
  {
    label: "Days(From)",
    type: "select",
    name: "opening_day",
    options: days.data,
  },
  {
    label: "Days (To)",
    type: "select",
    name: "closing_day",
    options: days.data,
  },
  {
    label: "Opening Time",
    type: "time",
    name: "opening_time",
    placeholder: "Enter Opening Time",
  },
  {
    label: "Closing Time",
    type: "time",
    name: "closing_time",
    placeholder: "Enter Closing Time",
  },
  {
    label: "Number of Employees",
    type: "number",
    name: "number_of_employees",
    placeholder: "Enter Number of Employees",
    width: true,
  },
];

export const formConfig3 = [
  {
    label: "First Name",
    type: "text",
    name: "firstname",
    placeholder: "John Doe",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "johndoe123@gmail.com",
  },
  {
    label: "Role",
    type: "text",
    name: "role",
    placeholder: "Manager",
  },
  {
    label: "New Password",
    type: "password",
    name: "password",
    placeholder: "********",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirm_password",
    placeholder: "********",
  },
];