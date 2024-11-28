export const GENETIC_MARKER_DATABASE = {
  BRCA1: {
    fullName: 'Breast Cancer Gene 1',
    chromosome: '17q21',
    function: 'Tumor suppressor gene involved in DNA repair',
    inheritancePattern: 'Autosomal Dominant',
    detailedRiskBreakdown: {
      breastCancer: {
        maleRisk: 0.1,
        femaleRisk: 0.72,
        lifetimeRisk: 0.65,
        riskModifiers: ['Family history', 'Age', 'Hormonal factors'],
      },
      ovarianCancer: {
        femaleRisk: 0.44,
        lifetimeRisk: 0.39,
        riskModifiers: ['Genetic mutations', 'Reproductive history'],
      },
    },
    medicalManagement: [
      'Regular mammography',
      'Annual gynecological screening',
      'Genetic counseling',
      'Potential preventive surgeries',
    ],
  },
  APOE: {
    fullName: 'Apolipoprotein E',
    chromosome: '19q13.2',
    function: 'Involved in cholesterol metabolism and neurological health',
    inheritancePattern: 'Autosomal Codominant',
    detailedRiskBreakdown: {
      alzheimersDementia: {
        geneticRisk: {
          'ε2/ε2': 0.1,
          'ε3/ε3': 0.15,
          'ε4/ε4': 0.45,
        },
        riskModifiers: ['Age', 'Cardiovascular health', 'Lifestyle factors'],
      },
      cardiovascularDisease: {
        riskIncrease: 0.35,
        riskModifiers: ['Cholesterol levels', 'Diet', 'Exercise'],
      },
    },
    medicalManagement: [
      'Regular cognitive assessments',
      'Cardiovascular health monitoring',
      'Lifestyle interventions',
    ],
  },
  SNP1: {
    fullName: 'Single Nucleotide Polymorphism 1',
    chromosome: '5q31.1',
    function:
      'Associated with immune system regulation and response to allergens',
    inheritancePattern: 'Complex',
    detailedRiskBreakdown: {
      asthma: {
        geneticRisk: 0.25,
        riskModifiers: ['Environmental exposure', 'Allergen sensitivity'],
      },
      autoimmuneDiseases: {
        geneticRisk: 0.18,
        riskModifiers: ['Family history', 'Chronic inflammation'],
      },
    },
    medicalManagement: [
      'Allergy testing and management',
      'Autoimmune disorder screening',
      'Personalized medication plans',
    ],
  },
  SNP2: {
    fullName: 'Single Nucleotide Polymorphism 2',
    chromosome: '6p21.3',
    function:
      'Regulates immune response and predisposition to inflammatory conditions',
    inheritancePattern: 'Complex',
    detailedRiskBreakdown: {
      rheumatoidArthritis: {
        geneticRisk: 0.2,
        riskModifiers: ['Smoking', 'Hormonal factors', 'Vitamin D deficiency'],
      },
      psoriasis: {
        geneticRisk: 0.15,
        riskModifiers: ['Stress', 'Skin trauma', 'Infections'],
      },
    },
    medicalManagement: [
      'Anti-inflammatory medications',
      'Regular rheumatological evaluations',
      'Stress reduction techniques',
    ],
  },
  SNP3: {
    fullName: 'Single Nucleotide Polymorphism 3',
    chromosome: '1q42.1',
    function: 'Involved in neural development and synaptic plasticity',
    inheritancePattern: 'Autosomal Dominant',
    detailedRiskBreakdown: {
      schizophrenia: {
        geneticRisk: 0.12,
        riskModifiers: ['Substance abuse', 'Prenatal stress', 'Trauma'],
      },
      bipolarDisorder: {
        geneticRisk: 0.18,
        riskModifiers: ['Lifestyle stress', 'Family history'],
      },
    },
    medicalManagement: [
      'Mental health evaluations',
      'Psychiatric therapy',
      'Pharmacological interventions',
    ],
  },
  Gene1: {
    fullName: 'Example Gene 1',
    chromosome: 'Xq28',
    function: 'Involved in neurological development and synaptic signaling',
    inheritancePattern: 'X-Linked',
    detailedRiskBreakdown: {
      neurodevelopmentalDisorders: {
        geneticRisk: 0.4,
        riskModifiers: [
          'Prenatal environment',
          'Gene-environment interactions',
        ],
      },
      epilepsy: {
        geneticRisk: 0.15,
        riskModifiers: ['Trauma history', 'Brain injury'],
      },
    },
    medicalManagement: [
      'Neurological evaluations',
      'Electroencephalogram (EEG) monitoring',
      'Therapies for developmental support',
    ],
  },
  Gene2: {
    fullName: 'Example Gene 2',
    chromosome: '2q24.1',
    function: 'Involved in glucose metabolism and insulin regulation',
    inheritancePattern: 'Autosomal Recessive',
    detailedRiskBreakdown: {
      type2Diabetes: {
        geneticRisk: 0.28,
        riskModifiers: ['Diet', 'Physical activity', 'Obesity'],
      },
      metabolicSyndrome: {
        geneticRisk: 0.22,
        riskModifiers: ['Age', 'Sedentary behavior', 'High sugar consumption'],
      },
    },
    medicalManagement: [
      'Regular glucose monitoring',
      'Weight management programs',
      'Dietary interventions',
    ],
  },
  Variant1: {
    fullName: 'Mutation Variant 1',
    chromosome: '7p21.1',
    function: 'Impacts protein stability in metabolic pathways',
    inheritancePattern: 'Recessive',
    detailedRiskBreakdown: {
      metabolicSyndrome: {
        geneticRisk: 0.22,
        riskModifiers: ['Obesity', 'Insulin resistance', 'Sedentary lifestyle'],
      },
      rareDisorders: {
        geneticRisk: 0.08,
        riskModifiers: ['Diet', 'Environmental toxins'],
      },
    },
    medicalManagement: [
      'Dietary interventions',
      'Regular metabolic health checks',
      'Screening for rare disorders in offspring',
    ],
  },
}

export function getDetailedMarkerInfo(markerId: string) {
  return (
    GENETIC_MARKER_DATABASE[markerId as keyof typeof GENETIC_MARKER_DATABASE] ||
    null
  )
}
