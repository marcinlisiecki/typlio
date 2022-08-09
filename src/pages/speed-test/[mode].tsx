import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import { useRouter } from 'next/router';
import { generateText } from 'lib/typing/generator';
import useTyping from 'hooks/useTyping';
import TypingDisplayText from 'components/molecules/TypingDisplayText';
import TypingStats from 'components/molecules/TypingStats';

interface OwnProps {}

type Props = OwnProps;

const modeSlugToLabel = {
  '10w': '10 WORDS',
  '50w': '50 WORDS',
  '100w': '100 WORDS',
  '200w': '200 WORDS',
  '0.5m': '30 SECONDS',
  '1m': '1 MINUTE',
  '2m': '2 MINUTES',
  '5m': '5 MINUTES',
  custom: 'CUSTOM',
};

const SpeedTestPage: FunctionComponent<Props> = () => {
  const [generatedText, setGeneratedText] = useState<string>('');
  const { letters, resetTyping, activeLetter, mistakes, stats, time } = useTyping({
    text: '',
  });

  const router = useRouter();
  const { mode } = router.query;

  useEffect(() => {
    if (typeof mode !== 'string' || !Object.keys(modeSlugToLabel).includes(mode)) {
      router.push('/speed-test').then();
      return;
    }

    const numberOfWords = mode.includes('w') ? parseInt(mode) : 500;
    const text = generateText(numberOfWords);

    setGeneratedText(text);
    resetTyping(text, mode);
  }, [router]);

  if (typeof mode !== 'string' || !Object.keys(modeSlugToLabel).includes(mode)) return <div />;

  return (
    <MainTemplate title={'Speed test'}>
      <div>
        <p className={'text-sm text-gray-500 font-bold font-mono tracking-widest'}>
          {/* @ts-ignore */}
          SPEED TEST {'>'} {modeSlugToLabel[mode]}
        </p>
        <h1 className={'text-2xl font-bold mt-2'}>Type as fast as you can!</h1>
      </div>

      <div className={'flex mt-10 gap-x-24'}>
        <TypingDisplayText activeLetter={activeLetter} letters={letters} mistakes={mistakes} />
        <div className={'flex-1'}>
          <TypingStats stats={stats} time={time} />
        </div>
      </div>
    </MainTemplate>
  );
};

export default SpeedTestPage;
