import type { Metadata } from 'next'
import { Suspense } from 'react'
import ConfirmClient from './confirm-client'

export const metadata: Metadata = {
  title: 'Agentic Zero',
  robots: { index: false, follow: false },
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmClient />
    </Suspense>
  )
}
