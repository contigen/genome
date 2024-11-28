'use server'

import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { geneticAnalysisSchema } from '&/types/genetic-analysis'

export async function processGeneticData(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  const fileContent = await file.text()
  const fileType = file.name.split('.').pop()?.toLowerCase()

  const systemPrompt = `You are a genetic analysis AI that processes ${fileType} files and generates comprehensive reports based on genomic data. Analyze the provided genetic data thoroughly and provide detailed insights, risk factors, recommendations, and visualizations based on the data. Ensure all fields in the response schema are populated with relevant information.
  `

  const userPrompt = `Analyse the following genetic data in ${fileType} format and generate a detailed report. If you cannot extract specific information, use your knowledge to make educated guesses based on common genetic markers and their associations:

${fileContent}...

Provide a comprehensive analysis including:
1. A summary with total markers analyzed, identified risk factors, an overall health score, and strong genetic traits.
2. Detailed risk factors associated with the genetic data.
3. Personalized and health recommendations based on the genetic profile.
4. In-depth insights about specific genetic markers and their potential effects.
5. Suggestions for data visualizations that would be helpful in understanding the genetic profile.

Ensure all sections of the response are filled with relevant, detailed information.`

  try {
    const { object: geneticData } = await generateObject({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      prompt: userPrompt,
      schema: geneticAnalysisSchema,
    })
    console.log(geneticData)
    const validatedData = geneticAnalysisSchema.parse(geneticData)

    return validatedData
  } catch (error) {
    console.error('Error processing genetic data:', error)
    throw new Error(
      'Failed to process genetic data. Please try again or contact support.'
    )
  }
}
