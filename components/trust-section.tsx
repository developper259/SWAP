'use client';

import { Package, MessageSquare, Truck } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function TrustSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Package,
      title: t('trustSection.step1.title'),
      description: t('trustSection.step1.description'),
    },
    {
      icon: MessageSquare,
      title: t('trustSection.step2.title'),
      description: t('trustSection.step2.description'),
    },
    {
      icon: Truck,
      title: t('trustSection.step3.title'),
      description: t('trustSection.step3.description'),
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t('trustSection.title')}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t('trustSection.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-primary" />
              </div>

              {/* Step Number */}
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-4">
                {index + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
