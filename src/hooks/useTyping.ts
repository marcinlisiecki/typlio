import { useEffect, useState } from 'react';
import { useTimer } from 'use-timer';

interface Props {
  text: string;
  onFinish?: () => void;
}

interface Stats {
  cpm: number;
  accuracy: number;
  wpmHistory: number[];
}

const allowedCharacters = 'abcdefghijklmnopqrstuvwxyz ,.?ąęćśźż-_/1234567890';

const useTyping = ({ text, onFinish }: Props) => {
  const [mode, setMode] = useState<'10w' | '50w' | '100w' | '200w' | '0.5m' | '1m' | '2m'>('10w');

  const [state, setState] = useState<'WAITING' | 'RUNNING' | 'FINISHED'>('WAITING');
  const [activeText, setActiveText] = useState<string>(text);
  const [letters, setLetters] = useState<string[]>(text.split(''));

  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [stats, setStats] = useState<Stats>({
    cpm: 0,
    accuracy: 100,
    wpmHistory: [],
  });

  const { time, start, pause, reset } = useTimer({});

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [activeLetter, mistakes]);

  useEffect(() => {
    if (time === 0) return;

    const cpm = Math.round(((activeLetter - mistakes.length) / time) * 60);
    const accuracy = parseFloat((100 - (mistakes.length / activeLetter) * 100).toFixed(2));

    const wpm = Math.round(cpm / 5);

    const newWpmHistory = stats.wpmHistory;
    newWpmHistory[time - 1] = isNaN(wpm) ? newWpmHistory[time] : Math.round(cpm / 5);

    setStats((prev) => ({
      cpm,
      accuracy,
      wpmHistory: newWpmHistory,
    }));

    checkIfFinish();
  }, [time, state]);

  const handleKeydown = (e: any) => {
    if (state === 'FINISHED') return;

    if (e.key === 'Backspace') {
      if (e.ctrlKey) {
        let newActiveLetter = activeLetter;

        if (letters[activeLetter - 1] === ' ') {
          newActiveLetter = activeLetter - 2;
          setMistakes((prev) =>
            prev.filter((mistake) => mistake !== activeLetter - 1 && mistake !== activeLetter - 2)
          );
        }

        for (let i = newActiveLetter - 1; i >= 0; i--) {
          if (letters[i] === ' ') break;
          newActiveLetter = i;
          setMistakes((prev) => prev.filter((mistake) => mistake !== i));
        }

        setActiveLetter(newActiveLetter);

        return;
      }

      setActiveLetter((prev) => Math.max(prev - 1, 0));

      if (mistakes.includes(activeLetter - 1)) {
        setMistakes((prev) => prev.filter((mistake) => mistake !== activeLetter - 1));
      }

      return;
    }

    if (!allowedCharacters.includes(e.key.toLowerCase())) return;

    if (state === 'WAITING') {
      start();

      setState('RUNNING');
    }

    if (e.key !== letters[activeLetter]) setMistakes((prev) => [...prev, activeLetter]);

    setActiveLetter((prev) => prev + 1);

    checkIfFinish();
  };

  const checkIfFinish = () => {
    if (state !== 'RUNNING') return;

    if (
      (mode.includes('w') && activeLetter >= activeText.length) ||
      (mode.includes('m') && time >= parseFloat(mode) * 60)
    ) {
      pause();
      setState('FINISHED');
    }
  };

  useEffect(() => {
    if (state === 'FINISHED') {
      onFinish && onFinish();
    }
  }, [state]);

  const resetTyping = (newText: string, newMode: string) => {
    setActiveLetter(0);
    setMistakes([]);
    setStats({ cpm: 0, accuracy: 100, wpmHistory: [] });
    reset();

    setActiveText(newText);
    setLetters(newText.split(''));

    // @ts-ignore
    setMode(newMode);

    setState('WAITING');
  };

  let displayTime = mode.includes('w') ? time : parseFloat(mode) * 60 - time;

  return {
    activeLetter,
    letters,
    text,
    mistakes,
    time: displayTime,
    stats,
    state,
    resetTyping,
    activeText,
    setMode,
  };
};

export default useTyping;
