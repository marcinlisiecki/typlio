import React, { FunctionComponent, ReactNode } from 'react';
import Head from 'next/head';

interface OwnProps {
  title: string;
  children?: ReactNode;
}

type Props = OwnProps;

const PageTemplate: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};

export default PageTemplate;
