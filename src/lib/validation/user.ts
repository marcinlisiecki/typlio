import yup from 'yup';
import { ErrorMessage } from 'lib/errors/constants';

export const LoginValidationSchema: yup.SchemaOf<ILoginCredentials> = yup.object().shape({
  email: yup.string().email(ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_IS_REQUIRED),
  password: yup.string().required(ErrorMessage.PASSWORD_IS_REQUIRED),
});
