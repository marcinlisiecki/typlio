import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

interface OwnProps {}
type Props = OwnProps;

const sections = [
  {
    path: '/settings/general',
    label: 'General',
    isForLoggedIn: true,
    newSection: false,
  },
  // {
  //   path: '/settings/security',
  //   label: 'Security',
  //   isForLoggedIn: true,
  //   newSection: false,
  // },
  // {
  //   path: '/settings/privacy',
  //   label: 'Privacy',
  //   isForLoggedIn: true,
  //   newSection: false,
  // },
  // {
  //   path: '/settings/appearance',
  //   label: 'Appearance',
  //   isForLoggedIn: false,
  //   newSection: true,
  // },
  // {
  //   path: '/settings/typing',
  //   label: 'Typing',
  //   isForLoggedIn: false,
  //   newSection: false,
  // },
  // {
  //   path: '/settings/language',
  //   label: 'Language',
  //   isForLoggedIn: false,
  //   newSection: false,
  // },
] as const;

const SettingsSidebar: FunctionComponent<Props> = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isActive = (path: string) => path === router.asPath;

  return (
    <nav className={'w-[200px]'}>
      <ul className={'flex flex-col gap-y-2'}>
        {sections.map(({ label, path, isForLoggedIn, newSection }) => {
          if (isForLoggedIn && !session?.user) return;

          return (
            <>
              {newSection && <div className={'w-12 bg-gray-800 h-px my-1'} />}
              <li key={path}>
                <Link href={path}>
                  <a
                    className={`text-text-tertiary font-medium hover:text-text-secondary transition inline-block ${
                      isActive(path) && '!text-text-primary'
                    }`}
                  >
                    {label}
                  </a>
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </nav>
  );
};

export default SettingsSidebar;
