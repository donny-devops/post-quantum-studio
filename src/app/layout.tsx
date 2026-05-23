import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Post-Quantum Studio',
  description: 'PQC migration readiness cockpit for engineering and security teams.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
