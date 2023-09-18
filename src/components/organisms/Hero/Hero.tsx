import React, { FunctionComponent } from 'react';

import Button from 'components/atoms/Button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface OwnProps {}
type Props = OwnProps;

const Hero: FunctionComponent<Props> = () => {
  const { data: session } = useSession();

  return (
    <section className={'h-screen flex items-center justify-between w-full'}>
      <div className={'flex flex-col gap-y-4 lg:gap-y-8 max-w-[700px] mx-auto'}>
        <h1
          className={
            'font-bold text-[24px] lg:text-5xl leading-normal lg:leading-[54px] text-center'
          }
        >
          Check and improve your typing speed skills
          <span className={'text-primary-500'}>.</span>
        </h1>
        <p
          className={
            'text-text-secondary font-medium lg:leading-7 max-w-[520px] text-center mx-auto'
          }
        >
          This tool will allow you to check your typing speed in multiple modes and provide you with
          detailed statistics. With it, you can identify your strengths and weaknesses to improve
          your results.
        </p>
        <div className={'flex items-center gap-x-6 mx-auto mt-4'}>
          {session?.user ? (
            <Link href={'/speed-test'}>
              <a>
                <Button>Speed Test</Button>
              </a>
            </Link>
          ) : (
            <Link href={'/register'}>
              <a>
                <Button>Register</Button>
              </a>
            </Link>
          )}
          {/*<Button variant={'secondary'}>*/}
          {/*  <p className={'flex items-center gap-x-2 group'}>*/}
          {/*    More*/}
          {/*    <ArrowSmRightIcon*/}
          {/*      className={*/}
          {/*        'w-[20px] h-[20px] stroke-gray-500 transition transform group-hover:translate-x-1 -mr-3'*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </p>*/}
          {/*</Button>*/}
        </div>
      </div>
    </section>
  );
};

export default Hero;
