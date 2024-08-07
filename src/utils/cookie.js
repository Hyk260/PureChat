import Cookies from "js-cookie";
import dayjs from 'dayjs';

const COOKIE_CACHE_DAYS = 1;

function getCachedExpiration(days) {
  return dayjs().add(days, 'day').toDate();
}

export const setCookie = (key, value, expirationDays = COOKIE_CACHE_DAYS) => {
  const expiresDate = getCachedExpiration(expirationDays);
  Cookies.set(key, value, { expires: expiresDate });
};

export const getCookie = (key) => {
  return Cookies.get(key);
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};
