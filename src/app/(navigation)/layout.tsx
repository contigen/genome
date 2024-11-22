import { Navbar } from '&/components/navbar'
import { Toaster } from '&/components/ui/toaster'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      <main className='flex-grow p-6'>{children}</main>
      <Toaster />
    </div>
  )
}
