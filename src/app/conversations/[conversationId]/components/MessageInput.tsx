"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>,
  errors: FieldValues
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  required,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder}
        autoComplete="off"
        className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-sky-500
        "
      />
    </div>
  )
}

export default MessageInput;
