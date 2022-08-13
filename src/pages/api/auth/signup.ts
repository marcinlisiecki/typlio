import { NextApiRequest, NextApiResponse } from 'next';

import nc, { NextHandler } from 'next-connect';

import { RegisterValidationSchema } from 'lib/validation/user';
import { ErrorMessage } from 'lib/errors/constants';
import { hashPassword } from 'lib/auth/password';
import { prisma } from 'lib/db/prisma';

const handler = nc({
  onError: (err, req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    console.log(err);
    return res.status(500).send({ errors: [{ message: ErrorMessage.SERVER_ERROR }] });
  },
}).post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, username }: IRegisterCredentials = req.body;

  try {
    await RegisterValidationSchema.validate({ email, password, username }, { abortEarly: false });
  } catch (err: any) {
    const errors = err.inner.map((err: any) => ({ message: err.message, path: err.path }));
    return res.status(422).json({ errors });
  }

  const emailUser = await prisma.user.findFirst({ where: { email: email.toLowerCase() } });
  if (emailUser) {
    return res.status(422).json({
      errors: [
        {
          message: ErrorMessage.EMAIL_ALREADY_EXISTS,
          path: 'email',
        },
      ],
    });
  }

  const usernameUser = await prisma.user.findFirst({ where: { username } });
  if (usernameUser) {
    return res.status(422).json({
      errors: [
        {
          message: ErrorMessage.USERNAME_ALREADY_EXISTS,
          path: 'username',
        },
      ],
    });
  }

  const hashedPassword: string = await hashPassword(password);

  await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
    },
  });

  return res.status(201).json({});
});

export default handler;
