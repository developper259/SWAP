import { ProfileHeader } from '@/components/profile-header';
import { ProfileTabs } from '@/components/profile-tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
    <main className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/browse" className="mb-6 inline-block">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>

        {/* Profile Header */}
        <ProfileHeader
          userName={user.userName}
          userAvatar={user.userAvatar}
          memberSince={user.memberSince}
          location={user.location}
          successfulSwaps={user.successfulSwaps}
          rating={user.rating}
          responseTime={user.responseTime}
          verified={user.verified}
        />

        {/* Profile Tabs */}
        <ProfileTabs
          bio={user.bio}
          preferredItems={user.preferredItems}
        />
      </div>
    </main>
  );
}
