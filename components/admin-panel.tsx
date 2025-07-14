'use client';

import { useState, useEffect } from 'react';
import { ProfileData, SocialLink, BottomImage, AdminSettings, Theme, Analytics } from '@/lib/types';
import { getProfileData, saveProfileData, getAdminSettings, saveAdminSettings, getAnalytics, defaultThemes } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  Settings, 
  User, 
  Link, 
  Image as ImageIcon, 
  Palette, 
  Globe, 
  Lock, 
  Unlock,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Save,
  BarChart3,
  TrendingUp,
  MousePointer,
  Users,
  Sparkles,
  Wand2,
  Copy,
  ExternalLink,
  Crown,
  Zap,
  ArrowLeft
} from 'lucide-react';
import * as Icons from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
  onBack?: () => void;
}

const socialPlatforms = [
  { name: 'Instagram', icon: 'Instagram', defaultColor: '#E4405F' },
  { name: 'Twitter', icon: 'Twitter', defaultColor: '#1DA1F2' },
  { name: 'LinkedIn', icon: 'Linkedin', defaultColor: '#0077B5' },
  { name: 'Facebook', icon: 'Facebook', defaultColor: '#1877F2' },
  { name: 'YouTube', icon: 'Youtube', defaultColor: '#FF0000' },
  { name: 'TikTok', icon: 'Music', defaultColor: '#000000' },
  { name: 'GitHub', icon: 'Github', defaultColor: '#333333' },
  { name: 'Website', icon: 'Globe', defaultColor: '#6366F1' },
  { name: 'Discord', icon: 'MessageCircle', defaultColor: '#7289DA' },
  { name: 'Twitch', icon: 'Tv', defaultColor: '#9146FF' },
  { name: 'Spotify', icon: 'Music', defaultColor: '#1DB954' },
  { name: 'Pinterest', icon: 'Image', defaultColor: '#BD081C' }
];

const iconOptions = [
  'ExternalLink', 'Globe', 'Image', 'Video', 'Music', 'Book', 'ShoppingCart', 
  'Mail', 'Phone', 'MapPin', 'Calendar', 'Clock', 'Star', 'Heart', 'Camera',
  'Headphones', 'Gamepad2', 'Coffee', 'Briefcase', 'GraduationCap'
];

const animationOptions = [
  { value: 'none', label: 'None' },
  { value: 'bounce', label: 'Bounce' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'glow', label: 'Glow' },
  { value: 'slide', label: 'Slide' }
];

const backgroundPatterns = [
  { value: 'none', label: 'None' },
  { value: 'dots', label: 'Dots' },
  { value: 'grid', label: 'Grid' },
  { value: 'waves', label: 'Waves' }
];

const buttonAnimations = [
  { value: 'none', label: 'None' },
  { value: 'hover-lift', label: 'Lift on Hover' },
  { value: 'hover-glow', label: 'Glow on Hover' },
  { value: 'hover-bounce', label: 'Bounce on Hover' },
  { value: 'hover-slide', label: 'Slide on Hover' }
];

