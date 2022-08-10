import React, { FunctionComponent } from 'react';
import {
  FastForwardIcon,
  RefreshIcon,
  ShareIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';

import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(Filler);

import { useSession } from 'next-auth/react';

import IconButton from 'components/atoms/IconButton';
import PageLink from 'components/atoms/PageLink';
import Alert from 'components/molecules/Alert';
import { useRouter } from 'next/router';
import LoadingSpinner from 'components/atoms/LoadingSpinner';
import { getErrorMessage } from 'lib/errors';

interface OwnProps {
  stats: {
    cpm: number;
    accuracy: number;
    wpmHistory: number[];
  };
  time: number;

  handleNewText: () => void;
  handleRepeatSame: () => void;

  isLoading: boolean;
  isSuccess: boolean;
  errors: IApiError[];
}

type Props = OwnProps;

const SpeedTestResults: FunctionComponent<Props> = ({
  stats,
  time,
  handleNewText,
  handleRepeatSame,
  isSuccess,
  isLoading,
  errors,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const { mode } = router.query;
  const displayTime = mode?.includes('w') ? time : parseFloat(mode as string) * 60;

  return (
    <div className={'flex items-start mt-20 gap-x-24'}>
      <div className={'max-w-screen-md flex-[2]'}>
        <div className={'flex justify-between'}>
          <div className={'flex items-end gap-x-2'}>
            <p className={'text-4xl text-primary-500 font-semibold'}>{Math.round(stats.cpm / 5)}</p>
            <p className={'text-text-secondary font-bold font-mono tracking-wide'}>WPM</p>
          </div>

          <div className={'flex items-end gap-x-2'}>
            <p className={'text-4xl text-primary-500 font-semibold'}>{stats.cpm}</p>
            <p className={'text-text-secondary font-bold font-mono tracking-wide'}>CPM</p>
          </div>

          <div className={'flex items-end gap-x-2'}>
            <p className={'text-4xl text-primary-500 font-semibold'}>{stats.accuracy}%</p>
            <p className={'text-text-secondary font-bold font-mono tracking-wide'}>ACCURACY</p>
          </div>

          <div className={'flex items-end gap-x-2'}>
            <p className={'text-4xl text-primary-500 font-semibold'}>{displayTime}s</p>
            <p className={'text-text-secondary font-bold font-mono tracking-wide'}>TIME</p>
          </div>
        </div>

        <div
          className={
            'relative w-full h-52 mt-8 font-medium text-text-secondary flex items-center justify-center'
          }
        >
          <Line
            data={{
              labels: [...stats.wpmHistory.map((_, index) => index + 1)],
              datasets: [
                {
                  label: 'wpm',
                  data: stats.wpmHistory,
                  borderColor: 'rgba(14, 165, 233, .4)',
                  backgroundColor: 'rgba(14, 165, 233, .03)',
                  fill: true,
                  tension: 0.3,
                  pointBackgroundColor: '#0ea5e9',
                  pointRadius: 3,
                  borderWidth: 3,
                },
              ],
            }}
            options={{
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false,
                },
                legend: {
                  display: false,
                  labels: {
                    font: {
                      size: 20,
                    },
                  },
                },
              },
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  grid: {
                    display: true,
                    borderColor: '#0f172a',
                    color: 'rgba(15, 23, 42, .35)',
                  },
                  beginAtZero: true,
                  ticks: {
                    color: '#334155',
                    font: {
                      size: 14,
                      family: 'Ubuntu mono',
                      weight: 'bold',
                    },
                  },
                },
                x: {
                  title: {
                    text: 'Seconds',
                  },
                  grid: {
                    display: true,
                    borderColor: '#0f172a',
                    color: 'rgba(15, 23, 42, .35)',
                  },
                  ticks: {
                    color: '#334155',
                    font: {
                      size: 14,
                      family: 'Ubuntu mono',
                      weight: 'bold',
                    },
                  },
                },
              },
            }}
          />
        </div>

        <div className={'flex gap-x-5 mt-4'}>
          <IconButton icon={FastForwardIcon} onClick={handleNewText} helpText={'Next speed test'} />
          <IconButton icon={RefreshIcon} onClick={handleRepeatSame} helpText={'Repeat same'} />
          <IconButton
            icon={SwitchHorizontalIcon}
            onClick={() => router.push('/speed-test')}
            helpText={'Change mode'}
          />
          {/*<IconButton icon={ShareIcon} onClick={() => {}} helpText={'Share'} />*/}
        </div>
      </div>

      <div className={'w-[1px] h-[280px] bg-gray-900'} />

      <div className={'flex-1'}>
        <div className={'text-sm font-medium flex flex-col gap-y-4'}>
          <div>
            <p className={'text-text-tertiary font-mono font-bold tracking-wider'}>MODE</p>
            <p>50 Words</p>
          </div>

          <div>
            <p className={'text-text-tertiary font-mono font-bold tracking-wider'}>LANGUAGE</p>
            <p>English</p>
          </div>

          <div>
            <p className={'text-text-tertiary font-mono font-bold tracking-wider'}>ID</p>
            <p>jfds929kdsfopovjdasu</p>
          </div>
        </div>

        {!session && (
          <Alert variant={'info'}>
            <PageLink href={'/login'} customStyles={'!underline'}>
              login
            </PageLink>{' '}
            to save the results
          </Alert>
        )}

        <div className={'mt-8'}>
          {isLoading && (
            <p className={'flex items-start text-sm text-gray-500 font-medium '}>
              <LoadingSpinner wrapperStyles={'scale-[0.8]'} />
              Saving results
            </p>
          )}
          {isSuccess && (
            <p className={'text-sm text-success-500 font-medium flex items-start gap-x-2'}>
              <CheckCircleIcon className={'w-5 h-5 -ml-1.5 stroke-success-500'} />
              Results saved
            </p>
          )}
          {errors.length > 0 && (
            <p className={'text-sm text-danger-500 font-medium flex items-start gap-x-2'}>
              <XCircleIcon className={'w-5 h-5 -ml-1.5 stroke-danger-500 shrink-0'} />
              {getErrorMessage(errors, null)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeedTestResults;
