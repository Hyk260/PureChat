import Cookies from "js-cookie";
import dayjs from 'dayjs';

const COOKIE_CACHE_DAYS = 1;

function getCachedExpiration(days: number) {
  return dayjs().add(days, 'day').toDate();
}

export const setCookie = (key: string, value: string, expirationDays = COOKIE_CACHE_DAYS) => {
  const expiresDate = getCachedExpiration(expirationDays);
  Cookies.set(key, value, { expires: expiresDate });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
