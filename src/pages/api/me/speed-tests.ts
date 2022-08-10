import nc, { NextHandler } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorMessage } from 'lib/errors/constants';
import { getSession } from 'next-auth/react';
import { prisma } from 'lib/db/prisma';
import withAuth from 'middleware/withAuth';

const handler = nc({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    console.log(err);
    return res.status(500).send({ errors: [{ message: ErrorMessage.SERVER_ERROR }] });
  },
})
  .use(withAuth)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    const session = await getSession({ req });

    const { time, accuracy, cpm, mistakes, mode } = data;

    await prisma.speedTest.create({
      data: {
        userId: session?.user.id as string,
        time: time || 0,
        accuracy: accuracy || 0,
        cpm: cpm || 0,
        mistakes: mistakes || 0,
        mode,
      },
    });

    return res.status(201).json({});
  });

export default handler;
