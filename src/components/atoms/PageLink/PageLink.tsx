import React, { FunctionComponent, ReactNode } from 'react';
import Link from 'next/link';

interface OwnProps {
  href: string;
  children?: ReactNode;
  onClick?: () => void;

  customStyles?: string;
}

type Props = OwnProps;

const PageLink: FunctionComponent<Props> = ({ href, customStyles, children, onClick }) => {
  return (
    <Link href={href} onClick={onClick}>
      <a
        className={`text-primary-500 hover:underline font-medium group transition text-sm inline-block ${customStyles}`}
      >
        {children}
      </a>
    </Link>
  );
};

export default PageLink;
