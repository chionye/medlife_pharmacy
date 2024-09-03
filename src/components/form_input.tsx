/** @format */

import { Input } from "@chakra-ui/react";
import { Label } from "./ui/label";
import { Select } from "@chakra-ui/react";
import { FormInputPropType, FormSelectPropType } from "@/types";

const FormInput: React.FC<FormInputPropType> = ({
  label,
  type,
  name,
  placeholder,
  value,
  cn = "border-[#D9D9D9]",
  changeFunction,
}) => {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name} className='text-sm font-normal'>
        {label}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        className={cn}
        value={value}
        placeholder={placeholder}
        onChange={changeFunction}
        size={"lg"}
      />
    </div>
  );
};

const FormSelect: React.FC<FormSelectPropType> = ({
  label,
  name,
  placeholder,
  value,
  cn,
  options,
  changeFunction,
}) => {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name} className='text-sm font-normal'>
        {label}
      </Label>
      <Select
        placeholder={placeholder}
        className={cn}
        name={name}
        onChange={changeFunction as React.ChangeEventHandler<HTMLSelectElement>}
        value={value}
        size='lg'>
        {options.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

export { FormInput, FormSelect };
