import React, { FunctionComponent } from 'react';

import SettingsSidebar from 'components/molecules/SettingsSidebar';
import MainTemplate from 'components/templates/MainTemplate';
import PageHeading from 'components/molecules/PageHeading';

interface OwnProps {}
type Props = OwnProps;

const UserProfileSettings: FunctionComponent<Props> = () => {
  return (
    <MainTemplate title={'Settings'}>
      <PageHeading steps={['SETTINGS', 'PROFILE']}>Settings</PageHeading>

      <section className={'flex pt-fromHeader gap-x-8'}>
        <SettingsSidebar />
        <section>Profile</section>
      </section>
    </MainTemplate>
  );
};

export default UserProfileSettings;
