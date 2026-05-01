'use client';

import Link from 'next/link';
import { Bell, User, Plus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/search-bar';
import { useLanguage } from '@/lib/language-context';

export default function Navbar() {
  const { t } = useLanguage();
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">♻</span>
          </div>
          <span className="font-bold text-lg text-foreground">Swap</span>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="default"
            className="hidden md:flex gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/add-item">
              <Plus className="w-4 h-4" />
              {t('navbar.listItem')}
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-secondary"
          >
            <Link href="/chat">
              <MessageCircle className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-secondary"
          >
            <Bell className="w-5 h-5" />
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-secondary"
          >
            <Link href="/dashboard">
              <User className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
