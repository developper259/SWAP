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

export const metadata = {
  title: 'Product - Swap',
  description: 'Trade for this item on Swap',
};

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

interface ProductPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const { id = '1' } = await searchParams;
  const product = PRODUCTS[id] || PRODUCTS['1'];

  const SAFETY_TIPS = [
    'Meet in a safe public location',
    'Inspect the item before trading',
    'Agree on trade details beforehand',
    'Use Swap\'s messaging for all communication',
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
              <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">Home</BreadcrumbLink>
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
              <p className="text-sm text-muted-foreground">Added 2 days ago</p>
            </div>

            {/* Condition Badge */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">CONDITION</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {product.condition}
                </Badge>
                <p className="text-sm text-muted-foreground">Worn several times, minor signs of use</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">DESCRIPTION</p>
              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="border border-border rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">{key}</p>
                  <p className="font-semibold text-foreground">{value}</p>
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
                  Make a Trade Offer
                </Button>
              </Link>
              <Link href="/chat" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-lg border-border text-foreground hover:bg-secondary"
                >
                  Message Seller
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
