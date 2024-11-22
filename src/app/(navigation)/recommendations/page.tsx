'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import { motion } from 'framer-motion'
import {
  Heart,
  Utensils,
  Dumbbell,
  Brain,
  Calendar,
  Download,
  RussianRuble,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'

const AnimatedCard = motion(Card)

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateRecommendations()
  }, [])

  const generateRecommendations = async () => {
    setRecommendations(null)
    setLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRecommendations(
      'Based on your genetic profile, we recommend focusing on cardiovascular health, increasing vitamin D intake, and engaging in regular strength training exercises.'
    )
    setLoading(false)
  }

  const RecommendationCard = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode
    title: string
    description: string
  }) => (
    <Card className='bg-gradient-to-br from-blue-50 to-purple-50 border-none'>
      <CardContent className='pt-6'>
        <div className='flex items-center space-x-4'>
          <div className='bg-white p-2 rounded-full shadow-md'>{icon}</div>
          <div>
            <h3 className='font-semibold text-lg'>{title}</h3>
            <p className='text-sm text-gray-600'>{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
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
            {loading ? (
              <div className='flex justify-center items-center h-40'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
              </div>
            ) : recommendations ? (
              <div className='prose max-w-none'>
                <p>{recommendations}</p>
              </div>
            ) : (
              <p className='text-gray-500'>No recommendations generated yet.</p>
            )}
            <Button
              onClick={generateRecommendations}
              className='mt-4 w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-2 px-4 rounded'
            >
              Refresh Recommendations
            </Button>
          </CardContent>
        </AnimatedCard>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <RecommendationCard
            icon={<Heart className='w-6 h-6 text-red-500' />}
            title='Heart Health'
            description='Maintain a healthy diet and exercise regularly.'
          />
          <RecommendationCard
            icon={<Utensils className='w-6 h-6 text-green-500' />}
            title='Nutrition'
            description='Increase intake of omega-3 fatty acids and antioxidants.'
          />
          <RecommendationCard
            icon={<Dumbbell className='w-6 h-6 text-blue-500' />}
            title='Fitness'
            description='Engage in strength training and high-intensity interval training.'
          />
          <RecommendationCard
            icon={<Brain className='w-6 h-6 text-purple-500' />}
            title='Cognitive Health'
            description='Practice mindfulness and engage in brain-training exercises.'
          />
        </div>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='bg-white'
        >
          <CardHeader>
            <CardTitle className='text-xl font-semibold'>Take Action</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Button className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center'>
                <Calendar className='w-5 h-5 mr-2' />
                Schedule a Consultation
              </Button>
              <Button
                variant='outline'
                className='w-full border-blue-500 text-blue-500 hover:bg-blue-50 font-bold py-2 px-4 rounded flex items-center justify-center'
              >
                <Download className='w-5 h-5 mr-2' />
                Download Full Report
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
      <Recommendations />
    </>
  )
}

const recommendations = {
  dietary: [
    {
      title: 'Increase Folate Intake',
      description:
        'Your MTHFR gene suggests you need more folate. Include leafy greens in your diet.',
    },
    {
      title: 'Omega-3 Rich Foods',
      description:
        'Consider adding more fatty fish to your diet to support heart and brain health.',
    },
  ],
  lifestyle: [
    {
      title: 'Regular Exercise',
      description:
        "Your APOE gene suggests an increased risk of Alzheimer's. Regular exercise may help reduce risk.",
    },
    {
      title: 'Stress Management',
      description:
        'Practice mindfulness or meditation to help manage stress levels.',
    },
  ],
  screening: [
    {
      title: 'Annual Breast MRI',
      description: 'BRCA1 mutation detected. Schedule an annual breast MRI.',
    },
    {
      title: 'Cardiovascular Check-up',
      description:
        'Consider regular cardiovascular screenings due to your genetic profile.',
    },
  ],
}

function Recommendations() {
  const [activeTab, setActiveTab] = useState('dietary')

  const RecommendationCard = ({ title, description, icon }) => (
    <Card className='mb-4'>
      <CardContent className='flex items-start p-6'>
        <div className='mr-4'>{icon}</div>
        <div>
          <h3 className='text-lg font-semibold mb-2'>{title}</h3>
          <p className='text-gray-600'>{description}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className='space-y-6'>
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Health Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='dietary'>Dietary</TabsTrigger>
              <TabsTrigger value='lifestyle'>Lifestyle</TabsTrigger>
              <TabsTrigger value='screening'>Screening</TabsTrigger>
            </TabsList>
            <TabsContent value='dietary'>
              {recommendations.dietary.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  {...rec}
                  icon={<Utensils className='h-6 w-6 text-green-500' />}
                />
              ))}
            </TabsContent>
            <TabsContent value='lifestyle'>
              {recommendations.lifestyle.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  {...rec}
                  icon={<RussianRuble className='h-6 w-6 text-blue-500' />}
                />
              ))}
            </TabsContent>
            <TabsContent value='screening'>
              {recommendations.screening.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  {...rec}
                  icon={<Heart className='h-6 w-6 text-red-500' />}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </AnimatedCard>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CardHeader>
          <CardTitle>Personalized Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2'>
            <li className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span>Schedule a genetic counseling session</span>
            </li>
            <li className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span>Start a Mediterranean diet</span>
            </li>
            <li className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span>Begin a regular exercise routine</span>
            </li>
            <li className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              <span>Schedule recommended health screenings</span>
            </li>
          </ul>
        </CardContent>
      </AnimatedCard>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
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
            <Brain className='mr-2 h-4 w-4' />
            Explore Educational Resources
          </Button>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
