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

export const STORAGE_KEYS = {
  token: "auth_token",
  user: "auth_user",
  expiresAt: "auth_expiresAt",
  originalUser: "auth_original_user",
};
