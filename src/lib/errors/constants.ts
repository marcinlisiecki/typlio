export const ErrorCode = {
  INVALID_EMAIL: 'INVALID_EMAIL',
  EMAIL_IS_REQUIRED: 'EMAIL_IS_REQUIRED',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',

  MAX_USERNAME_LENGTH: 'MAX_USERNAME_LENGTH',
  MIN_USERNAME_LENGTH: 'MIN_USERNAME_LENGTH',
  USERNAME_IS_REQUIRED: 'USERNAME_IS_REQUIRED',
  USERNAME_ALREADY_EXISTS: 'USERNAME_ALREADY_EXISTS',

  MAX_PASSWORD_LENGTH: 'MAX_PASSWORD_LENGTH',
  MIN_PASSWORD_LENGTH: 'MIN_PASSWORD_LENGTH',
  PASSWORD_IS_REQUIRED: 'PASSWORD_IS_REQUIRED',

  SERVER_ERROR: 'SERVER_ERROR',
} as const;

export const ErrorMessage = {
  // email
  [ErrorCode.INVALID_EMAIL]: 'Invalid Email Address',
  [ErrorCode.EMAIL_IS_REQUIRED]: 'Email Address is required',
  [ErrorCode.EMAIL_ALREADY_EXISTS]: 'User with the same email already exists',

  // username
  [ErrorCode.MIN_USERNAME_LENGTH]: "Username can't be shorter than 3 characters",
  [ErrorCode.MAX_USERNAME_LENGTH]: "Username can't be longer than 50 characters",
  [ErrorCode.USERNAME_IS_REQUIRED]: 'Username is required',
  [ErrorCode.USERNAME_ALREADY_EXISTS]: 'User with the same username already exists',

  // password
  [ErrorCode.MIN_PASSWORD_LENGTH]: "Password can't be shorter than 8 characters",
  [ErrorCode.MAX_PASSWORD_LENGTH]: "Password can't be longer than 255 characters",
  [ErrorCode.PASSWORD_IS_REQUIRED]: 'Password is required',

  [ErrorCode.SERVER_ERROR]: 'Server error',
} as const;
