'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '&/lib/utils'
import { Button } from '&/components/ui/button'
import {
  Dna,
  BarChart2,
  FileText,
  Upload,
  BookOpen,
  Settings,
  Heart,
  Home,
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Upload Data', href: '/upload', icon: Upload },
  { name: 'Analysis Report', href: '/analysis', icon: FileText },
  { name: 'Recommendations', href: '/recommendations', icon: Heart },
  { name: 'Explore Insights', href: '/insights', icon: Dna },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Resources', href: '/resources', icon: BookOpen },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className='flex justify-between items-center p-4 bg-white border-b'>
      <div className='flex items-center space-x-2'>
        <Dna className='h-8 w-8 text-blue-500' />
        <Link href='/'>
          <span className='text-xl font-bold text-blue-600'>Genome</span>
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
                  'flex items-center',
                  isActive && 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                )}
              >
                <item.icon className='h-4 w-4' />
                <span>{item.name}</span>
              </Button>
            </Link>
          )
        })}
        <Button
          type='submit'
          onClick={() => signOut({ redirectTo: `/` })}
          className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300'
        >
          Sign out
        </Button>
      </div>
    </nav>
  )
}
