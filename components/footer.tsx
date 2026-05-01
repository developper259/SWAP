'use client';

import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center text-sm">
              ♻
            </div>
            <span className="font-bold">Swap</span>
          </div>
          <p className="text-sm opacity-75">{t('footer.tagline')}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t('footer.browse')}</h4>
          <ul className="text-sm space-y-2 opacity-75">
            <li><a href="/" className="hover:opacity-100">{t('footer.home')}</a></li>
            <li><a href="/browse?category=fashion" className="hover:opacity-100">{t('footer.fashion')}</a></li>
            <li><a href="/browse?category=electronics" className="hover:opacity-100">{t('footer.electronics')}</a></li>
            <li><a href="/browse?category=home" className="hover:opacity-100">{t('footer.homeCategory')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t('footer.support')}</h4>
          <ul className="text-sm space-y-2 opacity-75">
            <li><a href="/support/faq" className="hover:opacity-100">{t('footer.helpCenter')}</a></li>
            <li><a href="/support/safety" className="hover:opacity-100">{t('footer.safetyTips')}</a></li>
            <li><a href="/support/contact" className="hover:opacity-100">{t('footer.contact')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t('footer.legal')}</h4>
          <ul className="text-sm space-y-2 opacity-75">
            <li><a href="#" className="hover:opacity-100">{t('footer.terms')}</a></li>
            <li><a href="#" className="hover:opacity-100">{t('footer.privacy')}</a></li>
            <li><a href="#" className="hover:opacity-100">{t('footer.cookies')}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-accent/20 px-4 py-6 text-center text-sm opacity-75">
        {t('footer.copyright')}
      </div>
    </footer>
  );
}
