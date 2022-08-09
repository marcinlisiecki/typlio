import React, { FunctionComponent, useEffect, useMemo } from 'react';

interface OwnProps {
  letters: string[];
  activeLetter: number;
  mistakes: number[];
}

type Props = OwnProps;

const TypingDisplayText: FunctionComponent<Props> = ({ letters, activeLetter, mistakes }) => {
  useEffect(() => {
    const activeLetterRef = document.getElementById(`letter-${activeLetter}`);
    const activeLetterPointerRef = document.getElementById(`letter-${activeLetter}-pointer`);
    if (!activeLetterRef || !activeLetterPointerRef) return;

    activeLetterRef.scrollIntoView(); // 0, -89
    document.getElementsByClassName('no-scrollbar')[0].scrollBy(0, -50);

    if (letters[activeLetter] !== ' ') activeLetterRef.classList.add('!text-text-primary');
    activeLetterPointerRef.classList.add('opacity-100');

    // makes sure that every class is removed when user presses a few keys at once
    for (let i = 1; i < 50; i++) {
      handleClassesForLetter(activeLetter - i);
    }

    // makes sure that every class is removed when ctrl + backspace (erasing entire word) is used
    for (let i = 1; i < 50; i++) {
      handleClassesForLetter(activeLetter + i);
    }
  }, [activeLetter, letters]);

  const handleClassesForLetter = (letterIndex = 0) => {
    const letterRef = document.getElementById(`letter-${letterIndex}`);
    const letterPointerRef = document.getElementById(`letter-${letterIndex}-pointer`);
    if (!letterRef || !letterPointerRef) return;

    letterRef.classList.remove('!text-text-primary');
    letterPointerRef.classList.remove('opacity-100');

    if (letterIndex < activeLetter && letters[letterIndex] !== ' ') {
      letterRef.classList.add('text-gray-700');
    } else {
      letterRef.classList.remove('text-gray-700');
    }

    if (mistakes.includes(letterIndex)) {
      if (letterRef.innerText === '␣\u200B') {
        letterRef.classList.remove('text-transparent');
      }

      letterRef.classList.add('text-red-500');
      letterRef.classList.remove('text-gray-700');
    } else {
      if (letterRef.innerText === '␣\u200B') {
        letterRef.classList.add('text-transparent');
      }

      letterRef.classList.remove('text-red-500');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
    });
  }, []);

  const createText = useMemo(() => {
    let index = -1;

    return letters
      .join('')
      .split(' ')
      .map((word, wordIndex) => {
        if (wordIndex + 1 < letters.join('').split(' ').length) {
          word += ' ';
        }

        return (
          <p key={`word-${wordIndex}`}>
            {word.split('').map((letter) => {
              index++;

              return (
                <span
                  key={index}
                  id={`letter-${index}`}
                  className={`text-text-tertiary relative leading-[1.7] ${
                    letter === ' ' && 'text-transparent'
                  }`}
                >
                  {letter !== ' ' ? letter : '␣\u200B'}
                  <div
                    id={`letter-${index}-pointer`}
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-white opacity-0`}
                  />
                </span>
              );
            })}
          </p>
        );
      });
  }, [letters]);

  return (
    <div className={'relative flex-[2]'}>
      <div className={'absolute bottom-0 w-full h-8 z-10 bg-dark/75'} />
      <div
        className={
          'font-mono font-bold text-2xl tracking-wide max-h-[160px] overflow-y-scroll no-scrollbar pb-32 flex flex-wrap'
        }
      >
        {createText}
      </div>
    </div>
  );
};

export default TypingDisplayText;
