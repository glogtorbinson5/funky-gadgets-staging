import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Modular Prompt Builder',
  description: 'Generate optimized Stable Diffusion XL prompts with organized sections',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
