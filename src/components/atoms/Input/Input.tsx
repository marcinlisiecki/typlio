import React, { FormEvent, forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

interface OwnProps {
  name?: string;
  id?: string;
  type?: string;
  placeholder?: string;

  value?: string | number | readonly string[] | undefined;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;

  error?: string;

  customStyles?: string;
}

type Props = OwnProps;

const Input = forwardRef<any, Props>(
  ({ id, customStyles, name, type, placeholder, value, onChange, error }, ref) => {
    const [showContent, setShowContent] = useState<boolean>(false);

    const Icon = showContent ? EyeOffIcon : EyeIcon;

    return (
      <>
        <div className={'relative'}>
          <input
            ref={ref}
            name={name}
            id={id}
            type={type === 'password' ? (showContent ? 'text' : 'password') : type}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 bg-light rounded-lg text-sm text-text-primary focus:border-primary-500 focus:ring resize-none transition outline-none border-2 border-transparent hover:border-gray-800 ${
              error && '!border-danger-500 !ring-danger-500/50'
            } ${customStyles}`}
            placeholder={placeholder}
          />
          {type === 'password' && (
            <div className={'absolute top-1/2 transform -translate-y-1/2 right-3'}>
              <Icon
                onClick={() => setShowContent((prev: boolean) => !prev)}
                className={'w-5 h-5 fill-gray-500 cursor-pointer hover:fill-gray-200 transition'}
              />
            </div>
          )}
        </div>
        {error && <p className={'mt-1 ml-1 text-danger-500 text-sm'}>{error}</p>}
      </>
    );
  }
);

Input.displayName = 'Input';

export default Input;
