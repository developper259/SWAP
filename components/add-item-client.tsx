'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AddItemForm from '@/components/add-item-form';
import { useLanguage } from '@/lib/language-context';

export default function AddItemClient() {
  const { t } = useLanguage();
  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/dashboard" className="mb-8 inline-block">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('addItemPage.back')}
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t('addItemPage.title')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('addItemPage.subtitle')}
          </p>
        </div>

        {/* Form */}
        <AddItemForm />
      </div>
    </main>
  );
}
