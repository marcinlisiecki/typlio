import React from 'react';
import { NextPage } from 'next';
import MainTemplate from 'components/templates/MainTemplate';
import Logo from 'components/atoms/Logo';
import Input from 'components/atoms/Input';
import Label from 'components/atoms/Label';
import Button from 'components/atoms/Button';

import PageLink from 'components/atoms/PageLink';
import { ArrowSmRightIcon } from '@heroicons/react/outline';

const RegisterPage: NextPage = () => {
  return (
    <MainTemplate title={'Register page'} withHeader={false} withHeaderPadding={false}>
      <div className={'w-full h-screen flex flex-col gap-y-16 items-center justify-center'}>
        <Logo />

        <form className={'w-[370px] flex flex-col gap-y-8'}>
          <div>
            <Label htmlFor={'email'}>Email Address</Label>
            <Input
              name={'email'}
              id={'email'}
              type={'email'}
              placeholder={'john.doe@example.com'}
            />
          </div>

          <div>
            <Label htmlFor={'username'}>Username</Label>
            <Input name={'username'} id={'username'} type={'text'} placeholder={'John'} />
          </div>

          <div>
            <Label htmlFor={'password'}>Password</Label>
            <Input name={'password'} id={'password'} type={'password'} placeholder={'********'} />
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
