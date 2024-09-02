
import { Input } from "@chakra-ui/react";
import { Label } from "./ui/label";
import { Select } from "@chakra-ui/react";
import { FormInputPropType, FormSelectPropType } from "@/types";

const FormInput: React.FC<FormInputPropType> = ({
  label,
  type,
  name,
  placeholder,
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
        className='border-[#D9D9D9]'
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
        onChange={changeFunction}
        value={value}
        size='lg'>
        {options.map((option: string) => (
          <option value={option}>{option}</option>
        ))}
      </Select>
    </div>
  );
};

export { FormInput, FormSelect };
