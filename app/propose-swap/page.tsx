'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/lib/language-context';

interface TradeItem {
  id: string;
  image: string;
  title: string;
  condition: string;
}

// Mock data for the trade
const YOUR_ITEMS: TradeItem[] = [
  { id: '1', image: '🧥', title: 'Vintage Leather Jacket', condition: 'Good' },
];

const THEIR_ITEMS: TradeItem[] = [
  { id: '2', image: '📷', title: 'Canon EOS Camera', condition: 'Like New' },
];

const TRADER_INFO = {
  name: 'Sarah Chen',
  avatar: '👩',
  rating: 4.9,
  trades: 47,
  memberSince: '2022',
};

export default function ProposeExchangePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmProposal = () => {
    if (!agreedToTerms) {
      alert(t('proposeSwapPage.pleaseAgreeTerms'));
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('[v0] Proposal confirmed');
      alert(t('proposeSwapPage.proposalSent'));
      router.push('/chat');
    }, 1000);
  };

  return (
    <main className="bg-background min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/chat" className="mb-6 inline-block">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('proposeSwapPage.backToChat')}
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('proposeSwapPage.title')}</h1>
          <p className="text-muted-foreground">
            {t('proposeSwapPage.subtitle')}
          </p>
        </div>

        {/* Trade Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* What You Give */}
          <Card className="rounded-2xl border-border overflow-hidden">
            <div className="bg-secondary/50 px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-destructive" />
                {t('proposeSwapPage.whatYouGive')}
              </h2>
            </div>
            <CardContent className="p-6 space-y-4">
              {YOUR_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl"
                >
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              
              {YOUR_ITEMS.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{t('proposeSwapPage.noItemsSelected')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* What You Receive */}
          <Card className="rounded-2xl border-border overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-primary" />
                {t('proposeSwapPage.whatYouReceive')}
              </h2>
            </div>
            <CardContent className="p-6 space-y-4">
              {THEIR_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10"
                >
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl shrink-0">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              
              {THEIR_ITEMS.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>{t('proposeSwapPage.noItemsFromTrader')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Trading With Card */}
        <Card className="rounded-2xl border-border mb-8">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">{t('proposeSwapPage.tradingWith')}</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-2xl">
                {TRADER_INFO.avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{TRADER_INFO.name}</h4>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="text-amber-500">★</span> {TRADER_INFO.rating}
                  </span>
                  <span>{TRADER_INFO.trades} {t('proposeSwapPage.trades')}</span>
                  <span>{t('proposeSwapPage.memberSince')} {TRADER_INFO.memberSince}</span>
                </div>
              </div>
              <Link href={`/profile?id=u1`}>
                <Button variant="outline" size="sm" className="rounded-lg">
                  {t('proposeSwapPage.viewProfile')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Safety Notice */}
        <Card className="rounded-2xl border-primary/20 bg-primary/5 mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Shield className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t('proposeSwapPage.tradeSafely')}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{t('proposeSwapPage.safetyTip1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{t('proposeSwapPage.safetyTip2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{t('proposeSwapPage.safetyTip3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Agreement */}
        <div className="flex items-start gap-3 mb-8 p-4 bg-secondary/30 rounded-xl">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            className="mt-0.5"
          />
          <label htmlFor="terms" className="text-sm text-foreground cursor-pointer">
            Je comprends que cette proposition n'est pas finale tant que l'autre partie ne l'accepte pas. 
            J'accepte les{' '}
            <Link href="/terms" className="text-primary hover:underline">
              {t('proposeSwapPage.tradingTerms')}
            </Link>{' '}
            et{' '}
            <Link href="/safety" className="text-primary hover:underline">
              {t('proposeSwapPage.safetyGuidelines')}
            </Link>
            .
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/chat" className="sm:flex-1">
            <Button
              variant="outline"
              className="w-full rounded-xl border-border text-foreground hover:bg-secondary h-12"
            >
              {t('proposeSwapPage.modifyOffer')}
            </Button>
          </Link>
          <Button
            onClick={handleConfirmProposal}
            disabled={!agreedToTerms || isSubmitting}
            className="sm:flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">{t('proposeSwapPage.sending')}</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                {t('proposeSwapPage.confirmProposal')}
              </>
            )}
          </Button>
        </div>

        {/* Warning Note */}
        <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            {t('proposeSwapPage.warningNote')}
          </p>
        </div>
      </div>
    </main>
  );
}
