// Temporary force-dynamic configuration to prevent timeout issues
export const dynamic = 'force-dynamic';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}