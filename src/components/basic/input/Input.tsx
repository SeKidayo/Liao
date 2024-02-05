'use client';

import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputProps {
  label: string;
  // key: string; // 千万不要使用key, key是react内置的属性值,这里会导致获取不到真正的key值
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    id,
    type = "text",
    required = false,
    register,
    errors,
    disabled,
  } = props;

  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          text-sm
          font-medium
          leading-6
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          className={clsx(`
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6`, errors[id] && `focus:ring-rase-500`,
            disabled && `opacity-50 cursor-default`
          )}
          {...register(id, { required })}
        />
      </div>
    </div>
  )
}

export default Input;
