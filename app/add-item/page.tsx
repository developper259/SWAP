import ClientProvider from '@/components/client-provider';
import AddItemClient from '@/components/add-item-client';

export const metadata = {
  title: 'List an Item - Swap',
  description: 'List a new item for trading',
};

export default function AddItemPage() {
  return (
    <ClientProvider>
      <AddItemClient />
    </ClientProvider>
  );
}
