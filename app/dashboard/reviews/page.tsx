import { Star } from 'lucide-react';

interface Review {
  id: string;
  reviewer: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    reviewer: 'Sarah Chen',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'Great communication and item was exactly as described. Highly recommended!',
    date: '2 weeks ago',
  },
  {
    id: '2',
    reviewer: 'Mike Johnson',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Perfect trade partner. Fast shipping and item arrived in pristine condition.',
    date: '1 month ago',
  },
  {
    id: '3',
    reviewer: 'Emma Wilson',
    avatar: '👩‍🎨',
    rating: 4,
    text: 'Good trader overall. Slight delay in shipping but communicated well.',
    date: '2 months ago',
  },
];

export default function ReviewsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Reviews</h1>
        <p className="text-muted-foreground">See what other traders think about you</p>
      </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Average Rating</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-foreground">4.8</span>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Reviews</p>
            <p className="text-3xl font-bold text-foreground">23</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm text-muted-foreground mb-2">Positive Rate</p>
            <p className="text-3xl font-bold text-foreground">100%</p>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Reviews</h2>
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.reviewer}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-foreground leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
