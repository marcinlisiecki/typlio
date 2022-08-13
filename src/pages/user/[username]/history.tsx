import React, { FormEvent, FunctionComponent, useState } from 'react';
import { NextPageContext } from 'next';

import { SPEED_TEST_MODES } from 'lib/constants';
import { useRouter } from 'next/router';
import { prisma } from 'lib/db/prisma';

import UserHistoryItem from 'components/molecules/UserHistoryItem';
import MainTemplate from 'components/templates/MainTemplate';
import PageError from 'components/organisms/PageError';
import Checkbox from 'components/atoms/Checkbox';
import PageLink from 'components/atoms/PageLink';
import Select from 'components/atoms/Select';
import Label from 'components/atoms/Label';

interface OwnProps {
  history: IHistory[] | null;
  status: number;
}

type SortBy = 'newest' | 'oldest' | 'fastest' | 'slowest' | 'best-accuracy' | 'worst-accuracy';

type Props = OwnProps;

const UserHistoryPage: FunctionComponent<Props> = ({ history, status }) => {
  const [showModes, setShowModes] = useState<string[]>(SPEED_TEST_MODES.map((mode) => mode.name));
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  const { username } = useRouter().query;

  if (!history || status !== 200) {
    return <PageError status={status} />;
  }

  const handleToggleMode = (e: FormEvent<HTMLInputElement>) => {
    const mode: string = (e.target as HTMLInputElement).name;

    if (showModes.includes(mode)) setShowModes((prev) => prev.filter((item) => item !== mode));
    else setShowModes((prev) => [...prev, mode]);
  };

  const handleChangeSorting = (e: FormEvent<HTMLSelectElement>) => {
    const newSortBy = (e.target as HTMLSelectElement).value as SortBy;
    setSortBy(newSortBy);
  };

  const filteredHistory = history.filter((item: IHistory) => showModes.includes(item.mode));
  const sortedHistory = filteredHistory.sort((a: IHistory, b: IHistory) => {
    if (sortBy === 'newest')
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    else if (sortBy === 'oldest')
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    else if (sortBy === 'fastest') return new Date(b.cpm).getTime() - new Date(a.cpm).getTime();
    else if (sortBy === 'slowest') return new Date(a.cpm).getTime() - new Date(b.cpm).getTime();
    else if (sortBy === 'best-accuracy')
      return new Date(b.accuracy).getTime() - new Date(a.accuracy).getTime();
    else if (sortBy === 'worst-accuracy')
      return new Date(a.accuracy).getTime() - new Date(b.accuracy).getTime();

    return 1;
  });

  return (
    <MainTemplate title={'History'}>
      <section className={'pt-10 mb-10'}>
        <PageLink href={`/user/${username}`}>{username}</PageLink>
        <h1 className={'font-bold text-2xl'}>History</h1>
      </section>
      <section className={'flex gap-x-12 items-start'}>
        <section className={'flex-1'}>
          <div className={'flex flex-col'}>
            <Label htmlFor={'sort'}>Sort by</Label>
            <Select id={'sort'} value={sortBy} onChange={handleChangeSorting}>
              <option value={'newest'}>Newest</option>
              <option value={'oldest'}>Oldest</option>
              <option value={'fastest'}>Fastest</option>
              <option value={'slowest'}>Slowest</option>
              <option value={'best-accuracy'}>Best accuracy</option>
              <option value={'worst-accuracy'}>Worst accuracy</option>
            </Select>
          </div>

          <div className={'mt-8'}>
            <p className={'text-gray-300 mb-[6px] ml-1 text-sm'}>Mode</p>
            <div className={'flex flex-col gap-y-1'}>
              {SPEED_TEST_MODES.map(({ label, name }) => (
                <Checkbox
                  key={name}
                  onClick={handleToggleMode}
                  label={label}
                  id={name}
                  name={name}
                  checked={showModes.includes(name)}
                />
              ))}
            </div>
          </div>
        </section>
        <section className={'bg-light border border-gray-900 rounded-lg p-5 shadow-xl flex-[4]'}>
          {sortedHistory.map((item, index) => (
            <UserHistoryItem history={item} index={index} key={item.id} />
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

  try {
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
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
    if (!history) {
      return { props: { history: null, status: 404 } };
    }

    return { props: { history: JSON.parse(JSON.stringify(history)), status: 200 } };
  } catch (err) {
    return { props: { history: null, status: 500 } };
  }
};

export default UserHistoryPage;
