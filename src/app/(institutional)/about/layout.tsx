// Force dynamic rendering for this route group
// Remove after fixing the root cause
export const dynamic = 'force-dynamic'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}