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
        <div className="flex-1 md:ml-64">
          {children}
        </div>
      </div>
    </main>
  );
}
