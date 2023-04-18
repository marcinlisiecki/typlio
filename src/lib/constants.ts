export const SPEED_TEST_MODES = [
  {
    name: '10w',
    label: '10 Words',
    description: 'Short test that allows for a quick assessment of basic typing speed.',
  },
  {
    name: '50w',
    label: '50 Words',
    description:
      'Medium-length test that allows for checking the ability to type quickly and maintain pace.',
  },
  {
    name: '100w',
    label: '100 Words',
    description:
      'Longer test that requires endurance and the ability to maintain focus over a longer period of time.',
  },
  {
    name: '200w',
    label: '200 Words',
    description:
      'Very long test that allows for testing endurance and the ability to maintain pace over a longer period of time.',
  },
  {
    name: '0.5m',
    label: '30 Seconds',
    description:
      'Short timed test that allows for a quick determination of typing speed in a time-limited situation.',
  },
  {
    name: '1m',
    label: '1 Minute',
    description:
      'Medium-length timed test that requires the ability to maintain pace over a longer period of time.',
  },
  {
    name: '2',
    label: '2 Minutes',
    description:
      'Long timed test that allows for testing endurance and the ability to maintain pace over a longer period of time.',
  },
] as const;
