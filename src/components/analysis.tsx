// 'use client'

// import { useState } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
// import { Button } from '&/components/ui/button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '&/components/ui/select'
// import { Progress } from '&/components/ui/progress'
// import { Dna, Activity, Microscope, Fingerprint } from 'lucide-react'
// import { motion } from 'framer-motion'

// const AnimatedCard = motion(Card)

// export function AnalysisPage() {
//   const [analysisType, setAnalysisType] = useState('')
//   const [progress, setProgress] = useState(0)
//   const [result, setResult] = useState<string | null>(null)

//   const startAnalysis = async () => {
//     setProgress(0)
//     setResult(null)
//     const interval = setInterval(() => {
//       setProgress(oldProgress => {
//         if (oldProgress >= 100) {
//           clearInterval(interval)
//           setResult('Analysis complete! Here are your results...')
//           return 100
//         }
//         return oldProgress + 10
//       })
//     }, 500)
//   }

//   const getAnalysisIcon = (type: string) => {
//     switch (type) {
//       case 'disease-risk':
//         return <Activity className='w-6 h-6 text-red-500' />
//       case 'drug-response':
//         return <Microscope className='w-6 h-6 text-green-500' />
//       case 'ancestry':
//         return <Fingerprint className='w-6 h-6 text-blue-500' />
//       case 'trait-prediction':
//         return <Dna className='w-6 h-6 text-purple-500' />
//       default:
//         return <Dna className='w-6 h-6 text-gray-500' />
//     }
//   }

//   return (
//     <div className='space-y-6 p-6 bg-gray-50 min-h-screen'>
//       <h1 className='text-3xl font-bold text-gray-800'>Genetic Analysis</h1>

//       <AnimatedCard
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className='bg-white'
//       >
//         <CardHeader>
//           <CardTitle className='text-xl font-semibold'>
//             Start New Analysis
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className='space-y-4'>
//             <Select onValueChange={setAnalysisType}>
//               <SelectTrigger className='w-full'>
//                 <SelectValue placeholder='Select analysis type' />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value='disease-risk'>
//                   Disease Risk Assessment
//                 </SelectItem>
//                 <SelectItem value='drug-response'>
//                   Drug Response Prediction
//                 </SelectItem>
//                 <SelectItem value='ancestry'>Ancestry Analysis</SelectItem>
//                 <SelectItem value='trait-prediction'>
//                   Trait Prediction
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//             <Button
//               onClick={startAnalysis}
//               disabled={!analysisType}
//               className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded'
//             >
//               Run Analysis
//             </Button>
//           </div>
//         </CardContent>
//       </AnimatedCard>

//       {progress > 0 && (
//         <AnimatedCard
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className='bg-white'
//         >
//           <CardHeader>
//             <CardTitle className='text-xl font-semibold'>
//               Analysis Progress
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Progress
//               value={progress}
//               className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'
//             >
//               <div
//                 className='h-full bg-gradient-to-r from-green-400 to-blue-500'
//                 style={{ width: `${progress}%` }}
//               />
//             </Progress>
//             <p className='mt-2 text-sm text-gray-600'>
//               {progress < 33 && 'Preprocessing data...'}
//               {progress >= 33 && progress < 66 && 'Applying AI models...'}
//               {progress >= 66 && progress < 100 && 'Generating insights...'}
//               {progress === 100 && 'Analysis complete!'}
//             </p>
//           </CardContent>
//         </AnimatedCard>
//       )}

//       {result && (
//         <AnimatedCard
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className='bg-white'
//         >
//           <CardHeader className='flex flex-row items-center space-x-2'>
//             {getAnalysisIcon(analysisType)}
//             <CardTitle className='text-xl font-semibold'>
//               Analysis Results
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className='prose max-w-none'>
//               <p>{result}</p>
//               {/* Add more detailed results here */}
//             </div>
//           </CardContent>
//         </AnimatedCard>
//       )}
//     </div>
//   )
// }

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
} from 'lucide-react'
import { motion } from 'framer-motion'

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
                These results are for informational purposes only and should not
                be considered medical advice. Please consult with a healthcare
                professional for interpretation and guidance.
              </p>
            </div>
          </CardContent>
        </AnimatedCard>
      )}
    </div>
  )
}
