import React, { FunctionComponent } from 'react';

import SettingsSidebar from 'components/molecules/SettingsSidebar';
import MainTemplate from 'components/templates/MainTemplate';
import PageHeading from 'components/molecules/PageHeading';

interface OwnProps {}
type Props = OwnProps;

const UserPrivacySettings: FunctionComponent<Props> = () => {
  return (
    <MainTemplate title={'Settings'}>
      <PageHeading>Settings</PageHeading>

      <section className={'flex pt-fromHeader gap-x-8'}>
        <SettingsSidebar />
        <section>Privacy</section>
      </section>
    </MainTemplate>
  );
};

export default UserPrivacySettings;
