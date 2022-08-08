import { DefaultSession } from 'next-auth';
import { ISODateString } from 'next-auth/core/types';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string | null;
      username?: string | null;
    } & DefaultSession['user'];
    expires: ISODateString;
  }
}
