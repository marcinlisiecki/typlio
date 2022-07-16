import React, { FunctionComponent } from 'react';

interface OwnProps {}
type Props = OwnProps;

const Hero: FunctionComponent<Props> = () => {
  return (
    <section className={'h-screen flex items-center justify-between w-full'}>
      <div className={'w-1/2 flex flex-col gap-y-8'}>
        <h1 className={'font-bold text-5xl leading-[54px]'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
          <span className={'text-primary-500'}>.</span>
        </h1>
        <p className={'text-text-secondary font-medium leading-7 max-w-[500px]'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat cursus neque, vel
          scelerisque orci vehicula ut. Aliquam feugiat nunc nisl. consequat cursus neque. consequat
          cursus neque.
        </p>
      </div>
    </section>
  );
};

export default Hero;
