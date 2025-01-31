'use client';

import clsx from "clsx";

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    fullWidth,
    onClick,
    secondary,
    danger,
    disabled,
    children,
  } = props;


  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        `,
        disabled && `opacity-50 cursor-default`,
        fullWidth && `w-full`,
        secondary ? `text-gray-900` : `text-white`,
        danger && `bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600`,
        !secondary && !danger && `bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600`
      )}
    >
      {children}
    </button>
  )
}

export default Button;
