'use client';

import { Recycle, Package, Star, Leaf } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}

function StatCard({ icon, label, value, accent = 'text-primary' }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 ${accent}`}>
        {icon}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
}

export default function DashboardHeader() {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Manage your trades and items</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard
            icon={<Recycle className="w-6 h-6" />}
            label="Successful Swaps"
            value="12"
          />
          <StatCard
            icon={<Package className="w-6 h-6" />}
            label="Items Listed"
            value="8"
          />
          <StatCard
            icon={<Star className="w-6 h-6" />}
            label="Average Rating"
            value="4.9"
          />
          <StatCard
            icon={<Leaf className="w-6 h-6 text-green-600" />}
            label="CO₂ Saved"
            value="24 kg"
            accent="text-green-600"
          />
        </div>
      </div>
    </div>
  );
}
