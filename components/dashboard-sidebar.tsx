'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Star, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function DashboardSidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const NAV_ITEMS: NavItem[] = [
    {
      href: '/dashboard',
      label: t('dashboardSidebar.myWardrobe'),
      icon: <Package className="w-5 h-5" />,
    },
    {
      href: '/dashboard/swap',
      label: t('dashboardSidebar.activeSwap'),
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      href: '/dashboard/reviews',
      label: t('dashboardSidebar.reviews'),
      icon: <Star className="w-5 h-5" />,
    },
    {
      href: '/dashboard/settings',
      label: t('dashboardSidebar.settings'),
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-card border-r border-border h-[calc(100vh-64px)] sticky top-16">
      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 rounded-lg ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
            👨‍🔧
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm">Alex Rivera</p>
            <p className="text-xs text-muted-foreground">{t('dashboardSidebar.memberSince')}</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('dashboardSidebar.signOut')}</span>
        </Button>
      </div>
    </div>
  );
}
