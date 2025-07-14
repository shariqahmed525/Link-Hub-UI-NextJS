'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Eye, EyeOff, Sparkles, Shield, ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  onLogin: (password: string) => boolean;
  onBack?: () => void;
}

export default function LoginForm({ onLogin, onBack }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay with animation
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = onLogin(password);
    if (!success) {
      setError('Invalid password. Please try again.');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 p-4 relative overflow-hidden transition-colors duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 dark:bg-purple-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Back Button */}
      {onBack && (
        <div className="absolute top-6 left-6 z-50">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-md border-border/50 hover:bg-background/90 transition-all duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </div>
      )}

      <Card className="w-full max-w-md relative z-10 bg-background/80 backdrop-blur-xl border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <Shield size={40} className="text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Admin Access
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Enter your credentials to access the dashboard
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  className="pr-12 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-purple-500 focus:ring-purple-500/20 h-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400">
                <AlertDescription className="flex items-center gap-2">
                  <Lock size={16} />
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              disabled={isLoading || !password}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles size={18} />
                  Access Dashboard
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Default credentials for demo:
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg border border-border/50">
                <Lock size={14} className="text-muted-foreground" />
                <code className="text-purple-600 dark:text-purple-400 font-mono">admin123</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}