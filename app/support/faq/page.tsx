'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/language-context';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  icon: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    name: 'Shipping',
    icon: '📦',
    items: [
      {
        question: 'How does shipping work on Swap?',
        answer: 'When you agree on a trade, both parties are responsible for shipping their items. We recommend using tracked shipping methods and keeping receipts until both parties confirm receipt. You can coordinate shipping details through our in-app messaging system.',
      },
      {
        question: 'Who pays for shipping?',
        answer: 'Typically, each party pays for shipping their own item. However, this can be negotiated as part of the trade agreement. Some users offer to cover shipping for higher-value trades or as a gesture of goodwill.',
      },
      {
        question: 'What if my item is damaged during shipping?',
        answer: 'We strongly recommend using insured shipping for valuable items. If an item arrives damaged, document it immediately with photos and contact the other party through our messaging system. For unresolved disputes, our support team can help mediate.',
      },
      {
        question: 'Can I ship internationally?',
        answer: 'Yes! Swap supports international trading. Make sure to discuss shipping costs and customs requirements with your trading partner before finalizing the agreement. Be aware that some items may have import/export restrictions.',
      },
      {
        question: 'How long should shipping take?',
        answer: 'Domestic shipping typically takes 3-7 business days. International shipping can take 1-4 weeks depending on the destination. We recommend agreeing on a shipping timeline with your trading partner and sharing tracking information.',
      },
    ],
  },
  {
    name: 'Trading Rules',
    icon: '⚖️',
    items: [
      {
        question: 'What items can I trade?',
        answer: 'You can trade most legal, non-prohibited items including clothing, electronics, books, collectibles, home goods, and more. Items must be accurately described and in the condition stated. Prohibited items include weapons, illegal substances, counterfeit goods, and adult content.',
      },
      {
        question: 'How do I know if a trade is fair?',
        answer: 'Research similar items on our platform and other marketplaces to estimate fair value. Consider factors like condition, brand, age, and market demand. Our messaging system lets you negotiate and ask questions before agreeing to a trade.',
      },
      {
        question: 'Can I cancel a trade after agreeing?',
        answer: 'Once both parties agree to a trade, you should honor the commitment. If you must cancel, communicate immediately and respectfully with your trading partner. Repeated cancellations may affect your account standing and reputation.',
      },
      {
        question: 'What happens if someone misrepresents an item?',
        answer: 'Report the issue through our support system with photos and documentation. We take misrepresentation seriously and may suspend accounts that violate our policies. Always check reviews and profiles before trading.',
      },
      {
        question: 'Are there fees for trading?',
        answer: 'Swap is free to use for basic trading. We offer optional premium features like highlighted listings and priority support for a small monthly fee. There are no transaction fees or commissions on trades.',
      },
    ],
  },
  {
    name: 'My Account',
    icon: '👤',
    items: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Sign Up" and provide your email, create a password, and choose a username. You can also sign up using Google or Apple for faster registration. Complete your profile by adding a photo and bio to build trust with other traders.',
      },
      {
        question: 'How do I edit my profile?',
        answer: 'Go to your Dashboard and click on your profile picture or username. From there, you can update your photo, bio, location, and preferences. Keeping your profile updated helps build trust with potential trading partners.',
      },
      {
        question: 'How do I delete my account?',
        answer: 'Go to Dashboard > Settings > Account and scroll to "Delete Account." Note that this action is permanent and will remove all your listings, trade history, and reviews. Complete any pending trades before deletion.',
      },
      {
        question: 'What do the verification badges mean?',
        answer: 'Verified badges indicate that a user has confirmed their identity through our verification process. This includes email verification, phone verification, and optional ID verification. Verified users tend to have more successful trades.',
      },
      {
        question: 'How do I change my password?',
        answer: 'Go to Dashboard > Settings > Security and click "Change Password." You\'ll need to enter your current password and choose a new one. We recommend using a strong, unique password and enabling two-factor authentication.',
      },
      {
        question: 'Can I block another user?',
        answer: 'Yes. Go to the user\'s profile and click the three-dot menu, then select "Block User." Blocked users cannot message you or view your listings. You can manage blocked users in your account settings.',
      },
    ],
  },
  {
    name: 'Payments & Premium',
    icon: '💳',
    items: [
      {
        question: 'Do I need to pay to use Swap?',
        answer: 'No! Swap is completely free for basic trading. You can list items, browse, message other users, and complete trades without any fees. Premium features are optional and provide enhanced visibility and support.',
      },
      {
        question: 'What are Premium features?',
        answer: 'Premium includes highlighted listings in search results, priority customer support, advanced analytics on your listings, and early access to new features. Premium subscribers also get a special badge on their profile.',
      },
      {
        question: 'How do I cancel my Premium subscription?',
        answer: 'Go to Dashboard > Settings > Subscription and click "Cancel Premium." Your premium features will remain active until the end of your current billing period. You can resubscribe at any time.',
      },
    ],
  },
];

