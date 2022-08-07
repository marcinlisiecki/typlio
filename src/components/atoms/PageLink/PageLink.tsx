import React, { FunctionComponent, ReactNode } from 'react';
import Link from 'next/link';

interface OwnProps {
  href: string;
  children?: ReactNode;

  customStyles?: string;
}

type Props = OwnProps;

const PageLink: FunctionComponent<Props> = ({ href, customStyles, children }) => {
  return (
    <Link href={href}>
      <a
        className={`text-primary-500 hover:underline font-medium group transition text-sm inline-block ${customStyles}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default PageLink;
