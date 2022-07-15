import React, { FunctionComponent } from 'react';
import Link from 'next/link';

interface OwnProps {
  isClickable?: boolean;
}
type Props = OwnProps;

const Logo: FunctionComponent<Props> = ({ isClickable = true }) => {
  return (
    <Link href={isClickable ? '/' : ''}>
      <a
        className={`font-bold text-2xl flex items-center ${
          isClickable ? 'cursor-pointer' : 'cursor-default'
        }`}
      >
        Typl<span className={'text-primary-500'}>io</span>
        <div
          className={'px-2.5 py-1 bg-primary-600 text-white text-xs rounded-full ml-2 font-medium'}
        >
          beta
        </div>
      </a>
    </Link>
  );
};

export default Logo;
