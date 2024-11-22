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
import { Progress } from '&/components/ui/progress'
import {
  Dna,
  Activity,
  Microscope,
  Fingerprint,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const AnimatedCard = motion(Card)

export function AnalysisPage() {
  const [analysisType, setAnalysisType] = useState('')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<string | null>(null)

  const startAnalysis = async () => {
    setProgress(0)
    setResult(null)
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          clearInterval(interval)
          setResult(getMockResult(analysisType))
          return 100
        }
        return oldProgress + 10
      })
    }, 500)
  }

  const getMockResult = (type: string) => {
    switch (type) {
      case 'disease-risk':
        return `
          <h3>Disease Risk Assessment Results</h3>
          <p>Based on your genetic profile, we've identified the following risk factors:</p>
          <ul>
            <li><strong>Type 2 Diabetes:</strong> Slightly elevated risk (1.2x average)</li>
            <li><strong>Coronary Heart Disease:</strong> Average risk</li>
            <li><strong>Alzheimer's Disease:</strong> Lower than average risk (0.8x average)</li>
          </ul>
          <p><strong>Note:</strong> These results are based on genetic factors only and do not account for lifestyle or environmental influences.</p>
        `
      case 'drug-response':
        return `
          <h3>Drug Response Prediction Results</h3>
          <p>Your genetic profile suggests the following drug responses:</p>
          <ul>
            <li><strong>Warfarin:</strong> Likely to require a lower dose</li>
            <li><strong>Clopidogrel:</strong> Normal response expected</li>
            <li><strong>Simvastatin:</strong> Increased risk of side effects, consider alternative</li>
          </ul>
          <p><strong>Important:</strong> Always consult with a healthcare professional before making any changes to your medication.</p>
        `
      case 'ancestry':
        return `
          <h3>Ancestry Analysis Results</h3>
          <p>Your genetic ancestry composition:</p>
          <ul>
            <li>45% Northern European</li>
            <li>30% Southern European</li>
            <li>15% East Asian</li>
            <li>10% Sub-Saharan African</li>
          </ul>
          <p>Your maternal haplogroup: H1, commonly found in Europe</p>
          <p>Your paternal haplogroup: R1b, most common in Western Europe</p>
        `
      case 'trait-prediction':
        return `
          <h3>Trait Prediction Results</h3>
          <p>Based on your genetic markers, you may have:</p>
          <ul>
            <li>Blue eyes (80% probability)</li>
            <li>Curly hair (65% probability)</li>
            <li>Lactose tolerance</li>
            <li>Fast metabolizer of caffeine</li>
            <li>Higher than average muscle composition</li>
          </ul>
          <p><strong>Remember:</strong> Genes are just one factor in determining traits. Environment and lifestyle also play significant roles.</p>
        `
      default:
        return 'An error occurred while generating the analysis results.'
    }
  }

  const getAnalysisIcon = (type: string) => {
    switch (type) {
      case 'disease-risk':
        return <Activity className='w-6 h-6 text-red-500' />
      case 'drug-response':
        return <Microscope className='w-6 h-6 text-green-500' />
      case 'ancestry':
        return <Fingerprint className='w-6 h-6 text-blue-500' />
      case 'trait-prediction':
        return <Dna className='w-6 h-6 text-purple-500' />
      default:
        return <Dna className='w-6 h-6 text-gray-500' />
    }
  }

  return (
    <>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Genetic Analysis</h1>

        <AnimatedCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader>
            <CardTitle>Start New Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <Select onValueChange={setAnalysisType}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select analysis type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='disease-risk'>
                    Disease Risk Assessment
                  </SelectItem>
                  <SelectItem value='drug-response'>
                    Drug Response Prediction
                  </SelectItem>
                  <SelectItem value='ancestry'>Ancestry Analysis</SelectItem>
                  <SelectItem value='trait-prediction'>
                    Trait Prediction
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={startAnalysis}
                disabled={!analysisType}
                className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded'
              >
                Run Analysis
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>

        {progress > 0 && (
          <AnimatedCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle>Analysis Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={progress}
                className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'
              >
                <div
                  className='h-full bg-gradient-to-r from-green-400 to-blue-500'
                  style={{ width: `${progress}%` }}
                />
              </Progress>
              <p className='mt-2 text-sm text-gray-600'>
                {progress < 33 && 'Preprocessing data...'}
                {progress >= 33 && progress < 66 && 'Applying AI models...'}
                {progress >= 66 && progress < 100 && 'Generating insights...'}
                {progress === 100 && 'Analysis complete!'}
              </p>
            </CardContent>
          </AnimatedCard>
        )}

        {result && (
          <AnimatedCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CardHeader className='flex flex-row items-center space-x-2'>
              {getAnalysisIcon(analysisType)}
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className='prose max-w-none'
                dangerouslySetInnerHTML={{ __html: result }}
              />
              <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start space-x-2'>
                <AlertTriangle className='w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5' />
                <p className='text-sm text-yellow-700'>
                  These results are for informational purposes only and should
                  not be considered medical advice. Please consult with a
                  healthcare professional for interpretation and guidance.
                </p>
              </div>
            </CardContent>
          </AnimatedCard>
        )}
      </div>
      <Analysis />
    </>
  )
}

