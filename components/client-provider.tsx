'use client';

import { LanguageProvider } from '@/lib/language-context';

interface ClientProviderProps {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
