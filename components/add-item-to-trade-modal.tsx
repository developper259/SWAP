'use client';

import { useState } from 'react';
import { Search, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface InventoryItem {
  id: string;
  image: string;
  title: string;
  condition: string;
  category: string;
}

interface AddItemToTradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedItems: InventoryItem[]) => void;
  currentlySelected?: string[];
}

const USER_INVENTORY: InventoryItem[] = [
  { id: 'inv1', image: '🧥', title: 'Vintage Leather Jacket', condition: 'Good', category: 'Fashion' },
  { id: 'inv2', image: '📷', title: 'Canon EOS Camera', condition: 'Like New', category: 'Electronics' },
  { id: 'inv3', image: '👟', title: 'Nike Air Max 90', condition: 'Mint', category: 'Fashion' },
  { id: 'inv4', image: '⌚', title: 'Vintage Rolex Watch', condition: 'Good', category: 'Accessories' },
  { id: 'inv5', image: '🎧', title: 'Sony WH-1000XM4', condition: 'New', category: 'Electronics' },
  { id: 'inv6', image: '👜', title: 'Designer Handbag', condition: 'Good', category: 'Fashion' },
  { id: 'inv7', image: '📚', title: 'Rare Book Collection', condition: 'Fair', category: 'Books' },
  { id: 'inv8', image: '🎸', title: 'Fender Guitar', condition: 'Good', category: 'Music' },
  { id: 'inv9', image: '💻', title: 'MacBook Pro 2021', condition: 'Like New', category: 'Electronics' },
];

export default function AddItemToTradeModal({
  open,
  onOpenChange,
  onConfirm,
  currentlySelected = [],
}: AddItemToTradeModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>(currentlySelected);

  const filteredItems = USER_INVENTORY.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleConfirm = () => {
    const selected = USER_INVENTORY.filter(item => selectedItems.includes(item.id));
    onConfirm(selected);
    onOpenChange(false);
  };

  const handleClear = () => {
    setSelectedItems([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-bold text-foreground">
            Add Items to Trade
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Select items from your inventory to include in this trade
          </p>
        </DialogHeader>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search your inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-lg bg-secondary border-0"
            />
          </div>
        </div>

        {/* Selected Count */}
        {selectedItems.length > 0 && (
          <div className="px-6 py-2 bg-primary/5 border-b border-border flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground h-auto py-1 px-2"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Inventory Grid */}
        <div className="p-4 max-h-80 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {filteredItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`relative rounded-xl p-3 transition-all text-left ${
                      isSelected
                        ? 'bg-primary/10 border-2 border-primary'
                        : 'bg-secondary border-2 border-transparent hover:border-primary/30'
                    }`}
                  >
                    {/* Checkbox indicator */}
                    <div
                      className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border border-border'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>

                    {/* Item thumbnail */}
                    <div className="w-full aspect-square bg-white rounded-lg flex items-center justify-center text-3xl mb-2">
                      {item.image}
                    </div>

                    {/* Item info */}
                    <p className="text-xs font-medium text-foreground truncate">
                      {item.title}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-1 text-[10px] px-1.5 py-0"
                    >
                      {item.condition}
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-4 border-t border-border bg-card">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-lg border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedItems.length === 0}
              className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            >
              Add {selectedItems.length > 0 ? `(${selectedItems.length})` : ''}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
