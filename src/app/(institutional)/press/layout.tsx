// Temporary force-dynamic configuration to prevent timeout issues
export const dynamic = 'force-dynamic';

interface PressLayoutProps {
  children: React.ReactNode;
}

export default function PressLayout({ children }: PressLayoutProps) {
  return <>{children}</>;
}