'use client';

import { Package, MessageSquare, Truck } from 'lucide-react';

const steps = [
  {
    icon: Package,
    title: 'List Your Item',
    description: 'Upload photos and details about what you want to trade',
  },
  {
    icon: MessageSquare,
    title: 'Chat & Propose',
    description: 'Connect with traders and negotiate the perfect exchange',
  },
  {
    icon: Truck,
    title: 'Ship & Receive',
    description: 'Securely ship your item and receive what you traded for',
  },
];

export default function TrustSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Simple & Secure Trading
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our trusted platform makes peer-to-peer trading safe and easy
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-primary" />
              </div>

              {/* Step Number */}
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-4">
                {index + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
