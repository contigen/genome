'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '&/lib/utils'
import { Button } from '&/components/ui/button'
import { Dna, BarChart2, FileText, Lightbulb, Upload } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  { name: 'Upload', href: '/upload', icon: Upload },
  { name: 'Analysis', href: '/analysis', icon: Dna },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Recommendations', href: '/recommendations', icon: Lightbulb },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className='flex justify-between items-center p-4 bg-white border-b'>
      <div className='flex items-center space-x-4'>
        <Dna className='h-8 w-8 text-blue-500' />
        <Link href='/'>
          <span className='text-xl font-bold'>Genome</span>
        </Link>
      </div>
      <div className='flex space-x-4'>
        {navItems.map(item => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'flex items-center space-x-2',
                  isActive && 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                )}
              >
                <item.icon className='h-4 w-4' />
                <span>{item.name}</span>
              </Button>
            </Link>
          )
        })}
      </div>
      <Button variant='outline'>Sign Out</Button>
    </nav>
  )
}
