import EditItemForm from '@/components/edit-item-form';

export const metadata = {
  title: 'Edit Item - Swap',
  description: 'Edit your item listing',
};

// Mock item data - would come from database in real app
const MOCK_ITEM = {
  id: '1',
  title: 'Vintage Leather Jacket',
  description: 'Beautiful vintage leather jacket from the 80s. Genuine brown leather with brass hardware and classic design. Perfect for adding a statement to any wardrobe.',
  category: 'fashion',
  condition: 'good',
  wantInExchange: 'Vintage cameras, designer bags, vintage watches',
  location: 'Portland, OR',
  images: ['🧥', '🧥', '🧥'],
  status: 'active' as const,
};

interface EditItemPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function EditItemPage({ searchParams }: EditItemPageProps) {
  const { id } = await searchParams;
  
  // In a real app, fetch item data based on id
  const item = { ...MOCK_ITEM, id: id || '1' };

  return (
    <main className="bg-background min-h-screen py-12 px-4">
      <EditItemForm item={item} />
    </main>
  );
}
