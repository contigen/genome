import { getDetailedMarkerInfo } from '&/lib/genetic-marker-database'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '&/components/ui/dialog'
import { Button } from '&/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { GeneticAnalysisResponse } from '&/types/genetic-analysis'
import { getMarkerResources } from '&/lib/medical-resources'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '&/components/ui/tooltip'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Activity } from 'lucide-react'

const GeneticMarkerDetailModal = ({ markerId }: { markerId: string }) => {
  const markerInfo = getDetailedMarkerInfo(markerId)

  if (!markerInfo) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>View Detailed Marker Info</Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{markerInfo.fullName} Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue='overview'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='risks'>Risk Breakdown</TabsTrigger>
            <TabsTrigger value='management'>Medical Management</TabsTrigger>
          </TabsList>
          <TabsContent value='overview'>
            <div>
              <p>
                <strong>Chromosome:</strong> {markerInfo.chromosome}
              </p>
              <p>
                <strong>Function:</strong> {markerInfo.function}
              </p>
              <p>
                <strong>Inheritance:</strong> {markerInfo.inheritancePattern}
              </p>
            </div>
          </TabsContent>
          <TabsContent value='risks'>
            {/* Detailed risk breakdown visualization */}
            <pre>
              {JSON.stringify(markerInfo.detailedRiskBreakdown, null, 2)}
            </pre>
          </TabsContent>
          <TabsContent value='management'>
            <ul>
              {markerInfo.medicalManagement.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export function GeneticInsightsView({
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
    <Card>
      <CardHeader>
        <CardTitle>Genetic Markers</CardTitle>
      </CardHeader>
      <CardContent>
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
                    href={
                      getMarkerResources(marker.id)?.researchLinks?.[0]?.url
                    }
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
      </CardContent>
    </Card>
  )
}

const EnhancedGeneticInsightsView = ({
  geneticMarkers,
}: {
  riskCategories: GeneticAnalysisResponse['personalRiskPofile']['riskCategories']
  geneticMarkers: GeneticAnalysisResponse['geneticMarkers']
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {/* Detailed Marker Exploration */}
      <div className='col-span-full'>
        <h2 className='text-2xl font-bold mb-4'>Genetic Markers Explored</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {geneticMarkers.map(marker => (
            <div key={marker.id} className='border rounded-lg p-4 shadow-sm'>
              <h3 className='font-semibold text-lg'>{marker.name}</h3>
              <p>Risk Level: {marker.riskLevel}</p>
              <p>Probability: {marker.riskProbability * 100}%</p>
              <GeneticMarkerDetailModal markerId={marker.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { EnhancedGeneticInsightsView }
