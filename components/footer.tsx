'use client';

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-accent rounded-lg flex items-center justify-center text-sm">
              ♻
            </div>
            <span className="font-bold">Swap</span>
          </div>
          <p className="text-sm opacity-75">Trade sustainably, live better.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Browse</h4>
          <ul className="text-sm space-y-2 opacity-75">
            <li><a href="/" className="hover:opacity-100">Home</a></li>
            <li><a href="/browse?category=fashion" className="hover:opacity-100">Fashion</a></li>
            <li><a href="/browse?category=electronics" className="hover:opacity-100">Electronics</a></li>
            <li><a href="/browse?category=home" className="hover:opacity-100">Home</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="text-sm space-y-2 opacity-75">
            <li><a href="/support/faq" className="hover:opacity-100">Help Center</a></li>
            <li><a href="/support/safety" className="hover:opacity-100">Safety Tips</a></li>
            <li><a href="/support/contact" className="hover:opacity-100">Contact</a></li>
            <li><a href="/support/faq" className="hover:opacity-100">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="text-sm space-y-2 opacity-75">
            <li><a href="#" className="hover:opacity-100">Terms</a></li>
            <li><a href="#" className="hover:opacity-100">Privacy</a></li>
            <li><a href="#" className="hover:opacity-100">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-accent/20 px-4 py-6 text-center text-sm opacity-75">
        © 2024 Swap. All rights reserved. Trading sustainably.
      </div>
    </footer>
  );
}
