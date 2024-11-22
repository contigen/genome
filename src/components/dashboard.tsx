'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import { Progress } from '&/components/ui/progress'
import { Dna, Activity, FileText, Lightbulb, Brain, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const AnimatedCard = motion(Card)

export function Dashboard() {
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnalysisProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className='space-y-6'>
      <section className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-2'>
          Hello, User! Ready to explore your genetic insights?
        </h1>
        <p className='text-xl'>
          Your journey to understanding your DNA starts here.
        </p>
      </section>
      <h2 className='text-3xl font-bold'>Welcome to Your Genome Dashboard</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Analyses
            </CardTitle>
            <Dna className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>12</div>
            <p className='text-xs text-muted-foreground'>+2 from last month</p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Health Insights
            </CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>24</div>
            <p className='text-xs text-muted-foreground'>+4 new insights</p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Reports Generated
            </CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>7</div>
            <p className='text-xs text-muted-foreground'>+1 from last week</p>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Recommendations
            </CardTitle>
            <Lightbulb className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>18</div>
            <p className='text-xs text-muted-foreground'>
              +3 personalized insights
            </p>
          </CardContent>
        </AnimatedCard>
      </div>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CardHeader>
          <CardTitle>Latest Analysis Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={analysisProgress} className='w-full' />
          <p className='mt-2 text-sm text-muted-foreground'>
            {analysisProgress < 100
              ? `Analyzing... ${Math.round(analysisProgress)}% complete`
              : 'Analysis complete!'}
          </p>
        </CardContent>
      </AnimatedCard>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Button asChild className='w-full'>
              <Link href='/upload'>Upload New Data</Link>
            </Button>
            <Button asChild variant='outline' className='w-full'>
              <Link href='/analysis'>Start New Analysis</Link>
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              <li className='flex items-center space-x-2'>
                <Activity className='h-4 w-4 text-blue-500' />
                <span className='text-sm'>
                  New health insight: Cardiovascular risk assessment
                </span>
              </li>
              <li className='flex items-center space-x-2'>
                <FileText className='h-4 w-4 text-green-500' />
                <span className='text-sm'>
                  Generated ancestry composition report
                </span>
              </li>
              <li className='flex items-center space-x-2'>
                <Lightbulb className='h-4 w-4 text-yellow-500' />
                <span className='text-sm'>
                  New recommendation: Optimize vitamin D intake
                </span>
              </li>
            </ul>
          </CardContent>
        </AnimatedCard>
        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CardHeader>
            <CardTitle>Latest Insights</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='flex items-center space-x-2'>
              <Brain className='h-4 w-4 text-blue-500' />
              <span>Your cognitive function genes show high potential.</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Zap className='h-4 w-4 text-yellow-500' />
              <span>
                New recommendations for improving heart health available.
              </span>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}
