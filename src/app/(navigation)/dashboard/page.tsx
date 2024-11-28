'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import { Progress } from '&/components/ui/progress'
import { Dna, Activity, FileText, Lightbulb, Brain, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useGeneticData } from '&/app/genetic-data-context'

const AnimatedCard = motion(Card)

export default function Dashboard() {
  const router = useRouter()
  const { geneticData, totalAnalyses } = useGeneticData()

  useEffect(() => {
    if (!geneticData) {
      router.push('/upload')
    }
  }, [geneticData, router])

  if (!geneticData) {
    return <div>Loading...</div>
  }

  const combinedInsights = [
    ...geneticData.detailedInsights.map(insight => ({
      type: 'insight',
      icon: <Brain className='h-4 w-4 text-blue-500' />,
      content: `${insight.geneName}: ${insight.laySummary}`,
    })),
    ...geneticData.recommendations.map(rec => ({
      type: 'recommendation',
      icon: <Zap className='h-4 w-4 text-yellow-500' />,
      content: rec.title,
    })),
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)

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
            <div className='text-2xl font-bold'>{totalAnalyses}</div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Health Score</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {geneticData.summary.overallHealthScore} /100
            </div>
            <Progress
              value={geneticData.summary.overallHealthScore}
              className='mt-2'
            />
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Risk Factors</CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {geneticData.summary.identifiedRiskFactors}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Strong Traits</CardTitle>
            <Lightbulb className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {geneticData.summary.strongTraits.length}
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CardHeader>
          <CardTitle>Latest Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {combinedInsights.map((item, index) => (
              <li key={index} className='flex items-center space-x-2'>
                {item.icon}
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
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
              <Link href='/analysis'>View Detailed Analysis</Link>
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-2'>
              {geneticData.recommendations.slice(0, 3).map((rec, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  <Activity
                    className={`h-4 w-4 ${
                      rec.priority === 'High'
                        ? 'text-red-500'
                        : rec.priority === 'Medium'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`}
                  />
                  <span className='text-sm'>{rec.title}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant='link' className='mt-4'>
              <Link href='/recommendations'>View All Recommendations</Link>
            </Button>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}
