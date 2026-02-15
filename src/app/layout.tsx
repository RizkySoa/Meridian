import type { Metadata, Viewport } from 'next';
import { TaskProvider } from '@/context/TaskContext';
import Header from '@/components/Header/Header';
import './globals.css';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Meridian — Eisenhower Task Matrix',
  description: 'A minimalist Eisenhower Matrix for clear-headed prioritisation.',
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#F5F4EF',
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>
          <Header />
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
