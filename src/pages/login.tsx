import React from 'react';
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

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>({ resolver: yupResolver(LoginValidationSchema) });

  const onSubmit = async (data: ILoginCredentials) => {
    console.log(data);
  };

  return (
    <MainTemplate title={'Login page'} withHeader={false} withHeaderPadding={false}>
      <div className={'w-full h-screen flex flex-col gap-y-16 items-center justify-center'}>
        <Logo />

        <form className={'w-[370px] flex flex-col gap-y-8'} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor={'email'}>Email Address</Label>
            <Input
              error={errors.email?.message}
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
              error={errors.password?.message}
              id={'password'}
              type={'password'}
              placeholder={'********'}
              {...register('password')}
            />
          </div>

          <Button>Login</Button>

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
