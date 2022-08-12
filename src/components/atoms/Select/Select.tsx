import React, { FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  children?: ReactNode;
  id?: string;
}

type Props = OwnProps;

const Select: FunctionComponent<Props> = ({ children, id }) => {
  return (
    <select
      id={id}
      className={
        'form-select bg-light border border-gray-900 rounded-md px-4 py-3 text-sm outline-none focus:ring focus:border-primary-500 transition shadow-md'
      }
    >
      {children}
    </select>
  );
};

export default Select;
