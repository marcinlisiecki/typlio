import { ErrorMessage } from 'lib/errors/constants';

export const parseApiErrors = (err: any): IApiError[] =>
  err.response?.data?.errors || [{ message: ErrorMessage.SOMETHING_WENT_WRONG }];

export const getErrorMessage = (errors: IApiError[] = [], path: string | null): string =>
  path
    ? errors.find((err) => err?.path === path)?.message || ''
    : errors.find((err) => !err.path)?.message || '';
