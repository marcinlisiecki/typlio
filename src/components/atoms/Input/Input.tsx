import React, { FormEvent, forwardRef } from 'react';

interface OwnProps {
  name?: string;
  id?: string;
  type?: string;
  placeholder?: string;

  value?: string | number | readonly string[] | undefined;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;

  customStyles?: string;
}

type Props = OwnProps;

const Input = forwardRef<any, Props>(
  ({ id, customStyles, name, type, placeholder, value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        name={name}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-light rounded-lg text-sm text-text-primary focus:border-primary-500 focus:ring resize-none transition outline-none border-2 border-transparent hover:border-gray-800 ${customStyles}`}
        placeholder={placeholder}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
