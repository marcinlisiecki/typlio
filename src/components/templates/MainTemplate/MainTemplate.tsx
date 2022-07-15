import React, { FunctionComponent, ReactNode } from 'react';
import PageTemplate from 'components/templates/PageTemplate';

interface OwnProps {
  title: string;
  children: ReactNode;
  customStyles?: string;
}

type Props = OwnProps;

const MainTemplate: FunctionComponent<Props> = ({ title, children, customStyles }) => {
  return (
    <PageTemplate title={title}>
      <main className={`max-w-page mx-auto px-page ${customStyles}`}>{children}</main>
    </PageTemplate>
  );
};

export default MainTemplate;
