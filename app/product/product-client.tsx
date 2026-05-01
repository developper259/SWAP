'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import ProductImageGallery, {
  UserProfileCard,
  SafetyBox,
  RelatedItems,
} from '@/components/product-detail-components';
import { useLanguage } from '@/lib/language-context';

// Mock data for different products
const PRODUCTS: Record<string, any> = {
  '1': {
    id: '1',
    userId: 'u1',
    image: '🧥',
    title: 'Vintage Leather Jacket',
    condition: 'Good',
    rating: 4.8,
    reviews: 24,
    user: 'Alex Rivera',
    userImage: '👨‍🔧',
    avatar: '👨‍🔧',
    category: 'Fashion',
    subcategory: 'Jackets',
    description: 'Beautiful vintage leather jacket from the 80s. Genuine brown leather with brass hardware and classic design. Perfect for adding a statement to any wardrobe. Size M. No major defects, just natural aging patina that adds to the vintage appeal.',
    details: { Size: 'Medium', Material: 'Leather', Era: '1980s' },
    location: 'Portland, OR',
    responseTime: '1 hour',
    images: ['🧥', '🧥', '🧥', '🧥'],
  },
  '2': {
    id: '2',
    userId: 'u2',
    image: '👗',
    title: 'Denim Jacket',
    condition: 'Good',
    rating: 4.7,
    reviews: 18,
    user: 'Jordan Smith',
    userImage: '👩‍💼',
    avatar: '👩‍💼',
    category: 'Fashion',
    subcategory: 'Jackets',
    description: 'Classic blue denim jacket, perfect condition. Levi\'s style, fits like a dream. Lightly worn, no stains or damage.',
    details: { Size: 'Small', Material: 'Denim', Era: '1990s' },
    location: 'Seattle, WA',
    responseTime: '30 mins',
    images: ['👗', '👗', '👗', '👗'],
  },
  '3': {
    id: '3',
    userId: 'u3',
    image: '👔',
    title: 'Vintage Blazer',
    condition: 'Fair',
    rating: 4.5,
    reviews: 12,
    user: 'Morgan Lee',
    userImage: '👨‍🎓',
    avatar: '👨‍🎓',
    category: 'Fashion',
    subcategory: 'Outerwear',
    description: 'Elegant vintage blazer with subtle patterns. Shows some wear but still stylish and functional.',
    details: { Size: 'Medium', Material: 'Wool Blend', Era: '1970s' },
    location: 'Austin, TX',
    responseTime: '2 hours',
    images: ['👔', '👔', '👔', '👔'],
  },
  '4': {
    id: '4',
    userId: 'u4',
    image: '👕',
    title: 'Band T-Shirt',
    condition: 'New',
    rating: 4.9,
    reviews: 35,
    user: 'Casey Taylor',
    userImage: '🎸',
    avatar: '🎸',
    category: 'Fashion',
    subcategory: 'Tops',
    description: 'Rare band merchandise T-shirt, never worn. Perfect condition, original tags still attached.',
    details: { Size: 'Large', Material: 'Cotton', Era: '2000s' },
    location: 'Nashville, TN',
    responseTime: '45 mins',
    images: ['👕', '👕', '👕', '👕'],
  },
};

interface ProductClientProps {
  searchParams: Promise<{ id?: string }>;
}

export default function ProductClient({ searchParams }: ProductClientProps) {
  const { t } = useLanguage();
  const [id, setId] = useState('1');
  
  useEffect(() => {
    searchParams.then(params => {
      setId(params.id || '1');
    });
  }, [searchParams]);
  
  const product = PRODUCTS[id] || PRODUCTS['1'];

  const SAFETY_TIPS = [
    t('productPage.safetyTips.meetPublic'),
    t('productPage.safetyTips.inspectItem'),
    t('productPage.safetyTips.agreeDetails'),
    t('productPage.safetyTips.useMessaging'),
  ];

  const RELATED_ITEMS = [
    { id: '1', image: '👗', title: 'Denim Jacket', condition: 'Good' },
    { id: '2', image: '👔', title: 'Vintage Blazer', condition: 'Fair' },
    { id: '3', image: '👕', title: 'Band T-Shirt', condition: 'New' },
    { id: '4', image: '🧢', title: 'Vintage Cap', condition: 'Good' },
  ];

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">{t('productPage.breadcrumb.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-border" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/browse?cat=fashion" className="text-muted-foreground hover:text-foreground">{product.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-border" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">{product.subcategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Image Gallery */}
          <div>
            <ProductImageGallery
              images={product.images}
              title={product.title}
            />
          </div>

          {/* Right Column - Item Information */}
          <div className="space-y-6">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-4xl font-bold text-foreground">
                  {product.title}
                </h1>
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Heart className="w-6 h-6 text-muted-foreground hover:text-primary" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">{t('productPage.addedTime')}</p>
            </div>

            {/* Condition Badge */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">{t('product.condition')}</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {product.condition}
                </Badge>
                <p className="text-sm text-muted-foreground">{t('productPage.conditionNote')}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">{t('product.description')}</p>
              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">{t('product.details')}</p>
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="border border-border rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">{t(`productPage.details.${key.toLowerCase()}`)}</p>
                  <p className="font-semibold text-foreground">{String(value)}</p>
                </div>
              ))}
            </div>

            {/* User Profile Card */}
            <UserProfileCard
              userId={product.userId}
              name={product.user}
              rating={product.rating}
              reviews={product.reviews}
              location={product.location}
              responseTime={product.responseTime}
              avatar={product.avatar}
            />

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2">
              <Link href={`/make-offer?item=${product.id}`}>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
              {t('product.makeTradeOffer')}
                </Button>
              </Link>
              <Link href="/chat" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-lg border-border text-foreground hover:bg-secondary"
                >
              {t('product.messageSeller')}
                </Button>
              </Link>
            </div>

            {/* Safety Box */}
            <SafetyBox tips={SAFETY_TIPS} />
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-16">
          <RelatedItems items={RELATED_ITEMS} />
        </div>
      </div>
    </main>
  );
}
