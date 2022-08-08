import { ErrorMessage } from 'lib/errors/constants';

export const parseApiErrors = (err: any): IValidationError[] =>
  err.response?.data?.errors || [{ message: ErrorMessage.SOMETHING_WENT_WRONG }];

export const getErrorMessage = (errors: IValidationError[] = [], path: string): string =>
  errors.find((err) => err?.path === path)?.message || '';
