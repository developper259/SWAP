'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ItemCard from '@/components/item-card';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/lib/language-context';

interface ProfileTabsProps {
  availableItems?: any[];
  reviews?: any[];
  bio?: string;
  preferredItems?: string[];
}

export function ProfileTabs({
  availableItems = [],
  reviews = [],
  bio = 'I love trading vintage items and unique finds. Always open to new collections!',
  preferredItems = ['Fashion', 'Vintage', 'Books'],
}: ProfileTabsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('items');

  const defaultItems = [
    {
      id: '1',
      image: '👕',
      title: 'Vintage Leather Jacket',
      condition: 'Mint',
      rating: 4.8,
      reviews: 12,
      user: 'Alex R.',
      userImage: '👨‍🔧',
    },
    {
      id: '2',
      image: '💼',
      title: 'Vintage Briefcase',
      condition: 'Good',
      rating: 4.8,
      reviews: 12,
      user: 'Alex R.',
      userImage: '👨‍🔧',
    },
    {
      id: '3',
      image: '👒',
      title: 'Retro Baseball Cap',
      condition: 'Excellent',
      rating: 4.8,
      reviews: 12,
      user: 'Alex R.',
      userImage: '👨‍🔧',
    },
  ];

  const defaultReviews = [
    {
      id: '1',
      reviewer: 'Sarah M.',
      avatar: '👩',
      rating: 5,
      comment: 'Perfect condition! Very responsive and easy to work with.',
      date: '2 weeks ago',
    },
    {
      id: '2',
      reviewer: 'James W.',
      avatar: '👨',
      rating: 5,
      comment: 'Great item, shipped quickly. Highly recommend!',
      date: '1 month ago',
    },
    {
      id: '3',
      reviewer: 'Emma L.',
      avatar: '👩',
      rating: 4,
      comment: 'Good communication, item as described.',
      date: '2 months ago',
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3 rounded-lg bg-secondary mb-6">
          <TabsTrigger value="items" className="rounded">
            {t('profileTabs.availableItems')}
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded">
            {t('profileTabs.reviews')}
          </TabsTrigger>
          <TabsTrigger value="about" className="rounded">
            {t('profileTabs.about')}
          </TabsTrigger>
        </TabsList>

        {/* Available Items Tab */}
        <TabsContent value="items" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(availableItems.length > 0 ? availableItems : defaultItems).map(item => (
              <ItemCard key={item.id} {...item} />
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <div className="space-y-4">
            {(reviews.length > 0 ? reviews : defaultReviews).map(review => (
              <div key={review.id} className="border border-border rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10 text-lg">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-foreground">{review.reviewer}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">{t('profileTabs.about')}</h3>
            <p className="text-foreground leading-relaxed">{bio}</p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">{t('profileTabs.interestedIn')}</h3>
            <div className="flex flex-wrap gap-2">
              {preferredItems.map(item => (
                <div
                  key={item}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
