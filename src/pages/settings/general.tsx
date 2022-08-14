import React, { FunctionComponent } from 'react';

import SettingsSidebar from 'components/molecules/SettingsSidebar';
import MainTemplate from 'components/templates/MainTemplate';
import PageHeading from 'components/molecules/PageHeading';
import Button from 'components/atoms/Button';
import Label from 'components/atoms/Label';
import Input from 'components/atoms/Input';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'lib/db/prisma';
import PageError from 'components/organisms/PageError';

interface OwnProps {
  user: IUser | null;
  status: number;
}
type Props = OwnProps;

const UserGeneralSettings: FunctionComponent<Props> = ({ user, status }) => {
  if (!user || status !== 200) {
    return <PageError status={status} />;
  }

  return (
    <MainTemplate title={'Settings'}>
      <PageHeading steps={['SETTINGS', 'GENERAL']}>Settings</PageHeading>

      <section className={'flex pt-fromHeader gap-x-8'}>
        <SettingsSidebar />
        <section className={'flex flex-col gap-y-12 w-[600px] mb-20'}>
          <section>
            <h1 className={'mb-4 font-semibold text-text-secondary'}>Profile picture</h1>
            <div className={'flex gap-x-8 items-center'}>
              <div className={'bg-gray-900 rounded-full w-20 h-20'} />
              <Button variant={'secondary'}>Change photo</Button>
              <Button variant={'secondary'} customStyles={'-ml-3'}>
                Delete photo
              </Button>
            </div>
          </section>

          <section>
            <h1 className={'mb-4 font-semibold text-text-secondary'}>User info</h1>

            <div className={'flex gap-x-4 w-full'}>
              <div className={'flex-1'}>
                <Label htmlFor={'username'}>Username</Label>
                <Input
                  name={'username'}
                  id={'username'}
                  value={user.username}
                  placeholder={'John'}
                />
              </div>

              <div className={'flex-1'}>
                <Label htmlFor={'email'}>Email Address</Label>
                <Input
                  name={'email'}
                  type={'email'}
                  id={'email'}
                  value={user.email}
                  placeholder={'John'}
                />
              </div>
            </div>

            <Button customStyles={'mt-4'} isDisabled>
              Save
            </Button>
          </section>

          <section>
            <h1 className={'mb-4 font-semibold text-text-secondary'}>Password</h1>

            <div className={'flex gap-x-4 w-full'}>
              <div className={'flex-1'}>
                <Label htmlFor={'old-password'}>Old Password</Label>
                <Input
                  name={'old-password'}
                  id={'old-password'}
                  type={'password'}
                  placeholder={'********'}
                />
              </div>

              <div className={'flex-1'}>
                <Label htmlFor={'new-password'}>New Password</Label>
                <Input
                  name={'new-password'}
                  type={'password'}
                  id={'new-password'}
                  placeholder={'********'}
                />
              </div>
            </div>

            <Button customStyles={'mt-4'} isDisabled>
              Change
            </Button>
          </section>

          <section>
            <h1 className={'mb-4 font-semibold text-text-secondary'}>Manage Account</h1>
            <Button color={'danger'}>Delete Account</Button>
          </section>
        </section>
      </section>
    </MainTemplate>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession({ req: context.req });
  if (!session || !session?.user?.id) {
    return { props: { user: null, status: 403 } };
  }

  const user = await prisma.user.findFirst({ where: { id: session.user.id as string } });
  if (!user) {
    return { props: { user: null, status: 403 } };
  }

  return { props: { user: JSON.parse(JSON.stringify(user)), status: 200 } };
};

export default UserGeneralSettings;
