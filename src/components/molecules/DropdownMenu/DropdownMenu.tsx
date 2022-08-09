import React, { FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  children?: ReactNode;

  customWrapperStyles?: string;
  customContentStyles?: string;
}

type Props = OwnProps;

const DropdownMenu: FunctionComponent<Props> = ({
  children,
  customContentStyles,
  customWrapperStyles,
}) => {
  return (
    <div
      className={`z-[1000] w-40 absolute top-4 right-0 transform -translate-y-2 group-hover:translate-y-0 opacity-0 transition pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 ${customWrapperStyles}`}
    >
      <div
        className={`bg-dark w-full h-full mt-4 rounded-md border border-gray-900 shadow-xl ${customContentStyles}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownMenu;
