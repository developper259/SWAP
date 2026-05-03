'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, ArrowRight, Check, Plus, User, Star, MessageSquare 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/lib/language-context';

interface InventoryItem {
  id: string;
  image: string;
  title: string;
  condition: string;
}

interface TargetItem {
  id: string;
  image: string;
  title: string;
  owner: string;
  ownerAvatar: string;
  ownerRating: number;
  condition: string;
}

// Mock data
const USER_INVENTORY: InventoryItem[] = [
  { id: '1', image: '🧥', title: 'Vintage Leather Jacket', condition: 'Good' },
  { id: '2', image: '👟', title: 'Air Jordan 1s', condition: 'New' },
  { id: '3', image: '📷', title: 'Canon EOS Camera', condition: 'Like New' },
  { id: '4', image: '🎮', title: 'PS5 Controller', condition: 'Fair' },
  { id: '5', image: '👜', title: 'Designer Handbag', condition: 'Good' },
  { id: '6', image: '⌚', title: 'Smart Watch', condition: 'New' },
  { id: '7', image: '🎧', title: 'Wireless Headphones', condition: 'Good' },
  { id: '8', image: '📱', title: 'iPhone 12', condition: 'Fair' },
];

const TARGET_ITEM: TargetItem = {
  id: 't1',
  image: '💻',
  title: 'MacBook Pro 2020',
  owner: 'Sarah Chen',
  ownerAvatar: '👩',
  ownerRating: 4.9,
  condition: 'Like New',
};

export default function MakeOfferPage() {
  const { t } = useLanguage();

  const STEPS = [
    { id: 1, title: t('makeOfferPage.step1.title'), description: t('makeOfferPage.step1.description') },
    { id: 2, title: t('makeOfferPage.step2.title'), description: t('makeOfferPage.step2.description') },
    { id: 3, title: t('makeOfferPage.step3.title'), description: t('makeOfferPage.step3.description') },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetItemId = searchParams.get('item') || 't1';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedItemsData = USER_INVENTORY.filter(item =>
    selectedItems.includes(item.id)
  );

  const handleNext = () => {
    if (currentStep === 1 && selectedItems.length === 0) {
      alert(t('makeOfferPage.pleaseSelectItem'));
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendOffer = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Swap offer sent:', {
        give: selectedItems,
        message,
        receive: targetItemId,
      });
      alert(t('makeOfferPage.offerSent'));
      router.push('/chat');
    }, 1000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Target Item Display */}
            <Card className="rounded-xl border-[#1A4D2E]/20 bg-[#1A4D2E]/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-4xl border border-border">
                    {TARGET_ITEM.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{TARGET_ITEM.title}</h3>
                    <Badge className="mt-1 bg-[#1A4D2E]/10 text-[#1A4D2E] text-xs">{TARGET_ITEM.condition}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Selection */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{t('makeOfferPage.selectItemsToOffer')}</h3>
              <Card className="rounded-xl border-border">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {USER_INVENTORY.map((item) => {
                      const isSelected = selectedItems.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleItemSelection(item.id)}
                          className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-[#1A4D2E] bg-[#1A4D2E]/5'
                              : 'border-border bg-card hover:border-[#1A4D2E]/30 hover:bg-secondary/30'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[#1A4D2E] rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="w-full aspect-square bg-secondary rounded-md flex items-center justify-center text-3xl mb-2">
                            {item.image}
                          </div>
                          <p className="font-medium text-foreground text-sm truncate">{item.title}</p>
                          <div className="mt-1">
                            <Badge variant="outline" className="text-xs">{t(`itemCard.condition.${item.condition.toLowerCase().replace(' ', '')}`)}</Badge>
                          </div>
                        </button>
                      );
                    })}
                    <Link href="/add-item" className="block">
                      <div className="p-3 rounded-lg border-2 border-dashed border-[#1A4D2E]/30 bg-[#1A4D2E]/5 hover:border-[#1A4D2E]/50 hover:bg-[#1A4D2E]/10 transition-all h-full flex flex-col items-center justify-center min-h-[160px]">
                        <div className="w-10 h-10 bg-[#1A4D2E]/10 rounded-full flex items-center justify-center mb-2">
                          <Plus className="w-5 h-5 text-[#1A4D2E]" />
                        </div>
                        <p className="text-sm text-[#1A4D2E] text-center">{t('makeOfferPage.addMoreItems')}</p>
                      </div>
                    </Link>
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Selected Items Summary */}
            <Card className="rounded-xl border-border">
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground">Résumé de votre offre</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedItemsData.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl border border-border">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">{t(`itemCard.condition.${item.condition.toLowerCase().replace(' ', '')}`)}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleItemSelection(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {selectedItems.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No items selected</p>
                )}
              </CardContent>
            </Card>


            {/* Message */}
            <Card className="rounded-xl border-border">
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {t('makeOfferPage.messageToOwner')}
                </h3>
                <p className="text-sm text-muted-foreground">{t('makeOfferPage.addFriendlyNote')}</p>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={t('makeOfferPage.messagePlaceholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-lg bg-secondary border-0 min-h-[120px] resize-none"
                />
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Trade Summary */}
            <Card className="rounded-xl border-[#1A4D2E]/20 bg-[#1A4D2E]/5">
              <CardHeader>
                <h3 className="text-xl font-bold text-foreground">{t('makeOfferPage.tradeSummary')}</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Exchange Visual */}
                <div className="flex items-start justify-center gap-8">
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-2">{t('makeOfferPage.youGive')}</p>
                    <div className="space-y-2">
                      {selectedItemsData.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm border border-border flex-shrink-0">
                            {item.image}
                          </div>
                          <span className="text-xs font-medium">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center mt-6">
                    <ArrowRight className="w-6 h-6 text-[#1A4D2E]" />
                    <span className="text-xs text-[#1A4D2E] font-medium">{t('makeOfferPage.for')}</span>
                    <ArrowRight className="w-6 h-6 text-[#1A4D2E]" />
                  </div>
                  
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground mb-2">{t('makeOfferPage.youReceive')}</p>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl border border-border flex-shrink-0">
                        {TARGET_ITEM.image}
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-medium">{TARGET_ITEM.title}</span>
                        <div>
                          <Badge className="bg-[#1A4D2E]/10 text-[#1A4D2E] text-xs">{TARGET_ITEM.condition}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                {/* Message Preview */}
                {message && (
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium text-foreground mb-2">{t('makeOfferPage.yourMessage')}:</p>
                    <p className="text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg">{message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/browse">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 rounded-lg text-foreground hover:bg-secondary"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('makeOfferPage.back')}
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('makeOfferPage.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('makeOfferPage.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep >= step.id
                        ? 'bg-[#1A4D2E] text-white'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-colors ${
                      currentStep > step.id ? 'bg-[#1A4D2E]' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {renderStepContent()}
      </div>

      {/* Navigation Footer */}
      <div className="w-full bg-card border-t border-border shadow-lg -mb-16">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="rounded-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('makeOfferPage.previous')}
            </Button>

            {currentStep === 3 ? (
              <Button
                onClick={handleSendOffer}
                disabled={isSubmitting}
                className="rounded-lg px-8"
                style={{ backgroundColor: '#1A4D2E' }}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">{t('makeOfferPage.sending')}</span>
                ) : (
                  <>
                    {t('makeOfferPage.sendSwapOffer')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="rounded-lg px-8"
                style={{ backgroundColor: '#1A4D2E' }}
              >
                {t('makeOfferPage.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
