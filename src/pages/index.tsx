import type { NextPage } from 'next';
import MainTemplate from 'components/templates/MainTemplate';

const Home: NextPage = () => {
  return (
    <MainTemplate title={'Home'} customStyles={'h-[120vh]'}>
      hello
    </MainTemplate>
  );
};

export default Home;
