import ClientProvider from '@/components/client-provider';
import ProductClient from './product-client';

export const metadata = {
  title: 'Product - Swap',
  description: 'Trade for this item on Swap',
};

interface ProductPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default function ProductPage({ searchParams }: ProductPageProps) {
  return (
    <ClientProvider>
      <ProductClient searchParams={searchParams} />
    </ClientProvider>
  );
}
