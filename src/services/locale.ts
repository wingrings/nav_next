'use server';

import {cookies} from 'next/headers';
import {Locale, defaultLocale} from '@/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

const arr: any = []


export async function pushData(val: any) {
  arr.push(val)
  return {
    code: 200
  }
}
export async function getTestData() {
  return {
    code: 200,
    data: arr
  }
}