export default function AdminPanel({ onLogout, onBack }: AdminPanelProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [adminSettings, setAdminSettings] = useState<AdminSettings | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const profileData = getProfileData();
      const adminData = getAdminSettings();
      const analyticsData = getAnalytics();
      setProfile(profileData);
      setAdminSettings(adminData);
      setAnalytics(analyticsData);
    };

    loadData();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      saveProfileData(profile);
      toast.success('Changes saved successfully!');
    } catch (error) {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLockToggle = () => {
    if (!adminSettings) return;

    if (!adminSettings.isLocked) {
      const confirmed = window.confirm('Are you sure you want to lock the admin panel? You will need to enter the password to access it again.');
      if (confirmed) {
        const newSettings = { ...adminSettings, isLocked: true };
        setAdminSettings(newSettings);
        saveAdminSettings(newSettings);
        toast.success('Admin panel locked');
      }
    } else {
      const newSettings = { ...adminSettings, isLocked: false };
      setAdminSettings(newSettings);
      saveAdminSettings(newSettings);
      toast.success('Admin panel unlocked');
    }
  };

  const addSocialLink = () => {
    if (!profile) return;

    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'Custom',
      url: '',
      icon: 'Globe',
      color: '#6366F1',
      enabled: true,
      clicks: 0,
      customTitle: '',
      animation: 'none'
    };

    setProfile({
      ...profile,
      socialLinks: [...profile.socialLinks, newLink]
    });
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    if (!profile) return;

    setProfile({
      ...profile,
      socialLinks: profile.socialLinks.map(link =>
        link.id === id ? { ...link, ...updates } : link
      )
    });
  };

  const removeSocialLink = (id: string) => {
    if (!profile) return;

    setProfile({
      ...profile,
      socialLinks: profile.socialLinks.filter(link => link.id !== id)
    });
  };

  const addBottomImage = () => {
    if (!profile) return;

    const newImage: BottomImage = {
      id: Date.now().toString(),
      title: 'New Featured Item',
      url: '',
      icon: 'ExternalLink',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=200',
      clicks: 0,
      description: 'Add a description'
    };

    setProfile({
      ...profile,
      bottomImages: [...profile.bottomImages, newImage]
    });
  };

  const updateBottomImage = (id: string, updates: Partial<BottomImage>) => {
    if (!profile) return;

    setProfile({
      ...profile,
      bottomImages: profile.bottomImages.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const removeBottomImage = (id: string) => {
    if (!profile) return;

    setProfile({
      ...profile,
      bottomImages: profile.bottomImages.filter(item => item.id !== id)
    });
  };

  const applyTheme = (theme: Theme) => {
    if (!profile) return;

    setProfile({
      ...profile,
      theme: theme,
      backgroundColor: theme.background.includes('gradient') ? '#1a1a2e' : theme.background,
      buttonColor: theme.buttonColor
    });
  };

  const copyProfileUrl = () => {
    const url = `${window.location.origin}/${profile?.pageUrl}`;
    navigator.clipboard.writeText(url);
    toast.success('Profile URL copied to clipboard!');
  };

  if (!profile || !adminSettings || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="sm"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              )}
              
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Settings className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyProfileUrl}
              >
                <Copy size={14} className="mr-2" />
                Copy URL
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleLockToggle}
              >
                {adminSettings.isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                <span className="ml-2 hidden sm:inline">{adminSettings.isLocked ? 'Locked' : 'Unlocked'}</span>
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isSaving}
                size="sm"
              >
                <Save size={14} className="mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              
              <Button variant="outline" onClick={onLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
              <BarChart3 size={14} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm">
              <User size={14} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="text-xs sm:text-sm">
              <Link size={14} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Links</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="text-xs sm:text-sm">
              <ImageIcon size={14} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="text-xs sm:text-sm">
              <Palette size={14} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-xs sm:text-sm">
              <Settings size={14} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                      <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                    </div>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                      <p className="text-2xl font-bold">{analytics.totalClicks}</p>
                    </div>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Links</p>
                      <p className="text-2xl font-bold">{profile.socialLinks.filter(l => l.enabled).length}</p>
                    </div>
                    <Link className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">CTR</p>
                      <p className="text-2xl font-bold">{((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1)}%</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Top Performing Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.topLinks.map((link, index) => (
                    <div key={link.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{link.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{link.clicks}</div>
                        <div className="text-xs text-muted-foreground">clicks</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.dailyViews.slice(-7).map((day, index) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <span className="text-sm">{new Date(day.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-3">
                        <Progress value={(day.views / Math.max(...analytics.dailyViews.map(d => d.views))) * 100} className="w-20" />
                        <span className="font-medium w-8 text-right text-sm">{day.views}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your basic profile details and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative group">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={profile.profilePicture} alt={profile.name} />
                      <AvatarFallback className="text-lg font-bold">
                        {profile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {profile.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-background">
                        <Icons.Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <Label htmlFor="profilePicture">Profile Picture URL</Label>
                      <Input
                        id="profilePicture"
                        value={profile.profilePicture}
                        onChange={(e) => setProfile({ ...profile, profilePicture: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="profileBorder"
                          checked={profile.profileBorder}
                          onCheckedChange={(checked) => setProfile({ ...profile, profileBorder: checked })}
                        />
                        <Label htmlFor="profileBorder">Profile border</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isVerified"
                          checked={profile.isVerified}
                          onCheckedChange={(checked) => setProfile({ ...profile, isVerified: checked })}
                        />
                        <Label htmlFor="isVerified" className="flex items-center gap-1">
                          <Crown size={14} className="text-blue-500" />
                          Verified badge
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pageUrl">Page URL</Label>
                    <Input
                      id="pageUrl"
                      value={profile.pageUrl}
                      onChange={(e) => setProfile({ ...profile, pageUrl: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
                      placeholder="yourname"
                    />
                    <p className="text-sm text-muted-foreground mt-1">/{profile.pageUrl}</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell people about yourself..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showAnalytics"
                    checked={profile.showAnalytics}
                    onCheckedChange={(checked) => setProfile({ ...profile, showAnalytics: checked })}
                  />
                  <Label htmlFor="showAnalytics">Show analytics on profile</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Social Links
                    </CardTitle>
                    <CardDescription>
                      Add and manage your social media links
                    </CardDescription>
                  </div>
                  <Button onClick={addSocialLink} size="sm">
                    <Plus size={14} className="mr-2" />
                    Add Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.socialLinks.map((link) => (
                  <Card key={link.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={link.enabled}
                            onCheckedChange={(checked) => updateSocialLink(link.id, { enabled: checked })}
                          />
                          {link.enabled ? <Eye size={14} className="text-green-600" /> : <EyeOff size={14} className="text-muted-foreground" />}
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <Select
                            value={link.platform}
                            onValueChange={(value) => {
                              const platform = socialPlatforms.find(p => p.name === value);
                              updateSocialLink(link.id, {
                                platform: value,
                                icon: platform?.icon || 'Globe',
                                color: platform?.defaultColor || '#6366F1'
                              });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {socialPlatforms.map(platform => (
                                <SelectItem key={platform.name} value={platform.name}>
                                  {platform.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input
                            value={link.url}
                            onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                            placeholder="https://..."
                          />

                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={link.color}
                              onChange={(e) => updateSocialLink(link.id, { color: e.target.value })}
                              className="w-8 h-8 rounded border"
                            />
                            <Badge variant="outline" style={{ borderColor: link.color, color: link.color }}>
                              {link.platform}
                            </Badge>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSocialLink(link.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Custom Title</Label>
                          <Input
                            value={link.customTitle || ''}
                            onChange={(e) => updateSocialLink(link.id, { customTitle: e.target.value })}
                            placeholder="Custom button text"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Animation</Label>
                          <Select
                            value={link.animation || 'none'}
                            onValueChange={(value) => updateSocialLink(link.id, { animation: value as any })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {animationOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {link.clicks !== undefined && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MousePointer size={12} />
                          <span>{link.clicks} clicks</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Featured Content
                    </CardTitle>
                    <CardDescription>
                      Add featured content with custom images
                    </CardDescription>
                  </div>
                  <Button onClick={addBottomImage} size="sm">
                    <Plus size={14} className="mr-2" />
                    Add Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.bottomImages.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      <div className="lg:col-span-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="lg:col-span-8 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm">Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) => updateBottomImage(item.id, { title: e.target.value })}
                              placeholder="Content title"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">URL</Label>
                            <Input
                              value={item.url}
                              onChange={(e) => updateBottomImage(item.id, { url: e.target.value })}
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm">Description</Label>
                          <Input
                            value={item.description || ''}
                            onChange={(e) => updateBottomImage(item.id, { description: e.target.value })}
                            placeholder="Brief description"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-sm">Image URL</Label>
                            <Input
                              value={item.image}
                              onChange={(e) => updateBottomImage(item.id, { image: e.target.value })}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Icon</Label>
                            <Select
                              value={item.icon}
                              onValueChange={(value) => updateBottomImage(item.id, { icon: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {iconOptions.map(icon => (
                                  <SelectItem key={icon} value={icon}>
                                    {icon}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {item.clicks !== undefined && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MousePointer size={12} />
                            <span>{item.clicks} clicks</span>
                          </div>
                        )}
                      </div>

                      <div className="lg:col-span-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeBottomImage(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Themes
                  </CardTitle>
                  <CardDescription>
                    Choose from our collection of themes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {defaultThemes.map((theme) => (
                      <div
                        key={theme.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          profile.theme?.id === theme.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => applyTheme(theme)}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg"
                            style={{ background: theme.background }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{theme.name}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{theme.buttonStyle} • {theme.animation}</p>
                          </div>
                          {profile.theme?.id === theme.id && (
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                              <Icons.Check size={12} className="text-primary-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4" />
                    Customization
                  </CardTitle>
                  <CardDescription>
                    Fine-tune your design preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Background Pattern</Label>
                    <Select
                      value={profile.backgroundPattern}
                      onValueChange={(value) => setProfile({ ...profile, backgroundPattern: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {backgroundPatterns.map(pattern => (
                          <SelectItem key={pattern.value} value={pattern.value}>
                            {pattern.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Button Animation</Label>
                    <Select
                      value={profile.buttonAnimation}
                      onValueChange={(value) => setProfile({ ...profile, buttonAnimation: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {buttonAnimations.map(animation => (
                          <SelectItem key={animation.value} value={animation.value}>
                            {animation.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Custom Font</Label>
                    <Select
                      value={profile.customFont}
                      onValueChange={(value) => setProfile({ ...profile, customFont: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your profile will look to visitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-sm mx-auto">
                  <div 
                    className="p-6 rounded-2xl relative overflow-hidden"
                    style={{ 
                      background: profile.theme?.background || `linear-gradient(135deg, ${profile.backgroundColor} 0%, ${adjustBrightness(profile.backgroundColor, -20)} 100%)` 
                    }}
                  >
                    <div className="text-center space-y-4">
                      <Avatar className={`w-16 h-16 mx-auto ${profile.profileBorder ? 'ring-2 ring-white/30' : ''}`}>
                        <AvatarImage src={profile.profilePicture} alt={profile.name} />
                        <AvatarFallback className="text-lg font-bold bg-white/20 text-white">
                          {profile.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="text-white font-bold text-lg">{profile.name}</h3>
                        <p className="text-white/80 text-sm mt-1">{profile.bio}</p>
                      </div>
                      
                      <div className="space-y-2">
                        {profile.socialLinks.slice(0, 3).filter(link => link.enabled).map(link => (
                          <div
                            key={link.id}
                            className="w-full h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium transition-all duration-300"
                            style={{ 
                              backgroundColor: profile.theme?.buttonStyle === 'glass' ? 'rgba(255, 255, 255, 0.1)' : profile.buttonColor,
                              backdropFilter: profile.theme?.buttonStyle === 'glass' ? 'blur(10px)' : 'none',
                              border: profile.theme?.buttonStyle === 'outline' ? `2px solid ${link.color}` : 'none'
                            }}
                          >
                            {link.customTitle || link.platform}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your admin panel security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="password">Admin Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={adminSettings.password}
                      onChange={(e) => {
                        const newSettings = { ...adminSettings, password: e.target.value };
                        setAdminSettings(newSettings);
                        saveAdminSettings(newSettings);
                      }}
                      placeholder="Enter admin password"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="adminLock"
                      checked={adminSettings.isLocked}
                      onCheckedChange={handleLockToggle}
                    />
                    <Label htmlFor="adminLock">
                      Lock admin panel (requires password to access)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notifications"
                      checked={adminSettings.notifications}
                      onCheckedChange={(checked) => {
                        const newSettings = { ...adminSettings, notifications: checked };
                        setAdminSettings(newSettings);
                        saveAdminSettings(newSettings);
                      }}
                    />
                    <Label htmlFor="notifications">
                      Enable notifications
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Page Settings
                  </CardTitle>
                  <CardDescription>
                    Configure your public page
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Public URL</Label>
                    <div className="flex items-center gap-2 mt-1 p-3 bg-muted rounded-lg">
                      <Globe size={14} className="text-muted-foreground" />
                      <span className="font-mono text-sm">
                        {typeof window !== 'undefined' ? window.location.origin : 'yoursite.com'}/{profile.pageUrl}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyProfileUrl}
                        className="ml-auto"
                      >
                        <Copy size={12} />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Quick Actions</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/${profile.pageUrl}`, '_blank')}
                      >
                        <ExternalLink size={12} className="mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyProfileUrl}
                      >
                        <Copy size={12} className="mr-1" />
                        Copy URL
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1);
}