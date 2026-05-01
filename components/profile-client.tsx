'use client';

import { ProfileHeader } from '@/components/profile-header';
import { ProfileTabs } from '@/components/profile-tabs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface ProfileClientProps {
  user: any;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const { t } = useLanguage();
  
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
            {t('profileClient.back')}
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
