import type { NextPage } from 'next';

import MainTemplate from 'components/templates/MainTemplate';
import Hero from 'components/organisms/Hero';

const Home: NextPage = () => {
  return (
    <div className={'overflow-x-hidden'}>
      <div
        className={
          '-z-20 absolute w-[450px] h-[150px] left-[-30px] top-[100px] lg:left-[40%] lg:top-[200px] bg-indigo-600/20 rounded-full lg:w-[650px] lg:h-[150px] transform rotate-[30deg] blur-[50px]'
        }
      />
      <div
        className={
          '-z-20 absolute left-[0px] top-[300px] lg:left-[25%] lg:top-[500px] bg-primary-500/20 rounded-full w-[650px] h-[150px] transform rotate-[30deg] filter blur-[50px]'
        }
      />
      <div
        className={
          '-z-20  absolute left-[-60px] top-[450px] lg:left-[40%] lg:top-[550px] bg-cyan-500/20 rounded-full w-[650px] h-[150px] transform rotate-[30deg] filter blur-[50px]'
        }
      />

      <div
        className={
          'bg-dark/10 filter backdrop-blur-[70px] fixed top-0 left-0 w-screen h-screen -z-10'
        }
      />

      <MainTemplate title={'Home'} customStyles={'h-[120vh]'} withHeaderPadding={false}>
        <Hero />
      </MainTemplate>
    </div>
  );
};

export default Home;
