'use client'

import Link from 'next/link'
import { Button } from '&/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { ChevronRight, BarChart2, Database, Network, Dna } from 'lucide-react'

export function LandingPageComponent() {
  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
          <Link href='/' className='flex items-center space-x-2'>
            <Dna className='h-8 w-8 text-blue-500' />
            <span className='text-xl font-semibold text-blue-600'>Genome</span>
          </Link>
          <nav className='hidden md:flex space-x-4'>
            <Link
              href='#features'
              className='text-gray-500 hover:text-gray-900'
            >
              Features
            </Link>
            <Link href='#about' className='text-gray-500 hover:text-gray-900'>
              About
            </Link>
            <Link href='#contact' className='text-gray-500 hover:text-gray-900'>
              Contact
            </Link>
          </nav>
          <Button asChild>
            <Link href='/dashboard'>Get Started</Link>
          </Button>
        </div>
      </header>

      <main>
        <section className='py-20 px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
            Unlock the Power of{' '}
            <span className='text-blue-600'>Genomic Data</span>
          </h1>
          <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
            Genome is a cutting-edge platform for genomic data visualization and
            analysis. Discover insights, predict traits, and explore gene
            networks with ease.
          </p>
          <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
            <Button size='lg' asChild>
              <Link href='/dashboard'>
                Get Started
                <ChevronRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </section>

        <section id='features' className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-extrabold text-gray-900 text-center mb-12'>
              Key Features
            </h2>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Database className='h-6 w-6 text-blue-600' />
                    <span>Data Upload</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Easily upload and manage your genomic datasets with support
                    for various file formats.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <BarChart2 className='h-6 w-6 text-blue-600' />
                    <span>Advanced Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Perform complex genomic analyses including trait prediction
                    and risk factor identification.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Network className='h-6 w-6 text-blue-600' />
                    <span>Interactive Visualizations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Explore gene networks and expression patterns with
                    interactive, customizable visualizations.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <Dna className='h-6 w-6 text-blue-600' />
                    <span>Genomic Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Gain valuable insights into genetic variations and their
                    potential impacts on health and traits.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id='about' className='py-16 bg-slate-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-3xl font-extrabold text-gray-900 text-center mb-8'>
              About Genome
            </h2>
            <p className='text-lg text-gray-500 max-w-3xl mx-auto text-center'>
              Genome is a state-of-the-art platform designed for researchers,
              clinicians, and genomics enthusiasts. Our mission is to make
              genomic data analysis accessible, intuitive, and powerful,
              enabling breakthroughs in personalized medicine and genetic
              research.
            </p>
          </div>
        </section>

        <section id='contact' className='py-16 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900 mb-8'>
              Get in Touch
            </h2>
            <p className='text-lg text-gray-500 mb-8'>
              Have questions or need support? We&rsquo;re here to help!
            </p>
            <Button size='lg'>Contact Us</Button>
          </div>
        </section>
      </main>

      <footer className='bg-gray-800 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Genome</h3>
              <p className='text-gray-400'>
                Empowering genomic research and personalized medicine.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='#features'
                    className='text-gray-400 hover:text-white'
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href='#about'
                    className='text-gray-400 hover:text-white'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='#contact'
                    className='text-gray-400 hover:text-white'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Legal</h3>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='#' className='text-gray-400 hover:text-white'>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-gray-700 text-center text-gray-400'>
            <p>&copy; 2024 Genome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
