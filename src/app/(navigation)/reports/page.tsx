'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '&/components/ui/select'
import { motion } from 'framer-motion'
import { FileText, Download, AlertTriangle } from 'lucide-react'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
} from 'recharts'

const AnimatedCard = motion(Card)

const healthRiskData = [
  { name: 'Type 2 Diabetes', risk: 1.5 },
  { name: 'Coronary Heart Disease', risk: 1.2 },
  { name: "Alzheimer's Disease", risk: 1.0 },
  { name: 'Breast Cancer', risk: 0.8 },
]

const ancestryData = [
  { name: 'European', value: 60 },
  { name: 'East Asian', value: 20 },
  { name: 'African', value: 15 },
  { name: 'South Asian', value: 5 },
]

const traitData = [
  { name: 'Eye Color (Brown)', probability: 80 },
  { name: 'Straight Hair', probability: 65 },
  { name: 'Lactose Tolerance', probability: 95 },
  { name: 'Fast Caffeine Metabolism', probability: 70 },
]

const pharmacogenomicsData = [
  { name: 'Warfarin', response: -1 },
  { name: 'Clopidogrel', response: 0 },
  { name: 'Simvastatin', response: 1 },
  { name: 'Codeine', response: 2 },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState('')
  const [report, setReport] = useState<string | null>(null)

  const generateReport = async () => {
    setReport(getMockReport(reportType))
  }

  const getMockReport = (type: string) => {
    switch (type) {
      case 'health-risk':
        return `
          <h3>Health Risk Assessment Report</h3>
          <p>Based on your genetic profile, we've identified the following health risks:</p>
          <ul>
            <li><strong>Type 2 Diabetes:</strong> Moderate risk (1.5x average population risk)</li>
            <li><strong>Coronary Heart Disease:</strong> Slightly elevated risk (1.2x average)</li>
            <li><strong>Alzheimer's Disease:</strong> Average risk</li>
            <li><strong>Breast Cancer:</strong> Slightly lower risk (0.8x average)</li>
          </ul>
          <p><strong>Recommendations:</strong></p>
          <ul>
            <li>Maintain a healthy diet and regular exercise routine</li>
            <li>Consider more frequent cardiovascular check-ups</li>
            <li>Engage in activities that promote cognitive health</li>
          </ul>
        `
      case 'ancestry':
        return `
          <h3>Ancestry Composition Report</h3>
          <p>Your genetic ancestry is composed of:</p>
          <ul>
            <li>60% European</li>
            <li>20% East Asian</li>
            <li>15% African</li>
            <li>5% South Asian</li>
          </ul>
          <p><strong>Haplogroups:</strong></p>
          <ul>
            <li>Maternal Haplogroup: H1 (common in Europe)</li>
            <li>Paternal Haplogroup: O2 (common in East Asia)</li>
          </ul>
          <p>Your genetic profile suggests a rich, diverse ancestry with significant contributions from multiple populations.</p>
        `
      case 'trait':
        return `
          <h3>Trait Predictions Report</h3>
          <p>Based on your genetic markers, you may have the following traits:</p>
          <ul>
            <li><strong>Eye Color:</strong> 80% chance of brown eyes</li>
            <li><strong>Hair Type:</strong> 65% chance of straight hair</li>
            <li><strong>Lactose Tolerance:</strong> 95% likely to be lactose tolerant</li>
            <li><strong>Caffeine Metabolism:</strong> 70% chance of being a fast metabolizer (may need more caffeine for effect)</li>
          </ul>
          <p><strong>Note:</strong> These predictions are based on genetic factors only. Environmental factors also play a significant role in trait expression.</p>
        `
      case 'pharmacogenomics':
        return `
          <h3>Pharmacogenomics Report</h3>
          <p>Your genetic profile suggests the following responses to medications:</p>
          <ul>
            <li><strong>Warfarin (blood thinner):</strong> Likely to require a lower dose</li>
            <li><strong>Clopidogrel (antiplatelet):</strong> Normal response expected</li>
            <li><strong>Simvastatin (cholesterol-lowering):</strong> Increased risk of muscle toxicity, consider alternative</li>
            <li><strong>Codeine (pain relief):</strong> Likely to be an ultra-rapid metabolizer, use with caution</li>
          </ul>
          <p><strong>Important:</strong> This information should be used in consultation with your healthcare provider. Do not make changes to your medication regimen without professional medical advice.</p>
        `
      default:
        return 'An error occurred while generating the report.'
    }
  }

  const renderVisualization = () => {
    switch (reportType) {
      case 'health-risk':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Health Risk Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={healthRiskData}
                index='name'
                categories={['risk']}
                colors={['sky']}
                valueFormatter={value => `${value}x`}
                yAxisWidth={48}
              />
            </CardContent>
          </Card>
        )
      case 'ancestry':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Ancestry Composition</CardTitle>
            </CardHeader>
            <CardContent className='flex items-center justify-center h-80'>
              <PieChart
                data={ancestryData}
                category='value'
                index='name'
                valueFormatter={value => `${value}%`}
                colors={['sky', 'violet', 'green', 'rose']}
              />
            </CardContent>
          </Card>
        )
      case 'trait':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Trait Probabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={traitData}
                index='name'
                categories={['probability']}
                colors={['violet']}
                valueFormatter={value => `${value}%`}
                yAxisWidth={48}
              />
            </CardContent>
          </Card>
        )
      case 'pharmacogenomics':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Drug Response Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={pharmacogenomicsData}
                index='name'
                categories={['response']}
                colors={['emerald']}
                valueFormatter={value => {
                  const responses = [
                    'Lower Dose',
                    'Normal',
                    'Higher Dose',
                    'Use Caution',
                  ]
                  return responses[value + 1]
                }}
                yAxisWidth={48}
              />
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Genetic Reports</h1>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <Select onValueChange={setReportType}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select report type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='health-risk'>
                  Health Risk Assessment
                </SelectItem>
                <SelectItem value='ancestry'>Ancestry Composition</SelectItem>
                <SelectItem value='trait'>Trait Predictions</SelectItem>
                <SelectItem value='pharmacogenomics'>
                  Pharmacogenomics
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={generateReport}
              disabled={!reportType}
              className='w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded'
            >
              Generate Report
            </Button>
          </div>
        </CardContent>
      </AnimatedCard>

      {report && (
        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardHeader className='flex flex-row items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <FileText className='w-6 h-6 text-blue-500' />
              <CardTitle>{reportType.replace('-', ' ')} Report</CardTitle>
            </div>
            <Button variant='outline' size='sm'>
              <Download className='w-4 h-4 mr-2' />
              Download PDF
            </Button>
          </CardHeader>
          <CardContent>
            <div
              className='prose max-w-none'
              dangerouslySetInnerHTML={{ __html: report }}
            />
            <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start space-x-2'>
              <AlertTriangle className='w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5' />
              <p className='text-sm text-yellow-700'>
                This report is for informational purposes only and should not be
                considered medical advice. Please consult with a healthcare
                professional for interpretation and guidance.
              </p>
            </div>
          </CardContent>
        </AnimatedCard>
      )}

      {reportType && (
        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
          </CardHeader>
          <CardContent>{renderVisualization()}</CardContent>
        </AnimatedCard>
      )}
    </div>
  )
}
