'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '&/components/ui/card'
import { Input } from '&/components/ui/input'
import { Button } from '&/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '&/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { motion } from 'framer-motion'
import { Search} from 'lucide-react'
import { useGeneticData } from '&/app/genetic-data-context'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AnimatedCard = motion(Card)

const geneticTerms = [
  {
    term: 'SNP',
    definition:
      'Single Nucleotide Polymorphism: A variation in a single DNA building block.',
  },
  {
    term: 'Allele',
    definition:
      'One of two or more versions of a gene. An individual inherits two alleles for each gene, one from each parent.',
  },
  {
    term: 'Phenotype',
    definition:
      'The physical expression of a gene, such as eye color or blood type.',
  },
  {
    term: 'Genotype',
    definition: 'The genetic makeup of an organism, which determines traits.',
  },
]

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const { geneticData } = useGeneticData()
  const router = useRouter()

  useEffect(() => {
    if (!geneticData) {
      router.push('/upload')
    }
  }, [geneticData, router])

  if (!geneticData) {
    return <div>Loading...</div>
  }

  const filteredInsights = geneticData.detailedInsights.filter(insight => {
    const matchesSearch =
      insight.geneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.effect.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk =
      riskFilter === 'all' ||
      insight.confidenceLevel.toLowerCase() === riskFilter.toLowerCase()
    return matchesSearch && matchesRisk
  })

  return (
    <div className='space-y-6'>
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Explore Your Genetic Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex space-x-4 mb-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
              <Input
                type='text'
                placeholder='Search genes, traits, or conditions'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='pl-8'
              />
            </div>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by risk' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Risks</SelectItem>
                <SelectItem value='low'>Low Risk</SelectItem>
                <SelectItem value='medium'>Medium Risk</SelectItem>
                <SelectItem value='high'>High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue='search'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='search'>Search Results</TabsTrigger>
              <TabsTrigger value='glossary'>Genetic Glossary</TabsTrigger>
            </TabsList>
            <TabsContent value='search'>
              <Card>
                <CardContent className='p-6'>
                  {filteredInsights.length > 0 ? (
                    <ul className='space-y-4'>
                      {filteredInsights.map((insight, index) => (
                        <li
                          key={index}
                          className='border-b pb-4 last:border-b-0'
                        >
                          <h3 className='font-semibold'>
                            {insight.geneName} ({insight.variant})
                          </h3>
                          <p className='text-sm text-gray-600'>
                            {insight.effect}
                          </p>
                          <p className='text-sm mt-1'>
                            Confidence: {insight.confidenceLevel}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className='text-gray-600'>
                      No results found. Try adjusting your search or filter.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='glossary'>
              <Card>
                <CardContent className='p-6'>
                  <ul className='space-y-4'>
                    {geneticTerms.map((item, index) => (
                      <li key={index}>
                        <h3 className='font-semibold'>{item.term}</h3>
                        <p className='text-sm text-gray-600'>
                          {item.definition}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
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
          <CardTitle>Lifestyle Impact Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4'>
            Explore how lifestyle changes could impact your genetic risks:
          </p>
          <div className='space-y-2'>
            <Button className='w-full'>Simulate Low-Sodium Diet</Button>
            <Button className='w-full'>
              Simulate Regular Exercise Routine
            </Button>
            <Button className='w-full'>
              Simulate Stress Reduction Techniques
            </Button>
          </div>
        </CardContent>
      </AnimatedCard>

      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CardHeader>
          <CardTitle>Visualizations</CardTitle>
          <CardDescription>
            Visual representations of your genetic data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {geneticData.visualizations.map((viz, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className='text-lg'>{viz.title}</CardTitle>
                  <CardDescription>{viz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {viz.type === 'PieChart' && (
                    <ResponsiveContainer width='100%' height={300}>
                      <PieChart>
                        <Pie
                          data={viz.data.datasets[0].data.map((value, i) => ({
                            name: viz.data.labels[i],
                            value,
                          }))}
                          cx='50%'
                          cy='50%'
                          labelLine={false}
                          outerRadius={80}
                          fill='#8884d8'
                          dataKey='value'
                        >
                          {viz.data.datasets[0].data.map((entry, i) => (
                            <Cell
                              key={`cell-${i}`}
                              fill={COLORS[i % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {viz.type === 'BarChart' && (
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart
                        data={viz.data.labels.map((label, i) => ({
                          name: label,
                          value: viz.data.datasets[0].data[i],
                        }))}
                      >
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey='value' fill='#8884d8' />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
