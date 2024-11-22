'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
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
import { motion } from 'framer-motion'
import { Search, Filter, Book } from 'lucide-react'

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
                <SelectItem value='moderate'>Moderate Risk</SelectItem>
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
                  <p className='text-gray-600'>
                    Enter a search term or select a risk filter to explore your
                    genetic data.
                  </p>
                  {/* Add search results here */}
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
    </div>
  )
}
