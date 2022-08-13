import React, { FunctionComponent } from 'react';

import {
  ArrowSmRightIcon,
  UserCircleIcon,
  ClockIcon,
  ChartBarIcon,
  LogoutIcon,
  CogIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import HeaderNavLink from 'components/organisms/Header/HeaderNavLink';
import { signOut, useSession } from 'next-auth/react';

import DropdownMenu from 'components/molecules/DropdownMenu';
import DropdownMenuLink from 'components/molecules/DropdownMenu/DropdownMenuLink';
import Button from 'components/atoms/Button';
import PageLink from 'components/atoms/PageLink';

interface OwnProps {}
type Props = OwnProps;

const HeaderNav: FunctionComponent<Props> = () => {
  const { data: session } = useSession();

  return (
    <nav>
      <ul className={'flex items-center gap-x-12'}>
        <HeaderNavLink href={'/speed-test'}>Speed Test</HeaderNavLink>
        <HeaderNavLink href={'/learn'}>Learn</HeaderNavLink>
        <HeaderNavLink href={'/practice'}>Practice</HeaderNavLink>

        <div className={'w-[2px] bg-gray-800 h-[22px] -mx-4'} />

        {session?.user ? (
          <>
            <div className={'relative group'}>
              <HeaderNavLink
                href={'/login'}
                customStyles={'flex justify-between gap-x-1 items-center group'}
              >
                {session.user.username}
                <ChevronDownIcon className={'w-[20px] h-[20px] fill-gray-600'} />
              </HeaderNavLink>

              <DropdownMenu customWrapperStyles={'w-[200px]'}>
                <div className={'px-4 py-3 flex flex-col gap-3'}>
                  <PageLink href={`/user/${session.user.username}`} customStyles={'!no-underline'}>
                    <div className={'flex gap-x-4 items-center'}>
                      <div className={'relative'}>
                        <div className={'w-6 h-6 bg-gray-600 rounded-full shrink-0'} />
                        <div
                          className={
                            'absolute -bottom-[3px] -right-[3px] w-3 h-3 bg-success-500 rounded-full shrink-0 border-bg-dark border-[3px]'
                          }
                        />
                      </div>
                      <p className={'text-sm'}>{session.user.username}</p>
                    </div>
                  </PageLink>

                  <div className={'w-full h-px bg-gray-900'} />

                  <DropdownMenuLink href={`/user/${session.user.username}`}>
                    <UserCircleIcon className={'stroke-gray-600 w-[18px] h-[18px]'} />
                    Profile
                  </DropdownMenuLink>
                  <DropdownMenuLink href={`/user/${session.user.username}/history`}>
                    <ClockIcon className={'stroke-gray-600 w-[18px] h-[18px]'} /> History
                  </DropdownMenuLink>
                  <DropdownMenuLink href={'/'}>
                    <ChartBarIcon className={'stroke-gray-600 w-[18px] h-[18px]'} /> Stats
                  </DropdownMenuLink>

                  <div className={'w-full h-px bg-gray-900'} />

                  <DropdownMenuLink href={'/'}>
                    <CogIcon className={'stroke-gray-600 w-[18px] h-[18px]'} />
                    Settings
                  </DropdownMenuLink>

                  <DropdownMenuLink href={'/'}>
                    <QuestionMarkCircleIcon className={'stroke-gray-600 w-[18px] h-[18px]'} />
                    Support
                  </DropdownMenuLink>

                  <div className={'w-full h-px bg-gray-900'} />

                  <DropdownMenuLink href={'/'} onClick={() => signOut({ redirect: false })}>
                    <LogoutIcon className={'stroke-gray-600 w-[18px] h-[18px]'} />
                    Wyloguj
                  </DropdownMenuLink>
                </div>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default HeaderNav;
