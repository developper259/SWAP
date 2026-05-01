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
import { useLanguage } from '@/lib/language-context';

interface AddItemFormProps {
  onStepChange?: (step: number) => void;
}

export default function AddItemForm({ onStepChange }: AddItemFormProps) {
  const { t } = useLanguage();
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
      alert(t('addItemForm.pleaseUploadImage'));
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
    alert(t('addItemForm.itemListedSuccessfully'));
  };

  const steps = [
    { number: 1, label: t('addItemForm.step1') },
    { number: 2, label: t('addItemForm.step2') },
    { number: 3, label: t('addItemForm.step3') },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-12 relative">
        {/* Progress Line */}
        <div className="absolute top-7 h-1 bg-secondary rounded-full" style={{ left: 'calc(16.67% - 28px)', right: 'calc(16.67% - 28px)' }}>
          <div
            className="h-1 bg-primary rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold text-lg transition-colors ${
                  step.number <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {step.number < currentStep ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              {/* Label */}
              <span className="text-sm font-medium text-muted-foreground mt-3 text-center">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Photos */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t('addItemForm.uploadPhotos')}</h2>
            <p className="text-muted-foreground">{t('addItemForm.uploadPhotosDescription')}</p>
          </div>

          {/* Drag and Drop Area */}
          <label className="block border-2 border-dashed border-border rounded-2xl p-8 cursor-pointer hover:border-primary transition-colors hover:bg-secondary/50">
            <div className="flex flex-col items-center justify-center gap-3">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <div className="text-center">
                <p className="font-semibold text-foreground">{t('addItemForm.clickToUpload')}</p>
                <p className="text-sm text-muted-foreground">{t('addItemForm.fileTypes')}</p>
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
                {images.length} {t('addItemForm.photo')}{images.length !== 1 ? t('addItemForm.photos_plural') : ''} {t('addItemForm.uploaded')}
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
                        <span className="text-white text-xs font-semibold">{t('addItemForm.primary')}</span>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">{t('addItemForm.itemDetails')}</h2>
            <p className="text-muted-foreground">{t('addItemForm.itemDetailsDescription')}</p>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              {t('addItemForm.title')}
            </label>
            <Input
              placeholder={t('addItemForm.titlePlaceholder')}
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              className="rounded-lg border-border"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              {t('addItemForm.description')}
            </label>
            <Textarea
              placeholder={t('addItemForm.descriptionPlaceholder')}
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              className="rounded-lg border-border min-h-24"
            />
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                {t('addItemForm.category')}
              </label>
              <Select value={formData.category} onValueChange={(val) => handleFormChange('category', val)}>
                <SelectTrigger className="rounded-lg border-border">
                  <SelectValue placeholder={t('addItemForm.selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">{t('categories.fashion')}</SelectItem>
                  <SelectItem value="electronics">{t('categories.electronics')}</SelectItem>
                  <SelectItem value="home">{t('categories.home')}</SelectItem>
                  <SelectItem value="books">{t('categories.books')}</SelectItem>
                  <SelectItem value="sports">{t('categories.sports')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">
                {t('addItemForm.condition')}
              </label>
              <ToggleGroup
                type="single"
                value={formData.condition}
                onValueChange={(val) => handleFormChange('condition', val)}
              >
                <ToggleGroupItem value="new" className="rounded text-xs">
                  {t('itemCard.condition.new')}
                </ToggleGroupItem>
                <ToggleGroupItem value="good" className="rounded text-xs">
                  {t('itemCard.condition.good')}
                </ToggleGroupItem>
                <ToggleGroupItem value="used" className="rounded text-xs">
                  {t('itemCard.condition.used')}
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
            <h2 className="text-2xl font-bold text-foreground mb-2">{t('addItemForm.wantInExchange')}</h2>
            <p className="text-muted-foreground">{t('addItemForm.wantInExchange')}</p>
          </div>

          {/* Want in Exchange */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              {t('addItemForm.wantInExchange')}
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
              {t('addItemForm.location')}
            </label>
            <div className="flex gap-2">
              <Input
                placeholder={t('addItemForm.locationPlaceholder')}
                value={formData.location}
                onChange={(e) => handleFormChange('location', e.target.value)}
                className="rounded-lg border-border flex-1"
              />
              <Button
                variant="outline"
                className="rounded-lg border-border text-foreground hover:bg-secondary"
              >
                {t('addItemForm.useCurrent')}
              </Button>
            </div>
          </div>

          {/* Preview Notice */}
          <div className="bg-secondary/50 border border-secondary rounded-lg p-4">
            <p className="text-sm text-foreground">
              {t('addItemForm.reviewNotice')}
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
          {t('addItemForm.previous')}
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={handleNextStep}
            className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t('addItemForm.next')}
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t('addItemForm.publishItem')}
          </Button>
        )}
      </div>
    </div>
  );
}
