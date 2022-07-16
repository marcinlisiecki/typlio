import type { NextPage } from 'next';

import MainTemplate from 'components/templates/MainTemplate';
import Hero from 'components/organisms/Hero';

const Home: NextPage = () => {
  return (
    <>
      <div
        className={
          '-z-20 absolute left-[400px] top-[200px] bg-indigo-600/20 rounded-full w-[650px] h-[150px] transform rotate-[30deg] blur-[50px]'
        }
      />
      <div
        className={
          '-z-20 absolute left-[300px] top-[500px] bg-primary-500/20 rounded-full w-[650px] h-[150px] transform rotate-[30deg] filter blur-[50px]'
        }
      />
      <div
        className={
          '-z-20  absolute left-[600px] top-[550px] bg-cyan-500/20 rounded-full w-[650px] h-[150px] transform rotate-[30deg] filter blur-[50px]'
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
    </>
  );
};

export default Home;