export default function FAQPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const FAQ_DATA = [
    {
      name: t('faq.categories.shipping'),
      icon: '📦',
      items: [
        {
          question: t('faq.shipping.howItWorks.question'),
          answer: t('faq.shipping.howItWorks.answer'),
        },
        {
          question: t('faq.shipping.whoPays.question'),
          answer: t('faq.shipping.whoPays.answer'),
        },
        {
          question: t('faq.shipping.damaged.question'),
          answer: t('faq.shipping.damaged.answer'),
        },
        {
          question: t('faq.shipping.international.question'),
          answer: t('faq.shipping.international.answer'),
        },
        {
          question: t('faq.shipping.timeline.question'),
          answer: t('faq.shipping.timeline.answer'),
        },
      ],
    },
    {
      name: t('faq.categories.trading'),
      icon: '🔄',
      items: [
        {
          question: t('faq.trading.howItWorks.question'),
          answer: t('faq.trading.howItWorks.answer'),
        },
        {
          question: t('faq.trading.safety.question'),
          answer: t('faq.trading.safety.answer'),
        },
        {
          question: t('faq.trading.disputes.question'),
          answer: t('faq.trading.disputes.answer'),
        },
        {
          question: t('faq.trading.misrepresentation.question'),
          answer: t('faq.trading.misrepresentation.answer'),
        },
        {
          question: t('faq.trading.fees.question'),
          answer: t('faq.trading.fees.answer'),
        },
      ],
    },
    {
      name: t('faq.categories.account'),
      icon: '👤',
      items: [
        {
          question: t('faq.account.create.question'),
          answer: t('faq.account.create.answer'),
        },
        {
          question: t('faq.account.editProfile.question'),
          answer: t('faq.account.editProfile.answer'),
        },
        {
          question: t('faq.account.delete.question'),
          answer: t('faq.account.delete.answer'),
        },
        {
          question: t('faq.account.verification.question'),
          answer: t('faq.account.verification.answer'),
        },
        {
          question: t('faq.account.changePassword.question'),
          answer: t('faq.account.changePassword.answer'),
        },
        {
          question: t('faq.account.blockUser.question'),
          answer: t('faq.account.blockUser.answer'),
        },
      ],
    },
    {
      name: t('faq.categories.premium'),
      icon: '⭐',
      items: [
        {
          question: t('faq.pricing.free.question'),
          answer: t('faq.pricing.free.answer'),
        },
        {
          question: t('faq.pricing.features.question'),
          answer: t('faq.pricing.features.answer'),
        },
        {
          question: t('faq.pricing.cancel.question'),
          answer: t('faq.pricing.cancel.answer'),
        },
      ],
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_DATA;

    const query = searchQuery.toLowerCase();
    return FAQ_DATA.map(category => ({
      ...category,
      items: category.items.filter(
        item =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      ),
    })).filter(category => category.items.length > 0);
  }, [searchQuery, FAQ_DATA]);

  const totalResults = filteredData.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Help Center</h2>
        <p className="text-muted-foreground">
          Find answers to frequently asked questions
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-lg rounded-xl border-border bg-card"
        />
        {searchQuery && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Badge variant="secondary" className="rounded-lg">
              {totalResults} result{totalResults !== 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </div>

      {/* FAQ Categories */}
      <div className="space-y-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try different keywords or{' '}
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary hover:underline"
              >
                clear your search
              </button>
            </p>
          </div>
        ) : (
          filteredData.map((category) => (
            <section key={category.name} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.name}
                </h3>
                <Badge variant="outline" className="rounded-lg">
                  {category.items.length}
                </Badge>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {category.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.name}-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-sm"
                  >
                    <AccordionTrigger className="hover:no-underline py-5">
                      <span className="text-left font-medium text-foreground pr-4">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))
        )}
      </div>

      {/* Still need help */}
      <div className="mt-12 p-8 bg-card border border-border rounded-2xl text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Still have questions?
        </h3>
        <p className="text-muted-foreground mb-4">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <a
          href="/support/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
