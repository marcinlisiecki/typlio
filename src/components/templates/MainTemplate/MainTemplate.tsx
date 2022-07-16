import React, { FunctionComponent, ReactNode } from 'react';
import PageTemplate from 'components/templates/PageTemplate';
import Header from 'components/organisms/Header';

interface OwnProps {
  title: string;
  children: ReactNode;
  customStyles?: string;

  withHeader?: boolean;
  withHeaderPadding?: boolean;
}

type Props = OwnProps;

const MainTemplate: FunctionComponent<Props> = ({
  title,
  children,
  customStyles,
  withHeader = true,
  withHeaderPadding = true,
}) => {
  return (
    <PageTemplate title={title}>
      {withHeader && <Header />}

      <main
        className={`max-w-page mx-auto px-page ${
          withHeaderPadding && 'mt-[120px]'
        } ${customStyles}`}
      >
        {children}
      </main>
    </PageTemplate>
  );
};

export default MainTemplate;
