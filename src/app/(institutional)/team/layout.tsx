// Temporary force-dynamic configuration to prevent timeout issues
export const dynamic = 'force-dynamic';

interface TeamLayoutProps {
  children: React.ReactNode;
}

export default function TeamLayout({ children }: TeamLayoutProps) {
  return <>{children}</>;
}