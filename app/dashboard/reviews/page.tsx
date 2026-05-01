import ClientProvider from '@/components/client-provider';
import ReviewsClient from '@/components/reviews-client';

export default function ReviewsPage() {
  return (
    <ClientProvider>
      <ReviewsClient />
    </ClientProvider>
  );
}
