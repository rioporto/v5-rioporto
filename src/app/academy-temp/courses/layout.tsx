// Temporary force-dynamic configuration to prevent timeout issues
export const dynamic = 'force-dynamic';

interface CoursesLayoutProps {
  children: React.ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return <>{children}</>;
}