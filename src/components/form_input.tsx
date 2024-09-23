/** @format */

import {
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Label } from "./ui/label";
import { Select } from "@chakra-ui/react";
import {
  FormInputPropType,
  FormPinPropType,
  FormSelectPropType,
  FormTextAreaPropType,
} from "@/types";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

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
        {options.map((option: any, index: number) => (
          <option key={index} value={option.id ? option.id : option}>
            {option.name ? option.name : option}
          </option>
        ))}
      </Select>
    </div>
  );
};

const FormTextArea: React.FC<FormTextAreaPropType> = ({
  label,
  name,
  value,
  cn,
  changeFunction,
}) => {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name} className='text-sm font-normal'>
        {label}
      </Label>
      <Textarea
        className={cn}
        name={name}
        size={"lg"}
        onChange={changeFunction}>
        {value}
      </Textarea>
    </div>
  );
};

const FormPinInput: React.FC<FormPinPropType> = ({
  label,
  value,
  changeFunction,
}) => {
  return (
    <div>
      <Label className='text-sm font-normal'>{label}</Label>
      <div className='space-y-2'>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => changeFunction(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className='p-7' />
            <InputOTPSlot index={1} className='p-7' />
            <InputOTPSlot index={2} className='p-7' />
            <InputOTPSlot index={3} className='p-7' />
            <InputOTPSlot index={4} className='p-7' />
            <InputOTPSlot index={5} className='p-7' />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};

export { FormInput, FormSelect, FormTextArea, FormPinInput };
