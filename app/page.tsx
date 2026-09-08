import type { Metadata } from 'next'
import AgenticZeroLanding from '@/components/agentic-zero-landing'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    types: {
      'text/plain': '/llms.txt',
      'text/markdown': '/',
    },
  },
}

// Keep the route server-owned so the raw response always contains the complete
// page. Interactive controls are isolated within the landing component.
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return <AgenticZeroLanding />
}
