export const FROM_EMAIL = process.env.FROM_EMAIL || "<noreply@dmenu.kz>";
export const DOMAIN = process.env.NEXTAUTH_URL || "http://localhost:3000";
export const MAX_PAGINATION = 20;
export const DEFAULT_PAGINATION = 10;
export const SLUG_REGEX = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
