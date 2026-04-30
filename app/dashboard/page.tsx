import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/dashboard-sidebar';
import DashboardHeader from '@/components/dashboard-header';
import InventoryGrid from '@/components/inventory-grid';
import ActiveTradesList from '@/components/active-trades';

export const metadata = {
  title: 'Dashboard - Swap',
  description: 'Manage your items and active trades',
};

export default function DashboardPage() {
  return (
    <main className="bg-background flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header with Stats */}
        <DashboardHeader />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
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
      </div>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground gap-2 md:bottom-8 md:right-8"
      >
        <Plus className="w-5 h-5" />
        Add New Item
      </Button>
    </main>
  );
}
