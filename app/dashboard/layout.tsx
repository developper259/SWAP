import DashboardSidebar from '@/components/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background min-h-screen">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-7xl px-4 py-12">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
