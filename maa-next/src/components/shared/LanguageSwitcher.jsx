'use client'
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (e) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative inline-flex items-center">
      <Globe className="absolute left-2.5 text-forest/70 pointer-events-none" size={16} strokeWidth={1.5} />
      <select
        defaultValue={locale}
        onChange={handleLocaleChange}
        disabled={isPending}
        className="appearance-none bg-white border border-border text-charcoal font-semibold text-sm rounded-full pl-8 pr-8 py-2 hover:border-forest/40 focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={t('label')}
      >
        {['en', 'hi', 'te', 'ta'].map((cur) => (
          <option key={cur} value={cur}>
            {t(cur)}
          </option>
        ))}
      </select>
      <div className="absolute right-3 pointer-events-none text-forest/70">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
}
