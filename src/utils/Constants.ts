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
};

export const ERRORS = {
  MISSING_EMAIL: 'Please enter valid email.',
  MISSING_REFRESH_TOKEN: 'Missing refresh token',
};

export const KEYBOARD = {
  BACKSPACE: 'Backspace',
};
