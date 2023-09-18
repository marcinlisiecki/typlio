import { generate } from 'random-words';

export const generateText = (numberOfWords: number = 50): string => {
  return generate(numberOfWords).join(' ');
};
