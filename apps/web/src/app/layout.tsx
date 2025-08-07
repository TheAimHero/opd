import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../index.css';
import Navbar from '@/components/Navbar';
import JotaiProvider from '@/components/providers/JotaiProvider';
import QueryProvider from '@/components/providers/QueryProvider';
import SidebarProvider from '@/components/providers/SidebarProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import ToastProvider from '@/components/providers/ToastProvider';
import AppSidebar from '@/components/Sidebar';
import { medicineSidebarItems } from '@/features/medicine/config/sidebar';
import { patientSidebarItems } from '@/features/patients/config/sidebar';
import { testSidebarItems } from '@/features/test/config/sidebar';
import { visitSidebarItems } from '@/features/visit/config/sidebar';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'opd',
  description: 'opd',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        'scrollbar-hidden max-h-screen max-w-screen',
        `${geistSans.variable}`
      )}
      lang="en"
    >
      <body className="scrollbar-hidden min-h-full min-w-full">
        <JotaiProvider>
          <QueryProvider>
            <ThemeProvider>
              <ToastProvider>
                <SidebarProvider>
                  <AppSidebar
                    items={[
                      patientSidebarItems,
                      visitSidebarItems,
                      medicineSidebarItems,
                      testSidebarItems,
                    ]}
                  />
                  <div className="scrollbar-hidden h-screen w-screen">
                    <Navbar />
                    <div className="box-border max-h-[calc(100vh-60px)] p-2">
                      {children}
                    </div>
                  </div>
                </SidebarProvider>
              </ToastProvider>
            </ThemeProvider>
          </QueryProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
