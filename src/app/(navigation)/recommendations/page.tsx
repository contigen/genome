'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { motion } from 'framer-motion'
import {
  Heart,
  Utensils,
  Dumbbell,
  Calendar,
  Download,
  Activity,
} from 'lucide-react'
import { useGeneticData } from '&/app/genetic-data-context'
import { Label } from '&/components/ui/label'

const AnimatedCard = motion(Card)

export default function RecommendationsPage() {
  const { geneticData } = useGeneticData()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dietary')

  useEffect(() => {
    if (!geneticData) {
      router.push('/upload')
    }
  }, [geneticData, router])

  if (!geneticData) {
    return <div>Loading...</div>
  }

  const RecommendationCard = ({ icon, title, description }) => (
    <Card className='mb-4 bg-gradient-to-br from-blue-50 to-purple-50 border-none'>
      <CardContent className='flex items-start p-6'>
        <div className='mr-4 bg-white p-2 rounded-full shadow-md'>{icon}</div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>{title}</h3>
          <p className='text-gray-600'>{description}</p>
        </div>
      </CardContent>
    </Card>
  )

  const categoryIcons = {
    Dietary: <Utensils className='h-6 w-6 text-green-500' />,
    Lifestyle: <Activity className='h-6 w-6 text-blue-500' />,
    Medical: <Heart className='h-6 w-6 text-red-500' />,
    Fitness: <Dumbbell className='h-6 w-6 text-purple-500' />,
  }

  return (
    <div className='space-y-6 p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800'>
        Personalized Recommendations
      </h1>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white'
      >
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            Your Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='prose max-w-none'>
            <p>
              Based on your genetic profile, we&rsquo;ve generated personalized
              recommendations to optimize your health and well-being.
            </p>
          </div>
        </CardContent>
      </AnimatedCard>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Health Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='dietary'>Dietary</TabsTrigger>
              <TabsTrigger value='lifestyle'>Lifestyle</TabsTrigger>
              <TabsTrigger value='medical'>Medical</TabsTrigger>
              <TabsTrigger value='fitness'>Fitness</TabsTrigger>
            </TabsList>
            {['dietary', 'lifestyle', 'medical', 'fitness'].map(category => (
              <TabsContent key={category} value={category}>
                {geneticData.recommendations
                  .filter(rec => rec.category.toLowerCase() === category)
                  .map((rec, index) => (
                    <RecommendationCard
                      key={index}
                      icon={categoryIcons[rec.category]}
                      title={rec.title}
                      description={rec.description}
                    />
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </AnimatedCard>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CardHeader>
          <CardTitle>Personalized Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            {geneticData.recommendations.slice(0, 4).map((rec, index) => (
              <li key={index} className='flex items-center'>
                <Label>
                  <input type='checkbox' className='mr-2' />
                </Label>
                <span>{rec.title}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </AnimatedCard>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button className='w-full'>
            <Calendar className='mr-2 h-4 w-4' />
            Schedule a Consultation
          </Button>
          <Button variant='outline' className='w-full'>
            <Download className='mr-2 h-4 w-4' />
            Download Full Report
          </Button>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
