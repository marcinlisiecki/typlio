import React, { FunctionComponent, ReactNode } from 'react';

interface OwnProps {
  steps?: string[];
  children?: ReactNode;

  withTopPadding?: boolean;
}

type Props = OwnProps;

const PageHeading: FunctionComponent<Props> = ({ steps, children, withTopPadding = true }) => {
  return (
    <div className={`${withTopPadding ? 'pt-fromHeader' : ''}`}>
      <p className={'text-sm text-gray-500 font-bold font-mono tracking-widest'}>
        {steps?.map((step, index) => (
          <span key={step} className={'text-gray-500'}>
            {step} {index < steps?.length - 1 && '> '}
          </span>
        ))}
      </p>
      <h1 className={'text-2xl font-bold mt-2'}>{children}</h1>
    </div>
  );
};

export default PageHeading;
