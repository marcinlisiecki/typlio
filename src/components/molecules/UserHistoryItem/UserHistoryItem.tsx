import React, { FunctionComponent } from 'react';

interface OwnProps {
  history: IHistory;
  index: number;
}

type Props = OwnProps;

const UserHistoryItem: FunctionComponent<Props> = ({ history, index }) => {
  return (
    <div className={`${index > 0 ? 'border-t border-t-gray-900/80 pt-4 mt-4' : ''}`}>
      <div className={'flex justify-between'}>
        <div className={'flex gap-x-4'}>
          <p className={'text-sm text-text-tertiary/90 font-medium'}>ID {history.id}</p>
          <p className={'text-sm text-text-tertiary/90 font-medium'}>{history.mode}</p>
        </div>
        <div>
          <p className={'text-sm text-text-tertiary/90 font-medium'}>
            {new Date(history.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className={'flex gap-x-6 mt-5'}>
        <p className={'font-medium'}>
          {(history.cpm / 5).toFixed(1)}{' '}
          <span className={'text-text-tertiary text-sm font-semibold'}>WPM</span>
        </p>
        <p className={'font-medium'}>
          {history.cpm} <span className={'text-text-tertiary text-sm font-semibold'}>CPM</span>
        </p>
        <p className={'font-medium'}>
          {history.accuracy.toFixed(2)}%{' '}
          <span className={'text-text-tertiary text-sm font-semibold'}>Accuracy</span>
        </p>
      </div>
    </div>
  );
};

export default UserHistoryItem;
