'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  FileText
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const INQUIRY_REASONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'trade-dispute', label: 'Trade Dispute' },
  { value: 'report-user', label: 'Report a User' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'feedback', label: 'Feedback & Suggestions' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'other', label: 'Other' },
];

const RESPONSE_TIMES: Record<string, string> = {
  'general': '24-48 hours',
  'technical': '12-24 hours',
  'trade-dispute': '6-12 hours',
  'report-user': '2-6 hours',
  'billing': '24-48 hours',
  'feedback': '48-72 hours',
  'partnership': '48-72 hours',
  'other': '24-48 hours',
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const expectedResponseTime = formData.reason ? RESPONSE_TIMES[formData.reason] : null;

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Message Sent Successfully!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Thank you for reaching out. We've received your message and will get back to you within{' '}
            <span className="font-semibold text-foreground">{expectedResponseTime || '24-48 hours'}</span>.
          </p>
          <div className="bg-card border border-border rounded-xl p-4 mb-8 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Reference #:</strong>{' '}
              SWP-{Date.now().toString().slice(-8)}
            </p>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', reason: '', subject: '', message: '' });
            }}
            variant="outline"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Contact Us</h2>
        <p className="text-lg text-muted-foreground">
          We're here to help. Fill out the form below and we'll get back to you soon.
        </p>
      </div>

      {/* Response Time Badge */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">Average response: 24 hours</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Your Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="h-12 rounded-xl border-border bg-card"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="h-12 rounded-xl border-border bg-card"
                />
              </div>
            </div>

            {/* Reason for Inquiry */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Reason for Inquiry
              </label>
              <Select
                value={formData.reason}
                onValueChange={(value) => handleInputChange('reason', value)}
              >
                <SelectTrigger className="h-12 rounded-xl border-border bg-card">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {INQUIRY_REASONS.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value} className="rounded-lg">
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {expectedResponseTime && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="rounded-lg bg-primary/10 text-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    Expected response: {expectedResponseTime}
                  </Badge>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Subject
              </label>
              <Input
                type="text"
                placeholder="Brief summary of your inquiry"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
                className="h-12 rounded-xl border-border bg-card"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Message
              </label>
              <Textarea
                placeholder="Please describe your inquiry in detail. Include any relevant order numbers, usernames, or transaction details..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                className="min-h-[180px] rounded-xl border-border bg-card resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Minimum 50 characters ({formData.message.length}/50)
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || formData.message.length < 50}
              className="w-full sm:w-auto h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Quick Info Card */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Response Time</p>
                  <p className="text-xs text-muted-foreground">Usually within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Live Chat</p>
                  <p className="text-xs text-muted-foreground">Available for Premium users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Support Alert */}
          <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Urgent trade dispute?</strong> Include the trade ID and both usernames for faster resolution.
            </AlertDescription>
          </Alert>

          {/* FAQ Link */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Check FAQ First</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Many common questions are answered in our Help Center.
            </p>
            <a
              href="/support/faq"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Browse FAQ
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
