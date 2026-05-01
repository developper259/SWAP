import ClientProvider from '@/components/client-provider';
import ProfileClient from '@/components/profile-client';

interface UserProfilePageProps {
  searchParams: Promise<{ id?: string }>;
}

export const metadata = {
  title: 'User Profile - Swap',
  description: 'View user profile and trading history',
};

export default async function UserProfilePage({ searchParams }: UserProfilePageProps) {
  const { id = '1' } = await searchParams;

  // Mock user data
  const USERS: Record<string, any> = {
    '1': {
      id: '1',
      userName: 'Alex Rivera',
      userAvatar: '👨‍🔧',
      memberSince: 'January 2022',
      location: 'Portland, OR',
      successfulSwaps: 47,
      rating: 4.9,
      responseTime: '1 hour',
      verified: true,
      bio: 'I love trading vintage items and unique finds. Always open to new collections! I prefer authentic, well-kept pieces.',
      preferredItems: ['Fashion', 'Vintage', 'Books', 'Collectibles'],
    },
    '2': {
      id: '2',
      userName: 'Sarah Mitchell',
      userAvatar: '👩‍💼',
      memberSince: 'March 2021',
      location: 'San Francisco, CA',
      successfulSwaps: 62,
      rating: 4.8,
      responseTime: '2 hours',
      verified: true,
      bio: 'Fashion enthusiast and sustainable living advocate. Trading modern and vintage clothing.',
      preferredItems: ['Fashion', 'Accessories', 'Home Decor'],
    },
  };

  const user = USERS[id] || USERS['1'];

  return (
    <ClientProvider>
      <ProfileClient user={user} />
    </ClientProvider>
  );
}
