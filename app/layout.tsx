import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Link Manager - Create Your Personal Link Hub',
  description: 'Create and manage your personal social media link hub with a beautiful, customizable profile page.',
  keywords: 'social links, link in bio, profile page, social media manager',
  authors: [{ name: 'Social Link Manager' }],
  openGraph: {
    title: 'Social Link Manager',
    description: 'Create your personal link hub',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}