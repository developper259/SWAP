'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HelpCircle, 
  Shield, 
  MessageCircle,
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Help Center',
    href: '/support/faq',
    icon: HelpCircle,
    description: 'Find answers to common questions',
  },
  {
    name: 'Safety Tips',
    href: '/support/safety',
    icon: Shield,
    description: 'Learn how to trade safely',
  },
  {
    name: 'Contact Us',
    href: '/support/contact',
    icon: MessageCircle,
    description: 'Get in touch with our team',
  },
];

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Support & Safety</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help you trade safely and confidently
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 flex-shrink-0">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-card border border-border hover:border-primary/30 hover:shadow-sm'
                    )}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      isActive ? 'bg-primary-foreground/20' : 'bg-secondary'
                    )}>
                      <item.icon className={cn(
                        'w-5 h-5',
                        isActive ? 'text-primary-foreground' : 'text-primary'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'font-semibold truncate',
                        isActive ? 'text-primary-foreground' : 'text-foreground'
                      )}>
                        {item.name}
                      </p>
                      <p className={cn(
                        'text-xs truncate',
                        isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      )}>
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className={cn(
                      'w-4 h-4 flex-shrink-0 transition-transform',
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:translate-x-1'
                    )} />
                  </Link>
                );
              })}
            </nav>

            {/* Quick Help Card */}
            <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">Need immediate help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team typically responds within 24 hours.
              </p>
              <Link
                href="/support/contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
