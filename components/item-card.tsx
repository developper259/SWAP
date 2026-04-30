'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ItemCardProps {
  id?: string;
  userId?: string;
  image: string;
  title: string;
  condition: string;
  rating: number;
  reviews: number;
  user: string;
  userImage: string;
}

export default function ItemCard({
  id = '1',
  userId = '1',
  image,
  title,
  condition,
  rating,
  reviews,
  user,
  userImage,
}: ItemCardProps) {
  const router = useRouter();

  return (
    <Link href={`/product?id=${id}`}>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border cursor-pointer h-full flex flex-col hover:border-primary/30">
      {/* Image */}
      <div className="w-full aspect-square bg-gradient-to-br from-secondary to-secondary/50 relative overflow-hidden flex items-center justify-center text-5xl">
        {image}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Condition */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-balance line-clamp-2">
            {title}
          </h3>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded-lg text-xs font-medium">
            {condition}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground">
            {rating} ({reviews})
          </span>
        </div>

        {/* User */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile?id=${userId}`);
          }}
          className="flex items-center gap-2 text-xs group/user w-fit cursor-pointer hover:text-primary transition-colors"
        >
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">
            {userImage}
          </div>
          <span className="text-muted-foreground group-hover/user:text-primary transition-colors">{user}</span>
        </div>

        {/* Swap Button */}
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            router.push(`/propose-exchange?item=${id}`);
          }}
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Propose Swap
        </Button>
      </div>
    </div>
    </Link>
  );
}
