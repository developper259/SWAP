'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Clock, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="w-full aspect-square rounded-2xl bg-secondary flex items-center justify-center text-6xl">
        {mainImage}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
              mainImage === img
                ? 'bg-primary/20 border-2 border-primary'
                : 'bg-secondary border-2 border-border hover:border-primary/50'
            }`}
          >
            {img}
          </button>
        ))}
      </div>
    </div>
  );
}

interface UserProfileCardProps {
  userId?: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  responseTime: string;
  avatar: string;
}

export function UserProfileCard({
  userId = '1',
  name,
  rating,
  reviews,
  location,
  responseTime,
  avatar,
}: UserProfileCardProps) {
  const { t } = useLanguage();
  
  return (
    <div className="border border-border rounded-2xl p-4 bg-card">
      <Link href={`/profile?id=${userId}`} className="flex items-start gap-3 mb-4 group/profile">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
          {avatar}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground group-hover/profile:text-primary transition-colors">{name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
          </div>
        </div>
      </Link>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Usually responds in {responseTime}</span>
        </div>
      </div>

      <Link href={`/profile?id=${userId}`}>
        <Button
          variant="outline"
          className="w-full mt-4 rounded-lg border-border text-foreground hover:bg-secondary"
        >
          {t('productDetail.viewProfile')}
        </Button>
      </Link>
    </div>
  );
}

interface SafetyBoxProps {
  tips: string[];
}

export function SafetyBox({ tips }: SafetyBoxProps) {
  const { t } = useLanguage();
  
  return (
    <div className="border border-green-200 bg-green-50 rounded-2xl p-4">
      <div className="flex gap-3">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-green-900 mb-2">{t('productDetail.safetyFirst')}</h4>
          <ul className="space-y-1 text-sm text-green-800">
            {tips.map((tip, idx) => (
              <li key={idx} className="flex gap-2">
                <span>•</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface RelatedItemsProps {
  items: Array<{
    id: string;
    image: string;
    title: string;
    condition: string;
  }>;
}

export function RelatedItems({ items }: RelatedItemsProps) {
  const { t } = useLanguage();
  
  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-4">{t('productDetail.relatedItems')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-full aspect-square bg-secondary flex items-center justify-center text-3xl">
              {item.image}
            </div>
            <div className="p-3">
              <p className="font-semibold text-foreground text-sm">{item.title}</p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {item.condition}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
