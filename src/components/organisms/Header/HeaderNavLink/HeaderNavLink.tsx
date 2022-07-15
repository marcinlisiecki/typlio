import React, { FunctionComponent, ReactNode } from 'react';
import Link from 'next/link';

interface OwnProps {
  href: string;
  children?: ReactNode;
  customStyles?: string;
}

type Props = OwnProps;

const HeaderNavLink: FunctionComponent<Props> = ({ href, children, customStyles }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={`text-gray-400 font-medium text-sm transition hover:text-gray-200 cursor-pointer ${customStyles}`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default HeaderNavLink;
