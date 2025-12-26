export const APPLICATION_NAME = "nikkey-frontend";

export const DEFAULT_ROWS_PER_PAGE = 10;

export const DEFAULT_PAGE = 0;

export const DEFAULT_DATA_INICIO = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1,
);

export const DEFAULT_DATA_FIM = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
  0,
);

export const LOCAL_STORAGE_KEYS = {
  token: `${APPLICATION_NAME}_auth_token`,
  user: `${APPLICATION_NAME}_auth_user`,
  expiresAt: `${APPLICATION_NAME}_auth_expiresAt`,
  originalUser: `${APPLICATION_NAME}_auth_original_user`,
};

export const SESSION_STORAGE_KEYS = {
  theme: `${APPLICATION_NAME}_theme`,
};
