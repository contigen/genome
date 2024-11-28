'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '&/components/ui/progress'
import { Badge } from '&/components/ui/badge'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { useGeneticData } from '&/app/genetic-data-context'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import { TooltipProvider } from '&/components/ui/tooltip'
import GeneticMarkersView from './genetic-markers'
import { RiskVisualizationChart } from './risk-visualisation'

const AnimatedCard = motion(Card)

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function AnalysisPage() {
  const { geneticData } = useGeneticData()
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (!geneticData) {
      router.push('/upload')
    }
  }, [geneticData, router])

  if (!geneticData) {
    return <div>Loading...</div>
  }

  const riskData = [
    {
      name: 'Low Risk',
      value: geneticData.riskFactors.filter(r => r.riskLevel === 'Low').length,
    },
    {
      name: 'Moderate Risk',
      value: geneticData.riskFactors.filter(r => r.riskLevel === 'Moderate')
        .length,
    },
    {
      name: 'High Risk',
      value: geneticData.riskFactors.filter(r => r.riskLevel === 'High').length,
    },
  ]

  return (
    <TooltipProvider>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Genetic Analysis</h1>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span>Total genetic markers analyzed:</span>
                <span className='font-bold'>
                  {geneticData.summary.totalMarkersAnalyzed.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span>Identified risk factors:</span>
                <span className='font-bold'>
                  {geneticData.summary.identifiedRiskFactors}
                </span>
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span>Overall Health Score:</span>
                  <span className='font-bold'>
                    {geneticData.summary.overallHealthScore}/100
                  </span>
                </div>
                <Progress
                  value={geneticData.summary.overallHealthScore}
                  className='w-full'
                />
              </div>
              <div>
                <h3 className='font-semibold mb-2'>Strong Traits:</h3>
                <div className='flex flex-wrap gap-2'>
                  {geneticData.summary.strongTraits.map((trait, index) => (
                    <Badge key={index} variant='secondary'>
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <GeneticMarkersView geneticMarkers={geneticData.geneticMarkers} />

        <RiskVisualizationChart
          riskProfile={geneticData.personalRiskPofile.riskCategories}
        />
        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {riskData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardHeader>
            <CardTitle>Gene-Based Health Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {geneticData.riskFactors.map((risk, index) => (
                <div
                  key={index}
                  className='border-b pb-4 last:border-b-0 last:pb-0'
                >
                  <div className='flex justify-between items-center mb-2'>
                    <span className='font-semibold'>{risk.name}</span>
                    <Badge
                      variant={
                        risk.riskLevel === 'High'
                          ? 'destructive'
                          : risk.riskLevel === 'Moderate'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {risk.riskLevel} Risk
                    </Badge>
                  </div>
                  <p className='text-sm text-gray-600'>{risk.description}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setShowDetails(!showDetails)}
              className='mt-4 w-full'
            >
              {showDetails ? 'Hide Details' : 'Show More Details'}
            </Button>
          </CardContent>
        </AnimatedCard>

        {showDetails && (
          <AnimatedCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader>
              <CardTitle>Detailed Genetic Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {geneticData.detailedInsights.map((insight, index) => (
                  <div key={index}>
                    <h3 className='font-semibold mb-2'>
                      {insight.geneName} ({insight.variant})
                    </h3>
                    <Badge
                      variant={
                        insight.confidenceLevel === 'High'
                          ? 'default'
                          : insight.confidenceLevel === 'Medium'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {insight.confidenceLevel} Confidence
                    </Badge>
                    <p className='text-sm mt-2'>
                      <strong>Effect:</strong> {insight.effect}
                    </p>
                    <p className='text-sm text-gray-600 mt-1'>
                      {insight.laySummary}
                    </p>
                    <details className='mt-2'>
                      <summary className='text-sm font-semibold cursor-pointer'>
                        Scientific Summary
                      </summary>
                      <p className='text-sm mt-1'>
                        {insight.scientificSummary}
                      </p>
                    </details>
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        )}

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc list-inside space-y-2'>
              <li>Schedule a follow-up with a genetic counselor</li>
              <li>Review your personalized health recommendations</li>
              <li>
                Consider sharing this report with your healthcare provider
              </li>
            </ul>
          </CardContent>
        </AnimatedCard>
      </div>
    </TooltipProvider>
  )
}
