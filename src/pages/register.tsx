import React from 'react';
import { NextPage } from 'next';

import { ArrowSmRightIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { RegisterValidationSchema } from 'lib/validation/user';

import MainTemplate from 'components/templates/MainTemplate';
import PageLink from 'components/atoms/PageLink';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import Logo from 'components/atoms/Logo';

const RegisterPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterCredentials>({ resolver: yupResolver(RegisterValidationSchema) });

  const onSubmit = async (data: IRegisterCredentials) => {
    console.log(data);
  };

  return (
    <MainTemplate title={'Register page'} withHeader={false} withHeaderPadding={false}>
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
            <Label htmlFor={'username'}>Username</Label>
            <Input
              error={errors.username?.message}
              id={'username'}
              type={'text'}
              placeholder={'John'}
              {...register('username')}
            />
          </div>

          <div>
            <Label htmlFor={'password'}>Password</Label>
            <Input
              error={errors.password?.message}
              id={'password'}
              type={'password'}
              placeholder={'********'}
              {...register('password')}
            />
          </div>

          <Button>Register</Button>

          <div className={'w-[130px] mx-auto bg-gray-800 h-[2px]'} />

          <p className={'text-sm text-text-secondary font-medium text-center'}>
            Already have an account?{' '}
            <PageLink href={'/login'} customStyles={'inline-flex items-center'}>
              Login!
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

export default RegisterPage;