const riskData = [
  { name: 'Low Risk', value: 60, color: '#4CAF50' },
  { name: 'Moderate Risk', value: 30, color: '#FFC107' },
  { name: 'High Risk', value: 10, color: '#F44336' },
]

const geneRisks = [
  {
    gene: 'BRCA1',
    risk: 'High',
    action: 'Regular breast cancer screenings recommended',
  },
  {
    gene: 'APOE',
    risk: 'Moderate',
    action: "Consider lifestyle changes to reduce Alzheimer's risk",
  },
  { gene: 'MTHFR', risk: 'Low', action: 'Monitor folate levels in your diet' },
]

function Analysis() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Genetic Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span>Total genetic markers analyzed:</span>
              <span className='font-bold'>500,000+</span>
            </div>
            <div className='flex justify-between items-center'>
              <span>Identified risk factors:</span>
              <span className='font-bold'>15</span>
            </div>
            <div className='flex items-center space-x-2 text-green-600'>
              <CheckCircle className='h-5 w-5' />
              <span>Strong immunity markers found in your data</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gene-Based Health Risks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {geneRisks.map((item, index) => (
              <div
                key={index}
                className='border-b pb-4 last:border-b-0 last:pb-0'
              >
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-semibold'>{item.gene}</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.risk === 'High'
                        ? 'bg-red-100 text-red-800'
                        : item.risk === 'Moderate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.risk} Risk
                  </span>
                </div>
                <p className='text-sm text-gray-600'>{item.action}</p>
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
      </Card>

      {showDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Genetic Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <h3 className='font-semibold mb-2'>BRCA1 Mutation</h3>
                <Progress value={75} className='h-2 mb-2' />
                <p className='text-sm text-gray-600'>
                  Your BRCA1 gene shows a mutation associated with an increased
                  risk of breast and ovarian cancer. Regular screenings and
                  consultations with a genetic counselor are recommended.
                </p>
              </div>
              <div>
                <h3 className='font-semibold mb-2'>APOE Gene Variant</h3>
                <Progress value={50} className='h-2 mb-2' />
                <p className='text-sm text-gray-600'>
                  You carry the APOE ε4 variant, which is associated with an
                  such as regular exercise and a healthy diet may help mitigate
                  this risk.
                </p>
              </div>
              <div>
                <h3 className='font-semibold mb-2'>MTHFR Gene</h3>
                <Progress value={25} className='h-2 mb-2' />
                <p className='text-sm text-gray-600'>
                  A variant in your MTHFR gene suggests you may have difficulty
                  processing folic acid. Consider increasing your intake of
                  leafy greens and discussing folate supplements with your
                  healthcare provider.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='list-disc list-inside space-y-2'>
            <li>Schedule a follow-up with a genetic counselor</li>
            <li>Review your personalized health recommendations</li>
            <li>Consider sharing this report with your healthcare provider</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
