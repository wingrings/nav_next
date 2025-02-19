'use server';

import {cookies, headers} from 'next/headers';
import {Locale, defaultLocale} from '@/i18n/config';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';
const obj: any = {
  en: 'en',
  'zh-CN': 'zh',
  zh: 'zh'
}
export async function getUserLocale() {
  const cookieStore = await cookies();
  const headersList = await headers();
  const language = headersList.get("accept-language");
  const langKey = language ? language.split(';')[0].split(',')[0] : defaultLocale;
  return cookieStore.get(COOKIE_NAME)?.value || (langKey ? obj[langKey] : undefined) || defaultLocale;
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
