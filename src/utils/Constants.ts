export const ROUTES = {
  CURRENTLY_SHOWING: 'movies/currently-showing',
  UPCOMING: 'movies/upcoming',
  VENUES: 'venues/pageable',
  UPCOMING_FILTER: 'movies/upcoming/filter',
  LOCATION_FILTER_ENDPOINT: '/locations',
  GENRE_FILTER_UPCOMING_ENDPOINT: '/genres/by-venues/upcoming',
  VENUE_FILTER_ENDPOINT: '/venues/all',
  GENRES_FILTER_BY_DAY_ENDPOINT: '/genres/by-day',
  PROJECTIONS_FILTER_BY_DAY_ENDPOINT: '/projections/times',
  RESET_PASSWORD_ENDPOINT: '/auth/reset-password',
  RESEND_VERIFICATION_ENDPOINT: '/auth/resend-verification',
  VERIFICATION_ENDPOINT: '/auth/verify',
  FORGOT_PASSWORD_ENDPOINT: '/auth/forgot-password',
  LOGIN_ENDPOINT: '/auth/login',
  REGISTER_ENDPOINT: '/auth/register',
  REFRESH_TOKEN_ENDPOINT: '/auth/refresh',
};

export const AUTH_CONST = {
  PASSWORD_RESET: 'PASSWORD_RESET',
  EMAIL_VERIFY: 'EMAIL_VERIFY',
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
  BEARER: 'Bearer ',
  REGEX_PATTERN: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
  TEXT_KEY_WORD: 'text',
  PASSWORD_KEY_WORD: 'password',
  EMAIL_KEY_WORD: 'email',
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
};

export const ERRORS = {
  MISSING_EMAIL: 'Please enter valid email.',
  MISSING_REFRESH_TOKEN: 'Missing refresh token',
  INVALID_EMAIL: 'Please enter valid email.',
  PASSWORDS_NOT_MATCHING: 'Passwords do not match.',
  STRONGER_PASSWORD:
    'Your password needs to contain at least 8 characters, 1 uppercase letter and 1 number.',
  ERROR_CODE_INPUT: 'Enter all 4 digits of code',
};

export const KEYBOARD = {
  BACKSPACE: 'Backspace',
};
