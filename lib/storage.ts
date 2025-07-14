import { ProfileData, AdminSettings, Theme, Analytics } from './types';

const PROFILE_STORAGE_KEY = 'social-link-manager-profile';
const ADMIN_STORAGE_KEY = 'social-link-manager-admin';
const ANALYTICS_STORAGE_KEY = 'social-link-manager-analytics';

export const defaultThemes: Theme[] = [
  {
    id: 'linktree',
    name: 'Linktree Classic',
    background: 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
    buttonStyle: 'solid',
    buttonColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#43E97B',
    animation: 'bounce'
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    background: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 50%, #2BFF88 100%)',
    buttonStyle: 'solid',
    buttonColor: '#FFFFFF',
    textColor: '#000000',
    accentColor: '#FA8BFF',
    animation: 'pulse'
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    buttonStyle: 'solid',
    buttonColor: '#FFFFFF',
    textColor: '#FFFFFF',
    accentColor: '#667eea',
    animation: 'glow'
  },
  {
    id: 'fire',
    name: 'Fire Gradient',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    buttonStyle: 'solid',
    buttonColor: '#FFFFFF',
    textColor: '#FFFFFF',
    accentColor: '#f5576c',
    animation: 'bounce'
  },
  {
    id: 'neon',
    name: 'Neon Dreams',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    buttonStyle: 'solid',
    buttonColor: '#000000',
    textColor: '#000000',
    accentColor: '#a8edea',
    animation: 'pulse'
  }
];

export const defaultProfileData: ProfileData = {
  name: 'Your Name',
  bio: 'Welcome to my digital space! ✨ Connect with me across all platforms.',
  profilePicture: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
  profileBorder: true,
  pageUrl: 'yourname',
  backgroundColor: '#43E97B',
  buttonColor: '#FFFFFF',
  socialLinks: [
    {
      id: '1',
      platform: 'Instagram',
      url: 'https://instagram.com/yourhandle',
      icon: 'Instagram',
      color: '#E4405F',
      enabled: true,
      clicks: 0,
      customTitle: 'Follow my journey',
      animation: 'bounce'
    },
    {
      id: '2',
      platform: 'Twitter',
      url: 'https://twitter.com/yourhandle',
      icon: 'Twitter',
      color: '#1DA1F2',
      enabled: true,
      clicks: 0,
      customTitle: 'Latest thoughts',
      animation: 'pulse'
    },
    {
      id: '3',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      icon: 'Linkedin',
      color: '#0077B5',
      enabled: true,
      clicks: 0,
      customTitle: 'Professional network',
      animation: 'glow'
    }
  ],
  bottomImages: [
    {
      id: '1',
      title: 'Latest Project',
      url: 'https://example.com',
      icon: 'ExternalLink',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=200',
      clicks: 0,
      description: 'Check out my latest work'
    }
  ],
  theme: defaultThemes[0],
  customCss: '',
  showAnalytics: true,
  totalViews: 1247,
  totalClicks: 89,
  isVerified: false,
  customFont: 'Inter',
  backgroundPattern: 'none',
  buttonAnimation: 'hover-lift'
};

export const defaultAdminSettings: AdminSettings = {
  password: 'admin123',
  isLocked: false,
  theme: 'dark',
  notifications: true
};

export const defaultAnalytics: Analytics = {
  totalViews: 1247,
  totalClicks: 89,
  linkClicks: {
    '1': 45,
    '2': 32,
    '3': 12
  },
  dailyViews: [
    { date: '2024-01-01', views: 23 },
    { date: '2024-01-02', views: 45 },
    { date: '2024-01-03', views: 67 },
    { date: '2024-01-04', views: 34 },
    { date: '2024-01-05', views: 89 },
    { date: '2024-01-06', views: 56 },
    { date: '2024-01-07', views: 78 }
  ],
  topLinks: [
    { id: '1', platform: 'Instagram', clicks: 45 },
    { id: '2', platform: 'Twitter', clicks: 32 },
    { id: '3', platform: 'LinkedIn', clicks: 12 }
  ]
};

export const getProfileData = (): ProfileData => {
  if (typeof window === 'undefined') return defaultProfileData;
  
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfileData));
    return defaultProfileData;
  }
  
  try {
    const parsed = JSON.parse(stored);
    // Ensure theme exists
    if (!parsed.theme) {
      parsed.theme = defaultThemes[0];
    }
    return parsed;
  } catch {
    return defaultProfileData;
  }
};

export const saveProfileData = (data: ProfileData): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
};

export const getAdminSettings = (): AdminSettings => {
  if (typeof window === 'undefined') return defaultAdminSettings;
  
  const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(defaultAdminSettings));
    return defaultAdminSettings;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return defaultAdminSettings;
  }
};

export const saveAdminSettings = (settings: AdminSettings): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(settings));
};

export const getAnalytics = (): Analytics => {
  if (typeof window === 'undefined') return defaultAnalytics;
  
  const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(defaultAnalytics));
    return defaultAnalytics;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return defaultAnalytics;
  }
};

export const saveAnalytics = (analytics: Analytics): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(analytics));
};

export const incrementLinkClick = (linkId: string): void => {
  const analytics = getAnalytics();
  analytics.totalClicks += 1;
  analytics.linkClicks[linkId] = (analytics.linkClicks[linkId] || 0) + 1;
  saveAnalytics(analytics);
};

export const incrementPageView = (): void => {
  const analytics = getAnalytics();
  analytics.totalViews += 1;
  
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = analytics.dailyViews.find(entry => entry.date === today);
  
  if (todayEntry) {
    todayEntry.views += 1;
  } else {
    analytics.dailyViews.push({ date: today, views: 1 });
    // Keep only last 30 days
    analytics.dailyViews = analytics.dailyViews.slice(-30);
  }
  
  saveAnalytics(analytics);
};