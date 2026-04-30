'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Upload, X, Trash2, CheckCircle, ArrowLeft } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Link from 'next/link';

interface ItemData {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  wantInExchange: string;
  location: string;
  images: string[];
  status: 'active' | 'swapped';
}

interface EditItemFormProps {
  item: ItemData;
}

export default function EditItemForm({ item }: EditItemFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(item.images);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    category: item.category,
    condition: item.condition,
    wantInExchange: item.wantInExchange,
    location: item.location,
  });
  const [isSwapped, setIsSwapped] = useState(item.status === 'swapped');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then(results => {
      setImages([...images, ...results]);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (primaryImageIndex === index) {
      setPrimaryImageIndex(0);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    console.log('[v0] Saving item:', { ...formData, images, isSwapped });
    alert('Item updated successfully!');
    router.push('/dashboard');
  };

  const handleDelete = () => {
    console.log('[v0] Deleting item:', item.id);
    alert('Item deleted');
    router.push('/dashboard');
  };

  const handleMarkAsSwapped = () => {
    setIsSwapped(true);
    console.log('[v0] Marking as swapped:', item.id);
    alert('Item marked as swapped!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link href="/dashboard" className="mb-6 inline-block">
        <Button
          variant="outline"
          className="gap-2 rounded-lg border-border text-foreground hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit Item</h1>
        <p className="text-muted-foreground">Update your listing details</p>
      </div>

      {/* Status Badge */}
      {isSwapped && (
        <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-primary" />
          <p className="text-primary font-medium">This item has been marked as swapped</p>
        </div>
      )}

      {/* Photos Section */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-foreground">Photos</h2>
        
        {/* Image Upload */}
        <label className="block border-2 border-dashed border-border rounded-2xl p-6 cursor-pointer hover:border-primary transition-colors hover:bg-secondary/50">
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="w-6 h-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to add more photos</p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-colors aspect-square ${
                  primaryImageIndex === idx
                    ? 'border-primary'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setPrimaryImageIndex(idx)}
              >
                <div className="w-full h-full bg-secondary flex items-center justify-center text-4xl">
                  {image}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded p-1 hover:opacity-80"
                >
                  <X className="w-3 h-3" />
                </button>
                {primaryImageIndex === idx && (
                  <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-xs py-1 text-center">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="space-y-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground">Details</h2>

        {/* Title */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Title
          </label>
          <Input
            placeholder="e.g., Vintage Leather Jacket"
            value={formData.title}
            onChange={(e) => handleFormChange('title', e.target.value)}
            className="rounded-lg border-border"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Description
          </label>
          <Textarea
            placeholder="Describe your item in detail..."
            value={formData.description}
            onChange={(e) => handleFormChange('description', e.target.value)}
            className="rounded-lg border-border min-h-24"
          />
        </div>

        {/* Category and Condition */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Category
            </label>
            <Select value={formData.category} onValueChange={(val) => handleFormChange('category', val)}>
              <SelectTrigger className="rounded-lg border-border">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Condition
            </label>
            <ToggleGroup
              type="single"
              value={formData.condition}
              onValueChange={(val) => val && handleFormChange('condition', val)}
              className="justify-start"
            >
              <ToggleGroupItem value="new" className="rounded text-xs">
                New
              </ToggleGroupItem>
              <ToggleGroupItem value="good" className="rounded text-xs">
                Good
              </ToggleGroupItem>
              <ToggleGroupItem value="used" className="rounded text-xs">
                Used
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="space-y-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground">Preferences</h2>

        {/* Want in Exchange */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            What I want in exchange
          </label>
          <Textarea
            placeholder="e.g., Vintage cameras, designer bags..."
            value={formData.wantInExchange}
            onChange={(e) => handleFormChange('wantInExchange', e.target.value)}
            className="rounded-lg border-border min-h-20"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Location
          </label>
          <Input
            placeholder="e.g., Portland, OR"
            value={formData.location}
            onChange={(e) => handleFormChange('location', e.target.value)}
            className="rounded-lg border-border"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 mb-8">
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Save Changes
          </Button>
          {!isSwapped && (
            <Button
              variant="outline"
              onClick={handleMarkAsSwapped}
              className="gap-2 rounded-lg border-primary text-primary hover:bg-primary/10"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Swapped
            </Button>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-destructive/30 rounded-2xl p-6 bg-destructive/5">
        <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Deleting this item is permanent and cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 rounded-lg border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-4 h-4" />
              Delete Item
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your item listing.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
