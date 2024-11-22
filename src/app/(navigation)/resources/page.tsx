'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Input } from '&/components/ui/input'
import { Button } from '&/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '&/components/ui/accordion'
import { motion } from 'framer-motion'
import { Search, BookOpen, Video, FileText } from 'lucide-react'

const AnimatedCard = motion(Card)

const faqs = [
  {
    question: 'What does a BRCA1 mutation mean?',
    answer:
      "A BRCA1 mutation indicates an increased risk for certain types of cancer, particularly breast and ovarian cancer. It doesn't mean you will definitely develop cancer, but it suggests more frequent screenings and preventive measures may be beneficial.",
  },
  {
    question: 'How accurate are genetic tests?',
    answer:
      "Genetic tests are generally very accurate for identifying specific genetic variations. However, the interpretation of what these variations mean for an individual's health can be complex and may change as we learn more about genetics.",
  },
  {
    question: 'Can lifestyle changes alter my genetic risks?',
    answer:
      "While you can't change your genes, lifestyle choices can significantly influence how your genes express themselves. Healthy diet, regular exercise, and avoiding harmful habits like smoking can help mitigate certain genetic risks.",
  },
]

const tutorials = [
  {
    title: 'Understanding Your Genetic Report',
    description:
      'Learn how to read and interpret your genetic analysis results.',
  },
  {
    title: 'Navigating the Genome Explorer',
    description:
      'A step-by-step guide to using our interactive genome visualization tools.',
  },
  {
    title: 'Implementing Your Personalized Health Plan',
    description:
      'How to take action based on your genetic insights and recommendations.',
  },
]

const articles = [
  {
    title: 'The Future of Personalized Medicine',
    author: 'Dr. Jane Smith',
    date: '2023-05-15',
  },
  {
    title: 'Epigenetics: How Your Lifestyle Affects Your Genes',
    author: 'Prof. John Doe',
    date: '2023-06-02',
  },
  {
    title: 'Understanding Polygenic Risk Scores',
    author: 'Dr. Emily Johnson',
    date: '2023-06-20',
  },
]

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className='space-y-6'>
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Educational Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='relative mb-4'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
            <Input
              type='text'
              placeholder='Search resources...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='pl-8'
            />
          </div>

          <Tabs defaultValue='faq'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='faq'>FAQs</TabsTrigger>
              <TabsTrigger value='tutorials'>Tutorials</TabsTrigger>
              <TabsTrigger value='articles'>Articles</TabsTrigger>
            </TabsList>
            <TabsContent value='faq'>
              <Card>
                <CardContent className='pt-6'>
                  <Accordion type='single' collapsible>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='tutorials'>
              <Card>
                <CardContent className='pt-6'>
                  <ul className='space-y-4'>
                    {tutorials.map((tutorial, index) => (
                      <li key={index} className='flex items-start space-x-3'>
                        <Video className='h-5 w-5 text-blue-500 mt-0.5' />
                        <div>
                          <h3 className='font-semibold'>{tutorial.title}</h3>
                          <p className='text-sm text-gray-600'>
                            {tutorial.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='articles'>
              <Card>
                <CardContent className='pt-6'>
                  <ul className='space-y-4'>
                    {articles.map((article, index) => (
                      <li key={index} className='flex items-start space-x-3'>
                        <FileText className='h-5 w-5 text-green-500 mt-0.5' />
                        <div>
                          <h3 className='font-semibold'>{article.title}</h3>
                          <p className='text-sm text-gray-600'>
                            By {article.author} | {article.date}
                          </p>
                        </div>
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
          <CardTitle>Genetics 101</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4'>
            New to genetics? Start with these fundamental concepts:
          </p>
          <ul className='list-disc list-inside space-y-2'>
            <li>What is DNA?</li>
            <li>Understanding Genes and Chromosomes</li>
            <li>Basics of Inheritance</li>
            <li>Introduction to Genetic Variations</li>
          </ul>
          <Button className='mt-4'>
            <BookOpen className='mr-2 h-4 w-4' />
            Start Learning
          </Button>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
