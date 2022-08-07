import * as yup from 'yup';
import { ErrorMessage } from 'lib/errors/constants';

export const LoginValidationSchema: yup.SchemaOf<ILoginCredentials> = yup.object().shape({
  email: yup.string().email(ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_IS_REQUIRED),
  password: yup.string().required(ErrorMessage.PASSWORD_IS_REQUIRED),
});

export const RegisterValidationSchema: yup.SchemaOf<IRegisterCredentials> = yup.object().shape({
  email: yup.string().email(ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_IS_REQUIRED),
  username: yup
    .string()
    .min(3, ErrorMessage.MIN_USERNAME_LENGTH)
    .max(50, ErrorMessage.MAX_USERNAME_LENGTH)
    .required(ErrorMessage.USERNAME_IS_REQUIRED),
  password: yup
    .string()
    .min(8, ErrorMessage.MIN_PASSWORD_LENGTH)
    .max(255, ErrorMessage.MAX_PASSWORD_LENGTH)
    .required(ErrorMessage.PASSWORD_IS_REQUIRED),
});
