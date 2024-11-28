'use client'

import React from 'react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'

interface RiskVisualizationProps {
  riskProfile: {
    [category: string]: number
  }
}

const RiskVisualizationChart: React.FC<RiskVisualizationProps> = ({
  riskProfile,
}) => {
  // Transform risk profile into recharts-compatible format
  if (!riskProfile) return
  const chartData = Object.entries(riskProfile).map(([subject, value]) => ({
    subject,
    A: value * 100,
    fullMark: 100,
  }))

  return (
    <Card className='w-full h-[400px]'>
      <CardHeader>
        <CardTitle>Genetic Risk Radar Chart</CardTitle>
      </CardHeader>
      <CardContent className='h-full'>
        <ResponsiveContainer width='100%' height='90%'>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey='subject' />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name='Risk Level'
              dataKey='A'
              stroke='#8884d8'
              fill='#8884d8'
              fillOpacity={0.6}
            />
            <Tooltip
              formatter={value => [`${value.toFixed(2)}%`, 'Risk Level']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export { RiskVisualizationChart }
