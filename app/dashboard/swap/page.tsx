import ClientProvider from '@/components/client-provider';
import TradesClient from '@/components/trades-client';

export default function TradesPage() {
  return (
    <ClientProvider>
      <TradesClient />
    </ClientProvider>
  );
}
