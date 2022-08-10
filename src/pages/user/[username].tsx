import React, { FunctionComponent } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import { GetServerSidePropsContext } from 'next';
import { prisma } from 'lib/db/prisma';
import { User } from 'next-auth';
import Button from 'components/atoms/Button';

interface IUserProfile {
  username: string;
  id: string;
}

interface OwnProps {
  user: IUserProfile | null;
}

type Props = OwnProps;

const UserProfilePage: FunctionComponent<Props> = ({ user }) => {
  if (!user) {
    return <MainTemplate title={'404'}>User not found :(</MainTemplate>;
  }

  return (
    <MainTemplate title={'User profile page'}>
      <section className={'flex justify-between pt-10'}>
        <div className={'flex gap-x-8 items-center'}>
          <div className={'bg-gray-900 w-28 h-28 rounded-full'} />
          <div className={'flex flex-col justify-between h-full py-2'}>
            <div>
              <p className={'text-xl font-bold'}>{user.username}</p>
              <p className={'text-text-tertiary/75 text-sm font-medium'}>#{user.id}</p>
            </div>

            <div className={'flex gap-x-6 text-sm font-medium'}>
              <p>
                51 <span className={'text-gray-400'}>Followers</span>
              </p>
              <p>
                12 <span className={'text-gray-400'}>Following</span>
              </p>
            </div>
          </div>
        </div>

        <div className={'flex gap-x-4 items-start'}>
          <Button variant={'secondary'}>Add Friend</Button>
          <Button variant={'secondary'}>Follow</Button>
        </div>
      </section>
    </MainTemplate>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const username = context.query.username as string;
  if (!username) {
    return { props: { user: null, status: 404 } };
  }

  const user = await prisma.user.findFirst({
    where: { username },
    select: { username: true, id: true },
  });

  return { props: { user: JSON.parse(JSON.stringify(user)), status: 200 } };
};

export default UserProfilePage;
