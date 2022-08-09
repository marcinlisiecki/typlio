import React, { FunctionComponent, ReactNode } from 'react';
import Link from 'next/link';

interface OwnProps {
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => any;
  children?: ReactNode;
}

type Props = OwnProps;

const DropdownMenuLink: FunctionComponent<Props> = ({ href, onClick, children }) => {
  return (
    <Link href={href}>
      <a
        className={
          'text-sm text-text-secondary hover:text-text-primary cursor-pointer w-full flex items-center gap-x-3'
        }
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
};

export default DropdownMenuLink;
