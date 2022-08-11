import nc, { NextHandler } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorMessage } from 'lib/errors/constants';
import { getSession } from 'next-auth/react';
import { prisma } from 'lib/db/prisma';
import withAuth from 'middleware/withAuth';
import { NewSpeedTestValidationSchema } from 'lib/validation/speed-test';

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

    try {
      await NewSpeedTestValidationSchema.validate({ ...data }, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.map((err: any) => ({ message: err.message, path: err.path }));
      return res.status(422).json({ errors });
    }

    const { time, accuracy, cpm, mistakes, mode } = data;

    await prisma.speedTest.create({
      data: {
        userId: session?.user.id as string,
        time,
        accuracy,
        cpm,
        mistakes,
        mode,
      },
    });

    return res.status(201).json({});
  });

export default handler;
