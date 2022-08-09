import React, { FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  icon: FunctionComponent<any>;
  helpText?: string;
  onClick: (e: any) => void;
}

type Props = OwnProps;

const IconButton: FunctionComponent<Props> = ({ icon: Icon, helpText, onClick }) => {
  return (
    <div className={'group relative'}>
      {helpText && (
        <div
          className={
            'font-medium absolute text-sm border border-gray-900 left-1/2 -top-12 transform -translate-x-1/2 whitespace-nowrap p-1.5 rounded-md text-text-secondary opacity-0 pointer-events-none group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition bg-dark shadow-lg'
          }
        >
          {helpText}
        </div>
      )}

      <Icon
        onClick={onClick}
        className={
          'w-5 h-5 fill-gray-500 hover:fill-white cursor-pointer transform transition hover:-translate-y-0.5'
        }
      />
    </div>
  );
};

export default IconButton;
