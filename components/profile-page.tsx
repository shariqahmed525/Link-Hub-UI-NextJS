'use client';

import { useState, useEffect } from 'react';
import { ProfileData } from '@/lib/types';
import { getProfileData, incrementLinkClick, incrementPageView } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ProfilePageProps {
  slug?: string;
}

export default function ProfilePage({ slug }: ProfilePageProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const loadProfile = () => {
      const data = getProfileData();
      setProfile(data);
      setIsLoading(false);
      
      // Increment page view
      incrementPageView();
    };

    loadProfile();
  }, []);

  const handleLinkClick = (linkId: string, url: string) => {
    incrementLinkClick(linkId);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-red-500 to-pink-600">
        <div className="text-center space-y-4">
          <div className="text-6xl">😔</div>
          <p className="text-xl">Profile not found</p>
        </div>
      </div>
    );
  }

  const backgroundStyle = profile.theme?.background 
    ? { background: profile.theme.background }
    : { background: `linear-gradient(135deg, ${profile.backgroundColor} 0%, ${adjustBrightness(profile.backgroundColor, -20)} 100%)` };

  const getButtonStyle = (link: any) => {
    return {
      backgroundColor: profile.theme?.buttonColor || profile.buttonColor,
      color: profile.theme?.textColor || '#000000',
      border: 'none',
      borderRadius: '50px',
      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    };
  };

  const getAnimationClass = (animation?: string) => {
    switch (animation) {
      case 'bounce':
        return 'hover:scale-105 active:scale-95';
      case 'pulse':
        return 'hover:animate-pulse';
      case 'glow':
        return 'hover:shadow-lg';
      case 'slide':
        return 'hover:translate-x-1';
      default:
        return 'hover:scale-105 active:scale-95';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 relative overflow-hidden" style={backgroundStyle}>
      {/* Floating particles for Linktree-style ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-md mx-auto space-y-8 relative z-10">
        {/* Profile Header - Linktree Style */}
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="relative">
            <Avatar className={`w-24 h-24 mx-auto ${profile.profileBorder ? 'ring-4 ring-white/50' : ''} transition-all duration-300 hover:scale-110`}>
              <AvatarImage src={profile.profilePicture} alt={profile.name} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-white/20 text-white">
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {profile.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                <Icons.Check size={16} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              @{profile.name.toLowerCase().replace(/\s+/g, '')}
            </h1>
            <p className="text-white/90 leading-relaxed max-w-sm mx-auto text-base">
              {profile.bio}
            </p>
            
            {profile.showAnalytics && (
              <div className="flex justify-center gap-4 mt-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                  <Icons.Eye size={14} className="inline mr-1" />
                  {profile.totalViews.toLocaleString()}
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                  <Icons.MousePointer size={14} className="inline mr-1" />
                  {profile.totalClicks}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Social Links - Pure Linktree Style */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {profile.socialLinks
            .filter(link => link.enabled && link.url)
            .map((link, index) => {
              const IconComponent = (Icons as any)[link.icon] as LucideIcon;
              
              return (
                <div
                  key={link.id}
                  className={`animate-fade-in-up`}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <Button
                    onClick={() => handleLinkClick(link.id, link.url)}
                    className={`w-full h-14 text-base font-semibold transition-all duration-300 ${getAnimationClass(link.animation)}`}
                    style={getButtonStyle(link)}
                  >
                    <div className="flex items-center justify-center gap-3">
                      {IconComponent && (
                        <IconComponent size={20} style={{ color: link.color }} />
                      )}
                      <span>{link.customTitle || link.platform}</span>
                    </div>
                  </Button>
                </div>
              );
            })}
        </div>

        {/* Bottom Images - Linktree Featured Content Style */}
        {profile.bottomImages.length > 0 && (
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="grid gap-4">
              {profile.bottomImages.map((item, index) => {
                const IconComponent = (Icons as any)[item.icon] as LucideIcon;
                
                return (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${0.1 * index}s` }}
                    onClick={() => handleLinkClick(item.id, item.url)}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex justify-between items-end">
                              <div>
                                <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{item.title}</h3>
                                {item.description && (
                                  <p className="text-white/90 text-sm">{item.description}</p>
                                )}
                              </div>
                              {IconComponent && (
                                <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                                  <IconComponent size={16} className="text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer - Linktree Style */}
        <div className="text-center pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <Icons.Sparkles size={14} className="text-white/70" />
            <p className="text-white/70 text-sm font-medium">
              Create your own LinkTree
            </p>
          </div>
        </div>
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