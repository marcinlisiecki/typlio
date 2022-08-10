import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { getSession } from 'next-auth/react';
import { ErrorMessage } from 'lib/errors/constants';

const withAuth = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  const session = await getSession({ req });

  if (!session?.user)
    return res.status(403).json({ errors: [{ message: ErrorMessage.NOT_AUTHENTICATED }] });

  next();
};

export default withAuth;
