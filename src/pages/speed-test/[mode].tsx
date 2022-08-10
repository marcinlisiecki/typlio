import React, { FunctionComponent, useEffect, useState } from 'react';
import MainTemplate from 'components/templates/MainTemplate';
import { useRouter } from 'next/router';
import { generateText } from 'lib/typing/generator';
import useTyping from 'hooks/useTyping';
import TypingDisplayText from 'components/molecules/TypingDisplayText';
import TypingStats from 'components/molecules/TypingStats';
import Alert from 'components/molecules/Alert';
import SpeedTestResults from 'components/molecules/SpeedTestResults';
import { useSession } from 'next-auth/react';
import { parseApiErrors } from 'lib/errors';
import { SpeedTestService } from 'services/api/speed-test';

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
  const { letters, resetTyping, activeLetter, mistakes, stats, time, state } = useTyping({
    text: '',
    onFinish: handleSaveOnFinish,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<IApiError[]>([]);

  const router = useRouter();
  const { data: session } = useSession();

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

  const handleNewText = () => {
    let text = '';

    const numberOfWords = mode.includes('w') ? parseInt(mode) : 500;
    text = generateText(numberOfWords);

    setGeneratedText(text);
    resetTyping(text, mode);
  };

  const handleRepeatSame = () => {
    resetTyping(generatedText, mode);
  };

  async function handleSaveOnFinish() {
    if (!session) return;
    setLoading(true);

    try {
      await SpeedTestService.Save({
        mode: mode as string,
        time,
        mistakes: mistakes.length,
        cpm: stats.cpm,
        accuracy: stats.accuracy,
      });

      setSuccess(true);
    } catch (err: any) {
      setSuccess(false);
      setErrors(parseApiErrors(err));
    }

    setLoading(false);
  }

  // @ts-ignore
  const modeLabel: any = modeSlugToLabel[mode];

  return (
    <MainTemplate title={'Speed test'}>
      {state !== 'FINISHED' ? (
        <>
          <div className={'pt-10'}>
            <p className={'text-sm text-gray-500 font-bold font-mono tracking-widest'}>
              SPEED TEST {'>'} {modeLabel}
            </p>
            <h1 className={'text-2xl font-bold mt-2'}>Type as fast as you can!</h1>
          </div>

          <div className={'flex mt-10 gap-x-24'}>
            <TypingDisplayText activeLetter={activeLetter} letters={letters} mistakes={mistakes} />

            <div className={'flex-1'}>
              <TypingStats stats={stats} time={time} />

              <Alert variant={'info'}>
                You can use <strong className={'text-primary-500'}>ctrl + backspace</strong> to
                erase entire word.
              </Alert>
            </div>
          </div>
        </>
      ) : (
        <div className={'pt-10'}>
          <div>
            <p className={'text-sm text-gray-500 font-bold font-mono tracking-widest'}>
              SPEED TEST {'>'} {modeLabel} {'>'} RESULTS
            </p>
            <h1 className={'text-2xl font-bold mt-2'}>Typing speed test results</h1>
          </div>

          <SpeedTestResults
            stats={stats}
            time={time}
            handleNewText={handleNewText}
            handleRepeatSame={handleRepeatSame}
            isLoading={loading}
            isSuccess={success}
            errors={errors}
          />
        </div>
      )}
    </MainTemplate>
  );
};

export default SpeedTestPage;
