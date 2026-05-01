import ClientProvider from '@/components/client-provider';
import DashboardClient from '@/components/dashboard-client';

export const metadata = {
  title: 'Dashboard - Swap',
  description: 'Manage your items and active trades',
};

export default function DashboardPage() {
  return (
    <ClientProvider>
      <DashboardClient />
    </ClientProvider>
  );
}
