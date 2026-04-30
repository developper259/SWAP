'use client';

import { useState } from 'react';
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
import { Upload, X, CheckCircle2 } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface AddItemFormProps {
  onStepChange?: (step: number) => void;
}

export default function AddItemForm({ onStepChange }: AddItemFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    condition: 'good',
    wantInExchange: '',
    location: '',
  });

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

  const handleNextStep = () => {
    if (currentStep === 1 && images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      onStepChange?.(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      onStepChange?.(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('[v0] Form data:', formData);
    alert('Item listed successfully!');
  };

  const steps = [
    { number: 1, label: 'Photos' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Preferences' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step.number <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {step.number < currentStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                    step.number < currentStep ? 'bg-primary' : 'bg-secondary'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {steps.map(step => (
            <span key={step.number}>{step.label}</span>
          ))}
        </div>
      </div>

      {/* Step 1: Photos */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Upload Photos</h2>
            <p className="text-muted-foreground">Add clear, well-lit photos of your item</p>
          </div>

          {/* Drag and Drop Area */}
          <label className="block border-2 border-dashed border-border rounded-2xl p-8 cursor-pointer hover:border-primary transition-colors hover:bg-secondary/50">
            <div className="flex flex-col items-center justify-center gap-3">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <div className="text-center">
                <p className="font-semibold text-foreground">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                {images.length} photo{images.length !== 1 ? 's' : ''} uploaded
              </p>
              <div className="grid grid-cols-3 gap-3">
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                      primaryImageIndex === idx
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPrimaryImageIndex(idx)}
                  >
                    <img src={image} alt={`Upload ${idx}`} className="w-full h-24 object-cover" />
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
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">Primary</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Details */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Item Details</h2>
            <p className="text-muted-foreground">Tell us about your item</p>
          </div>

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

          {/* Category and Subcategory */}
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
                onValueChange={(val) => handleFormChange('condition', val)}
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
      )}

      {/* Step 3: Preferences */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">What do you want?</h2>
            <p className="text-muted-foreground">Specify what you're looking for in exchange</p>
          </div>

          {/* Want in Exchange */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              What I want in exchange
            </label>
            <Textarea
              placeholder="e.g., Vintage cameras, designer bags, vintage watches..."
              value={formData.wantInExchange}
              onChange={(e) => handleFormChange('wantInExchange', e.target.value)}
              className="rounded-lg border-border min-h-24"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Location
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Portland, OR"
                value={formData.location}
                onChange={(e) => handleFormChange('location', e.target.value)}
                className="rounded-lg border-border flex-1"
              />
              <Button
                variant="outline"
                className="rounded-lg border-border text-foreground hover:bg-secondary"
              >
                Use Current
              </Button>
            </div>
          </div>

          {/* Preview Notice */}
          <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
            <p className="text-sm text-foreground">
              Review your listing before publishing. You can edit it anytime.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-12">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className="rounded-lg border-border text-foreground hover:bg-secondary disabled:opacity-50"
        >
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={handleNextStep}
            className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Publish Item
          </Button>
        )}
      </div>
    </div>
  );
}
