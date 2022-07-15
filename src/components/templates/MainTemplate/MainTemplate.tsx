import React, { FunctionComponent, ReactNode } from 'react';
import PageTemplate from 'components/templates/PageTemplate';
import Header from 'components/organisms/Header';

interface OwnProps {
  title: string;
  children: ReactNode;
  customStyles?: string;

  withHeader?: boolean;
}

type Props = OwnProps;

const MainTemplate: FunctionComponent<Props> = ({
  title,
  children,
  customStyles,
  withHeader = true,
}) => {
  return (
    <PageTemplate title={title}>
      {withHeader && <Header />}

      <main className={`max-w-page mx-auto px-page ${customStyles}`}>{children}</main>
    </PageTemplate>
  );
};

export default MainTemplate;
