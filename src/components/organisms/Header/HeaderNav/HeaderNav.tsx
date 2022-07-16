import React, { FunctionComponent } from 'react';

import { ArrowSmRightIcon } from '@heroicons/react/outline';
import HeaderNavLink from 'components/organisms/Header/HeaderNavLink';

interface OwnProps {}
type Props = OwnProps;

const HeaderNav: FunctionComponent<Props> = () => {
  return (
    <nav>
      <ul className={'flex items-center gap-x-12'}>
        <HeaderNavLink href={'/speed-test'}>Speed Test</HeaderNavLink>
        <HeaderNavLink href={'/learn'}>Learn</HeaderNavLink>
        <HeaderNavLink href={'/practice'}>Practice</HeaderNavLink>

        <div className={'w-[2px] bg-gray-800 h-[22px] -mx-4'} />

        <HeaderNavLink
          href={'/login'}
          customStyles={'flex justify-between gap-x-1 items-center group'}
        >
          Login
          <ArrowSmRightIcon
            className={
              'w-[20px] h-[20px] stroke-gray-600 transition transform group-hover:translate-x-1'
            }
          />
        </HeaderNavLink>
      </ul>
    </nav>
  );
};

export default HeaderNav;
