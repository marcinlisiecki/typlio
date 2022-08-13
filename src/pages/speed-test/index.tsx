import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import { SPEED_TEST_MODES } from 'lib/constants';

import MainTemplate from 'components/templates/MainTemplate';

interface OwnProps {}
type Props = OwnProps;

const SelectSpeedTestModePage: FunctionComponent<Props> = () => {
  return (
    <MainTemplate title={'Select mode'}>
      <div className={'pt-10'}>
        <p className={'text-sm font-semibold text-text-tertiary tracking-widest font-mono'}>
          SPEED TEST
        </p>
        <h1 className={'font-bold text-2xl pt-1'}>Choose the mode</h1>
      </div>
      <div className={'flex flex-wrap gap-10 mt-10 justify-start'}>
        {SPEED_TEST_MODES.map(({ label, name, description }) => (
          <Link href={`/speed-test/${name}`} key={name}>
            <a>
              <div
                className={
                  'border-2 border-gray-900 rounded-lg p-4 text-white shadow-xl w-56 h-56 flex flex-col items-center justify-center transition transform hover:scale-[1.04] hover:border-primary-500 cursor-pointer'
                }
              >
                <p className={'text-lg text-center font-bold mb-4'}>{label}</p>
                <p className={'text-sm text-center text-text-tertiary font-medium'}>
                  {description}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </MainTemplate>
  );
};

export default SelectSpeedTestModePage;
