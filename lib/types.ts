export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color: string;
  enabled: boolean;
  clicks?: number;
  customTitle?: string;
  animation?: 'bounce' | 'pulse' | 'glow' | 'slide' | 'none';
}

export interface BottomImage {
  id: string;
  title: string;
  url: string;
  icon: string;
  image: string;
  clicks?: number;
  description?: string;
}

export interface Theme {
  id: string;
  name: string;
  background: string;
  buttonStyle: 'solid' | 'outline' | 'glass' | 'gradient';
  buttonColor: string;
  textColor: string;
  accentColor: string;
  animation: 'none' | 'float' | 'pulse' | 'glow';
}

export interface ProfileData {
  name: string;
  bio: string;
  profilePicture: string;
  profileBorder: boolean;
  pageUrl: string;
  backgroundColor: string;
  buttonColor: string;
  socialLinks: SocialLink[];
  bottomImages: BottomImage[];
  theme: Theme;
  customCss?: string;
  showAnalytics: boolean;
  totalViews: number;
  totalClicks: number;
  isVerified: boolean;
  customFont: string;
  backgroundPattern: 'none' | 'dots' | 'grid' | 'waves' | 'gradient-mesh';
  buttonAnimation: 'none' | 'hover-lift' | 'hover-glow' | 'hover-bounce' | 'hover-slide';
}

export interface AdminSettings {
  password: string;
  isLocked: boolean;
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
}

export interface Analytics {
  totalViews: number;
  totalClicks: number;
  linkClicks: { [key: string]: number };
  dailyViews: { date: string; views: number }[];
  topLinks: { id: string; platform: string; clicks: number }[];
}