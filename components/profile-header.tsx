import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/lib/language-context';

interface ProfileHeaderProps {
  userName?: string;
  userAvatar?: string;
  memberSince?: string;
  location?: string;
  successfulSwaps?: number;
  rating?: number;
  responseTime?: string;
  verified?: boolean;
}

export function ProfileHeader({
  userName = 'Alex Rivera',
  userAvatar = '👨‍🔧',
  memberSince = 'January 2022',
  location = 'Portland, OR',
  successfulSwaps = 47,
  rating = 4.9,
  responseTime = '1 heure',
  verified = true,
}: ProfileHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="bg-card border border-border rounded-2xl p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        {/* Left: Avatar and Basic Info */}
        <div className="flex gap-6 items-start">
          <Avatar className="w-24 h-24 text-3xl">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userAvatar}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{userName}</h1>
              {verified && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {t('profileHeader.verified')}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t('profileHeader.memberSince')} {memberSince}
            </p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Trust Metrics and Actions */}
        <div className="space-y-4 w-full md:w-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-background rounded-lg p-3">
              <p className="text-2xl font-bold text-primary">{successfulSwaps}</p>
              <p className="text-xs text-muted-foreground">{t('profileHeader.successfulSwaps')}</p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <p className="text-2xl font-bold text-primary">{rating}</p>
              <p className="text-xs text-muted-foreground">{t('profileHeader.rating')}</p>
            </div>
            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">{t('profileHeader.responseTime')}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-lg">
              <MessageCircle className="w-4 h-4" />
              {t('profileHeader.message')}
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-lg border-border hover:bg-secondary"
            >
              {t('profileHeader.follow')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
