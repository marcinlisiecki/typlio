import { ErrorMessage } from 'lib/errors/constants';

export const parseApiErrors = (err: any) =>
  err.response?.data?.errors || [{ message: ErrorMessage.SOMETHING_WENT_WRONG }];

export const getErrorMessage = (errors: any[], path: string): string =>
  errors.find((err) => err.path === path)?.message || '';
