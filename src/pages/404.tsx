import React, { FunctionComponent } from 'react';
import PageTemplate from 'components/templates/PageTemplate';
import PageError from 'components/organisms/PageError';

interface OwnProps {}

type Props = OwnProps;

const NotFoundPage: FunctionComponent<Props> = () => {
  return (
    <PageTemplate title={'404'}>
      <PageError status={404} />
    </PageTemplate>
  );
};

export default NotFoundPage;
