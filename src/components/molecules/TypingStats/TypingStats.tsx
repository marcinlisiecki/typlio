import React, { FunctionComponent } from 'react';

interface OwnProps {
  stats: {
    cpm: number;
    accuracy: number;
  };
  time: number;
}

type Props = OwnProps;

const TypingStats: FunctionComponent<Props> = ({ stats, time }) => {
  return (
    <div className={'font-mono font-bold'}>
      <h2 className={'text-text-primary text-lg tracking-wide'}>STATISTICS</h2>
      <div className={'mt-4'}>
        <p>
          {time} <span className={'text-text-tertiary'}>seconds</span>
        </p>
        <p>
          {stats.cpm || 0} <span className={'text-text-tertiary'}>cpm</span>
        </p>
        <p>
          {Math.round(stats.cpm / 5) || 0} <span className={'text-text-tertiary'}>wpm</span>
        </p>
        <p>
          {stats.accuracy || 100}% <span className={'text-text-tertiary'}>accuracy</span>
        </p>
      </div>
    </div>
  );
};

export default TypingStats;
