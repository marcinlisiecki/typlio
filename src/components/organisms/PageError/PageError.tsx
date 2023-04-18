import React, { FunctionComponent } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import PageLink from 'components/atoms/PageLink';
import { ExclamationIcon } from '@heroicons/react/outline';

interface OwnProps {
  status: number;
}

type Props = OwnProps;

const statusToMessage = {
  404: "We couldn't find the page you're looking for",
  500: 'Unexpected server error occurred',
};

const PageError: FunctionComponent<Props> = ({ status }) => {
  // @ts-ignore
  const message: string = statusToMessage[status] || 'Something went wrong...';

  return (
    <MainTemplate title={`${status}`}>
      <div className={'h-[calc(100vh-240px)] flex items-center justify-center flex-col'}>
        <ExclamationIcon className={'w-10 h-10 mb-4 stroke-warning-500'} />
        <h1 className={'text-xl font-medium'}>{message}</h1>
        <p className={'text-sm mt-2 text-text-secondary font-medium'}>
          Return to <PageLink href={'/'}>Home Page</PageLink>
        </p>
        <h2 className={'text-9xl font-semibold text-gray-800/75 mt-10'}>{status}</h2>
      </div>
    </MainTemplate>
  );
};

export default PageError;
