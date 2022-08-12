import React, { FormEvent, FunctionComponent } from 'react';
import Label from 'components/atoms/Label';

interface OwnProps {
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  onClick?: (e: FormEvent<HTMLInputElement>) => void;

  customWrapperStyles?: string;
}

type Props = OwnProps;

const Checkbox: FunctionComponent<Props> = ({
  id,
  name,
  label,
  customWrapperStyles,
  checked,
  onClick,
}) => {
  return (
    <div className={`flex gap-x-1 ${customWrapperStyles}`}>
      <input
        onClick={onClick}
        checked={checked}
        type={'checkbox'}
        id={id}
        name={name}
        className={
          'form-checkbox border-gray-900 rounded-md bg-light w-5 h-5 transition !ring-offset-0 !ring-0 cursor-pointer'
        }
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
};

export default Checkbox;
