import React, { FunctionComponent } from 'react';

interface OwnProps {
  children?: React.ReactNode;
  htmlFor?: string;

  customStyles?: string;
}

type Props = OwnProps;

const Label: FunctionComponent<Props> = ({ children, htmlFor, customStyles }) => {
  return (
    <label
      className={`text-gray-300 inline-block mb-[6px] ml-1 text-sm ${customStyles}`}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
