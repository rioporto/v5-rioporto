// Temporary force-dynamic configuration to prevent timeout issues
export const dynamic = 'force-dynamic';

interface ComplianceLayoutProps {
  children: React.ReactNode;
}

export default function ComplianceLayout({ children }: ComplianceLayoutProps) {
  return <>{children}</>;
}