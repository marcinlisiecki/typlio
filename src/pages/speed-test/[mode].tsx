import React, { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { SpeedTestService } from 'services/api/speed-test';
import { generateText } from 'lib/typing/generator';
import { SPEED_TEST_MODES } from 'lib/constants';
import { parseApiErrors } from 'lib/errors';
import useTyping from 'hooks/useTyping';

import TypingDisplayText from 'components/molecules/TypingDisplayText';
import SpeedTestResults from 'components/molecules/SpeedTestResults';
import MainTemplate from 'components/templates/MainTemplate';
import TypingStats from 'components/molecules/TypingStats';
import Alert from 'components/molecules/Alert';

interface OwnProps {}
type Props = OwnProps;

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
    if (
      typeof mode !== 'string' ||
      SPEED_TEST_MODES.findIndex((item) => item.name === mode) === -1
    ) {
      router.push('/speed-test').then();
      return;
    }

    const numberOfWords = mode.includes('w') ? parseInt(mode) : 500;
    const text = generateText(numberOfWords);

    setGeneratedText(text);
    resetTyping(text, mode);
  }, [router]);

  if (typeof mode !== 'string' || SPEED_TEST_MODES.findIndex((item) => item.name === mode) === -1)
    return <div />;

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

  const modeLabel: any =
    SPEED_TEST_MODES[SPEED_TEST_MODES.findIndex((item) => item.name === mode)]?.label || '';

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
