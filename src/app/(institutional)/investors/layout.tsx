// Temporary force-dynamic configuration to prevent timeout issues
export const dynamic = 'force-dynamic';

interface InvestorsLayoutProps {
  children: React.ReactNode;
}

export default function InvestorsLayout({ children }: InvestorsLayoutProps) {
  return <>{children}</>;
}