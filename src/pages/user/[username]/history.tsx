import React, { FunctionComponent } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import { NextPageContext } from 'next';
import { prisma } from 'lib/db/prisma';

interface IHistory {
  cpm: number;
  accuracy: number;
  mode: string;
  id: string;
  createdAt: Date;
}

interface OwnProps {
  history: IHistory[] | null;
  status: number;
}

type Props = OwnProps;

const UserHistoryPage: FunctionComponent<Props> = ({ history, status }) => {
  if (!history) {
    return (
      <MainTemplate title={'History not found :('}>
        <div className={'mx-auto py-[20vh] text-center'}>
          <h1 className={'text-4xl font-bold'}>404</h1>
          <h2 className={'mt-4 text-text-secondary font-medium'}>
            Whoops... I can&apos;t find the user&apos;s history :(
          </h2>
        </div>
      </MainTemplate>
    );
  }

  return (
    <MainTemplate title={'History'}>
      <section className={'pt-10 mb-10'}>
        <h1 className={'font-bold text-2xl'}>History</h1>
      </section>
      <section className={'flex gap-x-12'}>
        <section className={'flex-1'}>Filters</section>
        <section className={'bg-light border border-gray-900 rounded-lg p-5 shadow-xl flex-[4]'}>
          {history.map(({ id, mode, createdAt, cpm, accuracy }, index) => (
            <div key={id} className={`${index > 0 && 'border-t border-t-gray-900/80 pt-4 mt-4'}`}>
              <div className={'flex justify-between'}>
                <div className={'flex gap-x-4'}>
                  <p className={'text-sm text-text-tertiary/90 font-medium'}>ID {id}</p>
                  <p className={'text-sm text-text-tertiary/90 font-medium'}>{mode}</p>
                </div>
                <div>
                  <p className={'text-sm text-text-tertiary/90 font-medium'}>
                    {new Date(createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={'flex gap-x-6 mt-5'}>
                <p className={'font-medium'}>
                  {(cpm / 5).toFixed(1)}{' '}
                  <span className={'text-text-tertiary text-sm font-semibold'}>WPM</span>
                </p>
                <p className={'font-medium'}>
                  {cpm} <span className={'text-text-tertiary text-sm font-semibold'}>CPM</span>
                </p>
                <p className={'font-medium'}>
                  {accuracy.toFixed(2)}%{' '}
                  <span className={'text-text-tertiary text-sm font-semibold'}>Accuracy</span>
                </p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </MainTemplate>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const username = context.query.username as string;
  if (!username) {
    return { props: { history: null, status: 404 } };
  }

  const history = await prisma.speedTest.findMany({
    where: { user: { username } },
    select: {
      cpm: true,
      accuracy: true,
      mode: true,
      id: true,
      createdAt: true,
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return { props: { history: JSON.parse(JSON.stringify(history)), status: 200 } };
};

export default UserHistoryPage;
