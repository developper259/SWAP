import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse - Swap',
  description: 'Browse and search for items to trade',
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
