const words = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'hello',
  'world',
  'test',
  'database',
  'of',
  'words',
] as const;

export const generateText = (numberOfWords: number = 50): string => {
  let finalText: string = '';

  for (let i = 0; i < numberOfWords; i++) {
    finalText += words[Math.floor(Math.random() * words.length)] + ' ';
  }

  return finalText.substring(0, finalText.length - 1);
};
