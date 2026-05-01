'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';

interface LanguageWrapperProps {
  children: (t: (key: string) => string) => React.ReactNode;
}

export default function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { t } = useLanguage();
  return <>{children(t)}</>;
}
