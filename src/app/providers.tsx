'use client'

import { SessionProvider } from 'next-auth/react'
import { GeneticDataProvider } from './genetic-data-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <GeneticDataProvider>{children}</GeneticDataProvider>
    </SessionProvider>
  )
}
