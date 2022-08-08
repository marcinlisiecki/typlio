import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'lib/db/prisma';
import { ErrorMessage } from 'lib/errors/constants';
import { comparePasswords } from 'lib/auth/password';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email Address',
          type: 'email',
          name: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
          name: 'password',
        },
      },
      authorize: async (credentials: ILoginCredentials | undefined, req: any) => {
        if (!credentials || !credentials.email || !credentials.password)
          throw new Error(JSON.stringify([{ message: ErrorMessage.NO_CREDENTIALS_PROVIDED }]));

        const user = await prisma.user.findFirst({
          where: { email: credentials.email.toLowerCase() },
        });
        if (!user) throw new Error(JSON.stringify([{ message: ErrorMessage.WRONG_CREDENTIALS }]));

        if (!user.password)
          throw new Error(JSON.stringify([{ message: ErrorMessage.WRONG_PROVIDER }]));

        const isPasswordCorrect = await comparePasswords(credentials.password, user.password);
        if (!isPasswordCorrect)
          throw new Error(JSON.stringify([{ message: ErrorMessage.WRONG_CREDENTIALS }]));

        return { username: user.username, email: user.email, id: user.id };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.username = token.username;
      }

      return session;
    },

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.username = user.username;
      }

      return token;
    },
  },
});
