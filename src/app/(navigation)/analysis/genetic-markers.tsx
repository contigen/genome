import { useState } from 'react'
import {
  Dna,
  AlertTriangle,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Activity,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '&/components/ui/tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '&/components/ui/accordion'
import { GeneticAnalysisResponse } from '&/types/genetic-analysis'
import { Progress } from '&/components/ui/progress'
import { motion } from 'framer-motion'
import { getMarkerResources } from '&/lib/medical-resources'

const RiskLevelIcon = ({ riskLevel }: { riskLevel: string }) => {
  switch (riskLevel) {
    case 'Low':
      return <ShieldCheck className='h-6 w-6 text-green-500' />
    case 'Moderate':
      return <AlertTriangle className='h-6 w-6 text-yellow-500' />
    case 'High':
      return <AlertTriangle className='h-6 w-6 text-red-500' />
    default:
      return <HelpCircle className='h-6 w-6 text-gray-500' />
  }
}

export function GeneticMarkersSummary({
  geneticMarkers,
}: {
  geneticMarkers: GeneticAnalysisResponse['geneticMarkers']
}) {
  const renderRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High':
        return `bg-red-100 text-red-800`
      case 'Moderate':
        return `bg-yellow-100 text-yellow-800`
      default:
        return `bg-green-100 text-green-800`
    }
  }

  return (
    <>
      <h2 className='text-3xl font-bold mb-4'>Genetic Markers Summary</h2>
      <div className='space-x-2'>
        {geneticMarkers.map(marker => (
          <Tooltip key={marker.id}>
            <TooltipTrigger>
              <div
                className={`
              flex items-center p-3 mb-2 rounded-lg 
              ${renderRiskLevelColor(marker.riskLevel)}
              cursor-pointer hover:opacity-80
            `}
              >
                <Activity className='mr-2' />
                <div>
                  <h4 className='font-semibold'>{marker.name}</h4>
                  <p className='text-sm'>
                    Risk Probability: {marker.riskProbability * 100}%
                  </p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {/* Interactive Marker Details */}
              <div className='max-w-xs p-4'>
                <h3 className='font-bold mb-2'>{marker.name} Details</h3>
                <p>Risk Level: {marker.riskLevel}</p>
                <p>
                  Associated Conditions:{' '}
                  {marker.associatedConditions.join(', ')}
                </p>
                <a
                  href={getMarkerResources(marker.id)?.researchLinks?.[0]?.url}
                  target='_blank'
                  className='text-blue-500 mt-2 inline-block'
                >
                  View Research
                </a>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </>
  )
}

const GeneticMarkersExplored: React.FC<{
  geneticMarkers: GeneticAnalysisResponse['geneticMarkers']
}> = ({ geneticMarkers }) => {
  const [expandedMarker, setExpandedMarker] = useState<string | null>(null)

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold mb-4'>Genetic Markers Explored</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {geneticMarkers.map(marker => (
          <motion.div
            key={marker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className='h-full flex flex-col'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-lg font-semibold'>
                  {marker.name}
                </CardTitle>
                <RiskLevelIcon riskLevel={marker.riskLevel} />
              </CardHeader>
              <CardContent>
                <CardDescription>{marker.fullName}</CardDescription>
                <div className='mt-2'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='flex items-center space-x-2'>
                          <Dna className='h-4 w-4 text-blue-500' />
                          <span className='text-sm font-medium'>
                            {marker.chromosome}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chromosome Location</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className='mt-4'>
                  <div className='text-sm font-medium mb-1'>
                    Risk Probability
                  </div>
                  <Progress
                    value={marker.riskProbability * 100}
                    className='h-2'
                  />
                  <div className='text-xs text-right mt-1'>
                    {(marker.riskProbability * 100).toFixed(1)}%
                  </div>
                </div>
              </CardContent>
              <CardFooter className='mt-auto'>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() =>
                    setExpandedMarker(
                      expandedMarker === marker.id ? null : marker.id
                    )
                  }
                >
                  {expandedMarker === marker.id ? (
                    <>
                      Less Details <ChevronUp className='ml-2 h-4 w-4' />
                    </>
                  ) : (
                    <>
                      More Details <ChevronDown className='ml-2 h-4 w-4' />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      {expandedMarker && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className='mt-6'>
            <CardHeader>
              <CardTitle>
                {geneticMarkers.find(m => m.id === expandedMarker)?.fullName}
              </CardTitle>
              <CardDescription>
                {geneticMarkers.find(m => m.id === expandedMarker)?.function}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='inheritance'>
                  <AccordionTrigger>Inheritance Pattern</AccordionTrigger>
                  <AccordionContent>
                    {
                      geneticMarkers.find(m => m.id === expandedMarker)
                        ?.inheritancePattern
                    }
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='risks'>
                  <AccordionTrigger>Detailed Risk Breakdown</AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(
                      geneticMarkers.find(m => m.id === expandedMarker)
                        ?.detailedRiskBreakdown || {}
                    ).map(([condition, data]) => (
                      <div key={condition} className='mb-4'>
                        <h4 className='font-semibold'>{condition}</h4>
                        <p>Risk: {(data.risk * 100).toFixed(1)}%</p>
                        <p>Risk Modifiers: {data.riskModifiers.join(', ')}</p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value='management'>
                  <AccordionTrigger>Medical Management</AccordionTrigger>
                  <AccordionContent>
                    <ul className='list-disc pl-5'>
                      {geneticMarkers
                        .find(m => m.id === expandedMarker)
                        ?.medicalManagement.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export { GeneticMarkersExplored }

const GeneticMarkersView: React.FC<{
  geneticMarkers: GeneticAnalysisResponse['geneticMarkers']
}> = ({ geneticMarkers }) => {
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary')

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Genetic Markers Analysis</CardTitle>
        <div className='space-x-2'>
          <Button
            variant={viewMode === 'summary' ? 'default' : 'outline'}
            onClick={() => setViewMode('summary')}
          >
            Summary
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            onClick={() => setViewMode('detailed')}
          >
            Detailed View
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'summary' ? (
          <GeneticMarkersSummary geneticMarkers={geneticMarkers} />
        ) : (
          <GeneticMarkersExplored geneticMarkers={geneticMarkers} />
        )}
      </CardContent>
    </Card>
  )
}

export default GeneticMarkersView
