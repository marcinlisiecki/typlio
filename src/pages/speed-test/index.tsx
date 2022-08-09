import React, { FunctionComponent } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import Link from 'next/link';

interface OwnProps {}

type Props = OwnProps;

const modes = [
  {
    slug: '10w',
    label: '10 WORDS',
    content: 'Zawiera tekst składający się z 10 losowych słów, nie zawiera ograniczenia czasowego',
  },
  {
    slug: '50w',
    label: '50 WORDS',
    content: 'Zawiera tekst składający się z 50 losowych słów, nie zawiera ograniczenia czasowego',
  },
  {
    slug: '100w',
    label: '100 WORDS',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet ultrices accumsan.',
  },
  {
    slug: '200w',
    label: '200 WORDS',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet ultrices accumsan.',
  },
  {
    slug: '0.5m',
    label: '30 SECONDS',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet ultrices accumsan.',
  },
  {
    slug: '1m',
    label: '1 MINUTE',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet ultrices accumsan.',
  },
  {
    slug: '2m',
    label: '2 MINUTES',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet ultrices accumsan.',
  },
];

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
        {modes.map(({ label, slug, content }) => (
          <Link href={`/speed-test/${slug}`} key={slug}>
            <a>
              <div
                className={
                  'border-2 border-gray-900 rounded-lg p-4 text-white shadow-xl w-56 h-56 flex flex-col items-center justify-center transition transform hover:scale-[1.04] hover:border-primary-500 cursor-pointer'
                }
              >
                <p className={'text-lg text-center font-bold mb-4'}>{label}</p>
                <p className={'text-sm text-center text-text-tertiary font-medium'}>{content}</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </MainTemplate>
  );
};

export default SelectSpeedTestModePage;
