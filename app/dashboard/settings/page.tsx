'use client';

import { Bell, Lock, Eye, Trash2, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useLanguage } from '@/lib/language-context';

export default function SettingsPage() {
  const [theme, setTheme] = useState('system');
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.subtitle')}</p>
      </div>

        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('settings.profileInformation')}</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                {t('settings.fullName')}
              </label>
              <Input
                defaultValue="Alex Rivera"
                className="rounded-lg bg-secondary border-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                {t('settings.emailAddress')}
              </label>
              <Input
                defaultValue="alex@example.com"
                className="rounded-lg bg-secondary border-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                {t('settings.location')}
              </label>
              <Input
                defaultValue="Portland, OR"
                className="rounded-lg bg-secondary border-0"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg w-full">
              {t('settings.saveChanges')}
            </Button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {t('settings.notificationPreferences')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t('settings.tradeOffers')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('settings.tradeOffersDesc')}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t('settings.messages')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('settings.messagesDesc')}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t('settings.reviews')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('settings.reviewsDesc')}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            {t('settings.privacySecurity')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t('settings.profileVisibility')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('settings.profileVisibilityDesc')}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t('settings.showLocation')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('settings.showLocationDesc')}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button
              variant="outline"
              className="w-full rounded-lg border-border text-foreground hover:bg-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t('settings.changePassword')}
            </Button>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            {t('settings.appSettings')}
          </h2>
          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <Label className="text-sm font-medium text-foreground block mb-3">
                {t('settings.appTheme')}
              </Label>
              <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="text-sm text-foreground">
                    {t('settings.systemDefault')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="text-sm text-foreground">
                    {t('settings.lightMode')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="text-sm text-foreground">
                    {t('settings.darkMode')}
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground mt-2">
                {t('settings.chooseAppearance')}
              </p>
            </div>

            {/* Language Selection */}
            <div>
              <Label className="text-sm font-medium text-foreground block mb-3">
                {t('settings.language')}
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="rounded-lg bg-secondary border-0">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">
                    <div className="flex items-center gap-2">
                      <span>🇫🇷</span>
                      <span>Français</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span>English</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                {t('settings.chooseLanguage')}
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-4">{t('settings.dangerZone')}</h2>
          <p className="text-sm text-red-800 mb-4">
            {t('settings.dangerZoneDesc')}
          </p>
          <div className="space-y-2">
            <Button
              variant="destructive"
              className="w-full rounded-lg justify-start gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {t('settings.deleteAccount')}
            </Button>
            <p className="text-xs text-red-700 px-4">
              {t('settings.deleteAccountDesc')}
            </p>
          </div>
        </div>
    </div>
  );
}
