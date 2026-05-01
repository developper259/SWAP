'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
      {/* Left Side - Content */}
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
            {t('home.title')}
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            {t('home.subtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {t('home.startTrading')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-border hover:bg-secondary"
          >
            {t('home.learnHow')}
          </Button>
        </div>

        <div className="flex gap-6 text-sm text-muted-foreground pt-4">
          <div>
            <span className="font-semibold text-foreground">15K+</span> {t('home.itemsListed')}
          </div>
          <div>
            <span className="font-semibold text-foreground">8K+</span> {t('home.activeTraders')}
          </div>
        </div>
      </div>

      {/* Right Side - Visual Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl aspect-square flex items-center justify-center">
          <span className="text-4xl">👕</span>
        </div>
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl aspect-square flex items-center justify-center">
          <span className="text-4xl">💻</span>
        </div>
        <div className="bg-gradient-to-br from-secondary to-secondary rounded-2xl aspect-square flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl aspect-square flex items-center justify-center">
          <span className="text-4xl">🏠</span>
        </div>
      </div>
    </section>
  );
}
