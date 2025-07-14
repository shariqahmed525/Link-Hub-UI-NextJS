'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Globe, 
  BarChart3, 
  Palette, 
  Shield, 
  Star,
  Users,
  TrendingUp,
  Heart,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Link,
  Settings,
  Eye,
  MousePointer
} from 'lucide-react';

interface HomePageProps {
  onViewProfile: () => void;
  onAdminAccess: () => void;
  onThemeChange: () => void;
  currentTheme?: string;
}

export default function HomePage({ onViewProfile, onAdminAccess, onThemeChange, currentTheme }: HomePageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <Sun size={18} />;
      case 'dark':
        return <Moon size={18} />;
      default:
        return <Monitor size={18} />;
    }
  };

  const features = [
    {
      icon: <Link className="w-6 h-6" />,
      title: "Smart Link Management",
      description: "Organize all your social media links in one beautiful, customizable hub just like Linktree"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Track clicks, views, and engagement with detailed insights and performance metrics"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful Themes",
      description: "Choose from vibrant Linktree-style themes with stunning gradients and animations"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Admin",
      description: "Password-protected dashboard with advanced security features and user management"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed with smooth animations and instant loading times"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "SEO Optimized",
      description: "Built with Next.js for superior search engine optimization and performance"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: <Users className="w-5 h-5" /> },
    { label: "Links Created", value: "250K+", icon: <Link className="w-5 h-5" /> },
    { label: "Total Clicks", value: "5M+", icon: <MousePointer className="w-5 h-5" /> },
    { label: "Uptime", value: "99.9%", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <Sparkles className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LinkTree Pro</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={onThemeChange}
                variant="ghost"
                size="sm"
                className="h-9 w-9 px-0 text-white hover:bg-white/20"
              >
                {getThemeIcon()}
              </Button>
              
              <Button
                onClick={onViewProfile}
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Eye size={16} className="mr-2" />
                View Profile
              </Button>
              
              <Button
                onClick={onAdminAccess}
                size="sm"
                className="bg-white text-green-600 hover:bg-white/90 font-semibold"
              >
                <Settings size={16} className="mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Sparkles size={14} className="mr-2" />
                The #1 Link in Bio Tool
              </Badge>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white">
                One link to rule
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  them all
                </span>
              </h1>
              
              <p className="mx-auto max-w-2xl text-xl text-white/90 sm:text-2xl leading-relaxed">
                Connect your audience to all of your content with one simple link in your bio.
                Just like Linktree, but better.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={onAdminAccess}
                size="lg"
                className="bg-white text-green-600 hover:bg-white/90 font-bold text-lg px-8 py-4 h-auto"
              >
                <Zap size={20} className="mr-2" />
                Get started for free
                <ArrowRight size={20} className="ml-2" />
              </Button>
              
              <Button
                onClick={onViewProfile}
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-4 h-auto"
              >
                <Eye size={20} className="mr-2" />
                See it in action
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3 text-white">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Fixed Colors */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-foreground">
              Everything you need to grow
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              Powerful features to help you connect with your audience and grow your brand
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group border-border/50 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-white">
              Join millions of creators
            </h2>
            
            <p className="mt-6 text-xl text-white/90">
              Start building your link in bio page today. It's free, fast, and easy to use.
            </p>

            <div className="mt-10">
              <Button
                onClick={onAdminAccess}
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 font-bold text-xl px-10 py-5 h-auto"
              >
                <Heart size={22} className="mr-3" />
                Create your LinkTree
                <Sparkles size={22} className="ml-3" />
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-300" />
                <span className="font-medium">Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-300" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-300" />
                <span className="font-medium">Set up in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground text-lg">LinkTree Pro</span>
            </div>
            
            <div className="text-muted-foreground">
              © 2024 LinkTree Pro. Made with ❤️ for creators worldwide.
            </div>
            
            <Button
              onClick={onThemeChange}
              variant="ghost"
              size="sm"
              className="h-10 w-10 px-0 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {getThemeIcon()}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}