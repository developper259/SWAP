'use client';

import { Plus } from 'lucide-react';
import DashboardHeader from '@/components/dashboard-header';
import InventoryGrid from '@/components/inventory-grid';
import ActiveTradesList from '@/components/active-trades';
import Link from "next/link"
import { useLanguage } from '@/lib/language-context';

export default function DashboardClient() {
  const { t } = useLanguage();
  return (
    <>
      {/* Header with Stats */}
      <DashboardHeader />

      {/* Content */}
      <div className="space-y-12">
        <div className="space-y-12">
          {/* Inventory Section */}
          <div>
            <InventoryGrid />
          </div>

          {/* Active Trades Section */}
          <div>
            <ActiveTradesList />
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Link
        href="/add-item"
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground gap-2 md:bottom-8 md:right-8 inline-flex items-center justify-center px-4 py-3"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden md:inline-block">{t('dashboard.addNewItem')}</span>
      </Link>
    </>
  );
}
