export const ErrorCode = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  EMAIL_IS_REQUIRED: 'EMAIL_IS_REQUIRED',

  PASSWORD_IS_REQUIRED: 'PASSWORD_IS_REQUIRED',
} as const;

export const ErrorMessage = {
  [ErrorCode.INVALID_EMAIL]: 'Invalid Email Address',
  [ErrorCode.EMAIL_IS_REQUIRED]: 'Email Address is required',

  [ErrorCode.PASSWORD_IS_REQUIRED]: 'Password is required',
} as const;
