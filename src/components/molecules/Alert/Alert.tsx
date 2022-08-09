import React, { FunctionComponent, ReactNode } from 'react';
import { InformationCircleIcon } from '@heroicons/react/outline';

interface OwnProps {
  variant: 'info' | 'warning' | 'danger' | 'success';
  children?: ReactNode;
}

type Props = OwnProps;

const Alert: FunctionComponent<Props> = ({ variant, children }) => {
  const wrapperStyles =
    variant === 'info'
      ? 'bg-primary-500/5 border-primary-500/25'
      : variant === 'warning'
      ? 'bg-warning-500/5 border-warning-500/25'
      : variant === 'danger'
      ? 'bg-danger-500/5 border-danger-500/25'
      : 'bg-success-500/5 border-success-500/25';

  const iconStyles =
    variant === 'info'
      ? 'stroke-primary-500'
      : variant === 'warning'
      ? 'stroke-warning-500'
      : variant === 'danger'
      ? 'stroke-danger-500'
      : 'stroke-success-500';

  const paragraphStyles =
    variant === 'info'
      ? 'text-primary-500'
      : variant === 'warning'
      ? 'text-warning-500'
      : variant === 'danger'
      ? 'text-danger-500'
      : 'text-success-500';

  return (
    <div
      className={`mt-8 text-sm font-sans font-medium rounded-md border-2 p-3 w-full flex gap-x-3 ${wrapperStyles}`}
    >
      <InformationCircleIcon className={`w-[20px] h-[20px] ${iconStyles}`} />
      <p className={paragraphStyles}>{children}</p>
    </div>
  );
};

export default Alert;
