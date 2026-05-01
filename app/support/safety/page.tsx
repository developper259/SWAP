'use client';

import Link from 'next/link';
import { 
  Shield, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Users, 
  AlertTriangle,
  Eye,
  MessageCircle,
  FileText,
  ArrowRight,
  Phone,
  Camera,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';

interface SafetyTip {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

interface SafetySection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tips: SafetyTip[];
}

const SAFETY_SECTIONS: SafetySection[] = [
  {
    id: 'how-to-swap',
    title: 'How to Swap Safely',
    description: 'Follow these guidelines to ensure smooth and secure trades',
    icon: Shield,
    tips: [
      {
        icon: Eye,
        title: 'Review Profiles Carefully',
        description: 'Check user ratings, reviews, and verification status before agreeing to a trade. Look for established users with a history of successful swaps.',
        color: 'text-blue-500',
      },
      {
        icon: MessageCircle,
        title: 'Communicate Through the App',
        description: 'Keep all conversations on our platform. This creates a record and helps our support team assist you if issues arise.',
        color: 'text-green-500',
      },
      {
        icon: Camera,
        title: 'Document Your Items',
        description: 'Take clear, well-lit photos showing all angles and any imperfections. This prevents misunderstandings and disputes.',
        color: 'text-purple-500',
      },
      {
        icon: FileText,
        title: 'Be Honest About Condition',
        description: 'Accurately describe your item\'s condition, including any flaws. Transparency builds trust and prevents conflicts.',
        color: 'text-amber-500',
      },
      {
        icon: ThumbsUp,
        title: 'Leave Honest Reviews',
        description: 'After completing a trade, leave a fair review. This helps other users and contributes to a trustworthy community.',
        color: 'text-teal-500',
      },
    ],
  },
  {
    id: 'meeting-in-person',
    title: 'Meeting in Person',
    description: 'Best practices for safe in-person exchanges',
    icon: Users,
    tips: [
      {
        icon: MapPin,
        title: 'Choose a Safe Location',
        description: 'Meet in public, well-lit areas with plenty of people around. Coffee shops, shopping centers, and police station "safe exchange zones" are ideal.',
        color: 'text-red-500',
      },
      {
        icon: Clock,
        title: 'Meet During Daylight Hours',
        description: 'Schedule meetings during daytime whenever possible. If evening is unavoidable, choose a well-lit, busy location.',
        color: 'text-orange-500',
      },
      {
        icon: Users,
        title: 'Bring a Friend',
        description: 'Consider bringing someone with you, especially for high-value trades. There\'s safety in numbers.',
        color: 'text-indigo-500',
      },
      {
        icon: Phone,
        title: 'Share Your Location',
        description: 'Let a friend or family member know where you\'re going and when you expect to return. Share your live location if possible.',
        color: 'text-pink-500',
      },
      {
        icon: CheckCircle,
        title: 'Inspect Before Exchanging',
        description: 'Take time to inspect the item thoroughly before completing the exchange. Don\'t feel rushed or pressured.',
        color: 'text-emerald-500',
      },
    ],
  },
  {
    id: 'reporting-scams',
    title: 'Reporting Scams',
    description: 'What to do if you encounter suspicious activity',
    icon: AlertTriangle,
    tips: [
      {
        icon: AlertTriangle,
        title: 'Recognize Warning Signs',
        description: 'Be wary of users who rush you, refuse to meet in person, ask for payment outside the app, or offer deals that seem too good to be true.',
        color: 'text-red-500',
      },
      {
        icon: MessageCircle,
        title: 'Report Immediately',
        description: 'Use the "Report" button on user profiles or messages if you suspect fraudulent activity. Our team reviews all reports promptly.',
        color: 'text-amber-500',
      },
      {
        icon: Camera,
        title: 'Document Everything',
        description: 'Save screenshots of conversations, photos of items, and any evidence of misrepresentation. This helps our investigation.',
        color: 'text-blue-500',
      },
      {
        icon: Shield,
        title: 'Protect Your Information',
        description: 'Never share sensitive personal information like your address, financial details, or copies of ID documents with other users.',
        color: 'text-purple-500',
      },
    ],
  },
];

const QUICK_TIPS = [
  'Trust your instincts — if something feels off, it probably is',
  'Never send money or items before receiving the other party\'s item',
  'Verify high-value items before trading',
  'Use tracked shipping for all mailed exchanges',
  'Report suspicious behavior immediately',
];

export default function SafetyPage() {
  const { t } = useLanguage();

  const SAFETY_SECTIONS = [
    {
      id: 'how-to-swap',
      title: t('safety.howToSwap.title'),
      description: t('safety.howToSwap.description'),
      icon: Shield,
      tips: [
        {
          icon: Eye,
          title: t('safety.howToSwap.tips.reviewProfiles.title'),
          description: t('safety.howToSwap.tips.reviewProfiles.description'),
          color: 'text-blue-500',
        },
        {
          icon: MessageCircle,
          title: t('safety.howToSwap.tips.communicateApp.title'),
          description: t('safety.howToSwap.tips.communicateApp.description'),
          color: 'text-green-500',
        },
        {
          icon: Camera,
          title: t('safety.howToSwap.tips.documentItems.title'),
          description: t('safety.howToSwap.tips.documentItems.description'),
          color: 'text-purple-500',
        },
        {
          icon: FileText,
          title: t('safety.howToSwap.tips.honestCondition.title'),
          description: t('safety.howToSwap.tips.honestCondition.description'),
          color: 'text-amber-500',
        },
        {
          icon: ThumbsUp,
          title: t('safety.howToSwap.tips.honestReviews.title'),
          description: t('safety.howToSwap.tips.honestReviews.description'),
          color: 'text-teal-500',
        },
      ],
    },
    {
      id: 'meeting-in-person',
      title: t('safety.meetingPerson.title'),
      description: t('safety.meetingPerson.description'),
      icon: Users,
      tips: [
        {
          icon: MapPin,
          title: t('safety.meetingPerson.tips.safeLocation.title'),
          description: t('safety.meetingPerson.tips.safeLocation.description'),
          color: 'text-red-500',
        },
        {
          icon: Clock,
          title: t('safety.meetingPerson.tips.daylightHours.title'),
          description: t('safety.meetingPerson.tips.daylightHours.description'),
          color: 'text-orange-500',
        },
        {
          icon: Users,
          title: t('safety.meetingPerson.tips.bringFriend.title'),
          description: t('safety.meetingPerson.tips.bringFriend.description'),
          color: 'text-indigo-500',
        },
        {
          icon: Phone,
          title: t('safety.meetingPerson.tips.shareLocation.title'),
          description: t('safety.meetingPerson.tips.shareLocation.description'),
          color: 'text-pink-500',
        },
        {
          icon: CheckCircle,
          title: t('safety.meetingPerson.tips.inspectBefore.title'),
          description: t('safety.meetingPerson.tips.inspectBefore.description'),
          color: 'text-emerald-500',
        },
      ],
    },
    {
      id: 'reporting-scams',
      title: t('safety.reportingScams.title'),
      description: t('safety.reportingScams.description'),
      icon: AlertTriangle,
      tips: [
        {
          icon: AlertTriangle,
          title: t('safety.reportingScams.tips.warningSigns.title'),
          description: t('safety.reportingScams.tips.warningSigns.description'),
          color: 'text-red-500',
        },
        {
          icon: MessageCircle,
          title: t('safety.reportingScams.tips.reportImmediately.title'),
          description: t('safety.reportingScams.tips.reportImmediately.description'),
          color: 'text-amber-500',
        },
        {
          icon: Camera,
          title: t('safety.reportingScams.tips.documentEverything.title'),
          description: t('safety.reportingScams.tips.documentEverything.description'),
          color: 'text-purple-500',
        },
        {
          icon: Shield,
          title: t('safety.reportingScams.tips.protectInfo.title'),
          description: t('safety.reportingScams.tips.protectInfo.description'),
          color: 'text-purple-500',
        },
      ],
    },
  ];

  const QUICK_TIPS = [
    t('safety.quickTips.trustInstincts'),
    t('safety.quickTips.noMoneyFirst'),
    t('safety.quickTips.verifyHighValue'),
    t('safety.quickTips.trackedShipping'),
    t('safety.quickTips.reportSuspicious'),
  ];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Shield className="w-4 h-4" />
          {t('safety.safetyMatters')}
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">{t('safety.title')}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t('safety.subtitle')}
        </p>
      </div>

      {/* Quick Tips Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          {t('safety.quickChecklist')}
        </h3>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_TIPS.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Safety Sections */}
      <div className="space-y-12">
        {SAFETY_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-8">
            {/* Section Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {section.title}
                </h3>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
            </div>

            {/* Tips Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {section.tips.map((tip, index) => {
                const IconComponent = tip.icon;
                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className={`w-5 h-5 ${tip.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {tip.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-800/50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
              {t('safety.emergency.title')}
            </h3>
            <p className="text-red-700 dark:text-red-300">
              {t('safety.emergency.description')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/support/contact">
              <Button variant="outline" className="w-full sm:w-auto border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800/50">
                {t('safety.emergency.reportIncident')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-card border border-border rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {t('safety.emergency.haveMoreQuestions')}
        </h3>
        <p className="text-muted-foreground mb-6">
          {t('safety.emergency.haveMoreQuestionsDesc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/support/faq">
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              {t('safety.emergency.browseFaq')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/support/contact">
            <Button className="w-full sm:w-auto gap-2">
              <MessageCircle className="w-4 h-4" />
              {t('safety.emergency.contactSupport')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
