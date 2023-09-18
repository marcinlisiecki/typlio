import React, { FunctionComponent, useEffect, useState } from 'react';

import HeaderNav from 'components/organisms/Header/HeaderNav';
import Logo from 'components/atoms/Logo';

interface OwnProps {}

type Props = OwnProps;

const Header: FunctionComponent<Props> = () => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    if (typeof window === undefined) return;

    const changeHeaderState = () => {
      if (!isSmall && window.scrollY > 0) setIsSmall(true);
      else if (isSmall && window.scrollY === 0) setIsSmall(false);
    };

    window.addEventListener('scroll', changeHeaderState);

    return () => {
      window.removeEventListener('scroll', changeHeaderState);
    };
  }, [isSmall]);

  return (
    <header
      className={`h-[120px] w-full fixed top-0 left-0 transition-[height] z-[200] ${
        isSmall && 'bg-dark/50 border-b border-b-gray-900 shadow-lg h-[60px] backdrop-blur-xl'
      }`}
    >
      <div className={'max-w-page mx-auto h-full flex items-center justify-between px-page'}>
        <Logo />
        <HeaderNav />
      </div>
    </header>
  );
};

export default Header;
