'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="bg-background min-h-screen flex items-center justify-center px-4">
      <div className="text-center w-full">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-[200px] md:text-[300px] font-bold text-primary/10 select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 md:w-60 md:h-60 rounded-full flex items-center justify-center">
                <Search className="w-17 h-17 md:w-25 md:h-25 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. 
          It might have been moved or doesn't exist.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full sm:w-auto gap-2 rounded-xl border-border text-foreground hover:bg-secondary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-sm text-muted-foreground">
          Need help?{' '}
          <Link href="/support/faq" className="text-primary hover:underline font-medium">
            Visit our Help Center
          </Link>
        </p>
      </div>
    </main>
  );
}
