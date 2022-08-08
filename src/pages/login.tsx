import React, { useState } from 'react';
import { NextPage } from 'next';

import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LoginValidationSchema } from 'lib/validation/user';

import MainTemplate from 'components/templates/MainTemplate';
import PageLink from 'components/atoms/PageLink';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import Logo from 'components/atoms/Logo';
import { signIn } from 'next-auth/react';
import { isValidJson } from 'lib/utils';
import { AuthService } from 'services/api/auth';
import { getErrorMessage, parseApiErrors } from 'lib/errors';
import { ErrorMessage } from 'lib/errors/constants';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseErrors, setResponseErrors] = useState<IApiError[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>({ resolver: yupResolver(LoginValidationSchema) });

  const onSubmit = async (data: ILoginCredentials) => {
    setIsLoading(true);
    setResponseErrors([]);

    try {
      const response = await AuthService.CredentialsLogin(data);

      if (response?.error) {
        setResponseErrors(
          isValidJson(response.error)
            ? JSON.parse(response.error)
            : [{ message: ErrorMessage.SOMETHING_WENT_WRONG }]
        );
        setIsLoading(false);

        return;
      }

      await router.push('/');
      return;
    } catch (err) {
      setResponseErrors(parseApiErrors(err));
    }

    setIsLoading(false);
  };

  return (
    <MainTemplate title={'Login page'} withHeader={false} withHeaderPadding={false}>
      <div className={'w-full h-screen flex flex-col gap-y-16 items-center justify-center'}>
        <Logo />

        <form className={'w-[370px] flex flex-col gap-y-8'} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor={'email'}>Email Address</Label>
            <Input
              error={errors.email?.message || getErrorMessage(responseErrors, 'email')}
              id={'email'}
              type={'email'}
              placeholder={'john.doe@example.com'}
              {...register('email')}
            />
          </div>

          <div>
            <div className={'flex justify-between'}>
              <Label htmlFor={'password'}>Password</Label>
              <PageLink href={'/forgot-password'}>Forgot?</PageLink>
            </div>
            <Input
              error={errors.password?.message || getErrorMessage(responseErrors, 'password')}
              id={'password'}
              type={'password'}
              placeholder={'********'}
              {...register('password')}
            />
          </div>

          <div className={'w-full flex flex-col'}>
            <Button isLoading={isLoading}>Login</Button>
            {getErrorMessage(responseErrors, null) && (
              <p className={'mt-1.5 ml-1 text-danger-500 text-sm'}>
                {getErrorMessage(responseErrors, null)}
              </p>
            )}
          </div>

          <div className={'w-[130px] mx-auto bg-gray-800 h-[2px]'} />

          <p className={'text-sm text-text-secondary font-medium text-center'}>
            Don&apos;t have an account?{' '}
            <PageLink href={'/register'} customStyles={'inline-flex items-center'}>
              Create one!
              <ArrowSmRightIcon
                className={
                  'w-[20px] h-[20px] stroke-primary-600 transition transform group-hover:translate-x-1'
                }
              />
            </PageLink>
          </p>
        </form>
      </div>
    </MainTemplate>
  );
};

export default LoginPage;
