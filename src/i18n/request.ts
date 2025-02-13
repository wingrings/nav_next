import {getRequestConfig} from 'next-intl/server';
import {getUserLocale} from '../services/locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  return {
    locale,
    messages: (await import(`../../messages/${locale}.ts`)).default
  };
});