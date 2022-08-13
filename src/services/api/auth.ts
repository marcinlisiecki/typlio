import { signIn } from 'next-auth/react';
import { AxiosResponse } from 'axios';

import api from 'lib/api';

export const AuthService = {
  CredentialsRegister: (credentials: IRegisterCredentials): Promise<AxiosResponse> =>
    api.post('/auth/signup', { ...credentials }),
  CredentialsLogin: (credentials: ILoginCredentials): Promise<any> =>
    signIn('credentials', { redirect: false, ...credentials }),
};
