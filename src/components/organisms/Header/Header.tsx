import React, { FunctionComponent } from 'react';

import HeaderNav from 'components/organisms/Header/HeaderNav';
import Logo from 'components/atoms/Logo';

interface OwnProps {}
type Props = OwnProps;

const Header: FunctionComponent<Props> = () => {
  return (
    <header className={'max-w-page mx-auto h-[120px] flex items-center justify-between px-page'}>
      <Logo />
      <HeaderNav />
    </header>
  );
};

export default Header;
