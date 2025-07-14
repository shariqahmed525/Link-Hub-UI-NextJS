'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { getAdminSettings } from '@/lib/storage';
import ProfilePage from '@/components/profile-page';
import AdminPanel from '@/components/admin-panel';
import LoginForm from '@/components/login-form';
import HomePage from '@/components/home-page';
import { Button } from '@/components/ui/button';
import { Settings, User, Sparkles, Moon, Sun, Monitor } from 'lucide-react';

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'admin' | 'login'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Check if admin panel is locked
    const adminSettings = getAdminSettings();
    if (!adminSettings.isLocked) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (password: string): boolean => {
    const adminSettings = getAdminSettings();
    if (password === adminSettings.password) {
      setIsAuthenticated(true);
      setCurrentView('admin');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const handleAdminAccess = () => {
    const adminSettings = getAdminSettings();
    if (adminSettings.isLocked && !isAuthenticated) {
      setCurrentView('login');
    } else {
      setCurrentView('admin');
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={16} />;
      case 'dark':
        return <Moon size={16} />;
      default:
        return <Monitor size={16} />;
    }
  };

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (currentView === 'login') {
    return <LoginForm onLogin={handleLogin} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'admin') {
    return <AdminPanel onLogout={handleLogout} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'profile') {
    return (
      <div className="relative">
        <ProfilePage />
        
        {/* Navigation Buttons */}
        <div className="fixed top-6 left-6 z-50">
          <Button
            onClick={() => setCurrentView('home')}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-md border-border/50 hover:bg-background/90 transition-all duration-300"
          >
            ← Back to Home
          </Button>
        </div>

        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <Button
            onClick={cycleTheme}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-md border-border/50 hover:bg-background/90 transition-all duration-300"
          >
            {getThemeIcon()}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <HomePage 
        onViewProfile={() => setCurrentView('profile')}
        onAdminAccess={handleAdminAccess}
        onThemeChange={cycleTheme}
        currentTheme={theme}
      />
    </div>
  );
}