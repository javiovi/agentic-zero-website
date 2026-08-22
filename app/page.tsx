import AgenticZeroLanding from '@/components/agentic-zero-landing'

// Keep the route server-owned so the raw response always contains the complete
// page. The interactive landing remains a Client Component below it.
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return <AgenticZeroLanding />
}
