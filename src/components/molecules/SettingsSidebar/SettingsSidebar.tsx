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
  },
  {
    path: '/settings/appearance',
    label: 'Appearance',
    isForLoggedIn: false,
  },
  {
    path: '/settings/profile',
    label: 'Profile',
    isForLoggedIn: true,
  },
  {
    path: '/settings/privacy',
    label: 'Privacy',
    isForLoggedIn: true,
  },
] as const;

const SettingsSidebar: FunctionComponent<Props> = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isActive = (path: string) => path === router.asPath;

  return (
    <nav className={'w-[200px]'}>
      <ul className={'flex flex-col gap-y-2'}>
        {sections.map(({ label, path, isForLoggedIn }) => {
          if (isForLoggedIn && !session?.user) return;

          return (
            <li key={path}>
              <Link href={path}>
                <a
                  className={`text-text-tertiary font-medium hover:text-text-secondary transition transform hover:translate-x-1 inline-block ${
                    isActive(path) && '!text-text-primary'
                  }`}
                >
                  {label}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SettingsSidebar;
