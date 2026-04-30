import { Bell, Lock, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

        {/* Profile Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Full Name
              </label>
              <Input
                defaultValue="Alex Rivera"
                className="rounded-lg bg-secondary border-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Email Address
              </label>
              <Input
                defaultValue="alex@example.com"
                className="rounded-lg bg-secondary border-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Location
              </label>
              <Input
                defaultValue="Portland, OR"
                className="rounded-lg bg-secondary border-0"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg w-full">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Trade Offers</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone makes an offer
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Messages</p>
                <p className="text-sm text-muted-foreground">
                  Get notified of new messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Reviews</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone leaves a review
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
            Privacy & Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Profile Visibility</p>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your profile
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Show Location</p>
                <p className="text-sm text-muted-foreground">
                  Display your city on your profile
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button
              variant="outline"
              className="w-full rounded-lg border-border text-foreground hover:bg-secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
          <p className="text-sm text-red-800 mb-4">
            These actions cannot be undone. Please be careful.
          </p>
          <div className="space-y-2">
            <Button
              variant="destructive"
              className="w-full rounded-lg justify-start gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
            <p className="text-xs text-red-700 px-4">
              Permanently delete your account and all associated data
            </p>
          </div>
        </div>
    </div>
  );
}
