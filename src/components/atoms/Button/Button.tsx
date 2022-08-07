import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';

interface OwnProps {
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;

  customStyles?: string;
}

type Props = OwnProps;

const Button: FunctionComponent<Props> = ({ children, customStyles, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm bg-primary-600 text-text-primary px-4 py-3 rounded-lg font-medium transition hover:bg-primary-700 active:scale-[0.98] transform ${customStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
