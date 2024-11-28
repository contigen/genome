import { z } from 'zod'

export const geneticAnalysisSchema = z.object({
  summary: z.object({
    totalMarkersAnalyzed: z.number(),
    identifiedRiskFactors: z.number(),
    overallHealthScore: z.number().min(1).max(100),
    strongTraits: z.array(z.string()),
  }),
  riskFactors: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      riskLevel: z.enum(['Low', 'Moderate', 'High']),
      description: z.string(),
      relatedGenes: z.array(z.string()),
      potentialImpact: z.string(),
    })
  ),
  // should be modified - something like this already exist in the schema
  personalRiskPofile: z.object({
    overallRiskScore: z.number(),
    riskCategories: z.object({
      Cardiovascular: z.number(),
      Cancer: z.number(),
      Metabolic: z.number(),
    }),
  }),
  // geneticMarkers: z.array(
  //   z.object({
  //     id: z.string(),
  //     name: z.string(),
  //     variant: z.string(),
  //     riskLevel: z.enum(['Low', 'Moderate', 'High']),
  //     riskProbability: z.number(),
  //     associatedConditions: z.array(z.string()),
  //   })
  // ),
  geneticMarkers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      fullName: z.string(),
      variant: z.string(),
      chromosome: z.string(),
      function: z.string(),
      inheritancePattern: z.string(),
      riskLevel: z.enum(['Low', 'Moderate', 'High']),
      riskProbability: z.number(),
      associatedConditions: z.array(z.string()),
      detailedRiskBreakdown: z.array(
        z.object({
          risk: z.number(),
          riskModifiers: z.array(z.string()),
        })
      ),
      medicalManagement: z.array(z.string()),
    })
  ),
  recommendations: z.array(
    z.object({
      id: z.string(),
      category: z.enum(['Dietary', 'Lifestyle', 'Medical', 'Fitness']),
      title: z.string(),
      description: z.string(),
      priority: z.enum(['Low', 'Medium', 'High']),
      relatedRiskFactors: z.array(z.string()),
    })
  ),
  detailedInsights: z.array(
    z.object({
      geneId: z.string(),
      geneName: z.string(),
      variant: z.string(),
      effect: z.string(),
      confidenceLevel: z.enum(['Low', 'Medium', 'High']),
      scientificSummary: z.string(),
      laySummary: z.string(),
    })
  ),
  visualizations: z.array(
    z.object({
      type: z.enum(['PieChart', 'BarChart', 'LineGraph', 'HeatMap']),
      title: z.string(),
      description: z.string(),
      data: z.object({
        labels: z.array(z.string()),
        datasets: z.array(
          z.object({
            label: z.string(),
            data: z.array(z.number()),
            backgroundColor: z.array(z.string()).optional(),
          })
        ),
      }),
    })
  ),
})

export type GeneticAnalysisResponse = z.infer<typeof geneticAnalysisSchema>
