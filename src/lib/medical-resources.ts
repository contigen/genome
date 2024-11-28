export const medicalResources = {
  BRCA1: {
    researchLinks: [
      {
        title: `NIH BRCA1 Research`,
        url: `https://www.ncbi.nlm.nih.gov/gene/672`,
      },
      {
        title: `Breast Cancer Research Foundation`,
        url: `https://www.bcrf.org/brca-gene`,
      },
    ],
    detailedExplanation: `
        BRCA1 is a critical gene involved in DNA repair and tumor suppression. 
        Mutations can significantly increase the risk of breast and ovarian cancers.
      `,
  },
  APOE: {
    researchLinks: [
      {
        title: `Alzheimer's Association APOE Research`,
        url: `https://www.alz.org/alzheimers-dementia/genes-environment`,
      },
      {
        title: `NIH APOE Studies`,
        url: `https://www.ncbi.nlm.nih.gov/gene/348`,
      },
    ],
    detailedExplanation: `
        APOE gene plays a crucial role in cholesterol metabolism and neurological health. 
        Certain variants are associated with increased Alzheimer's disease risk.
      `,
  },
  SNP1: {
    researchLinks: [
      {
        title: `dbSNP Database Entry`,
        url: `https://www.ncbi.nlm.nih.gov/snp/`,
      },
    ],
    detailedExplanation: `
        SNP1 represents a single nucleotide polymorphism commonly studied in population genetics 
        and associated with various diseases depending on the genomic context.
      `,
  },
  SNP2: {
    researchLinks: [
      {
        title: `NCBI SNP Research`,
        url: `https://www.ncbi.nlm.nih.gov/snp/rs429358`,
      },
    ],
    detailedExplanation: `
        SNP2 is associated with key traits in genetic predisposition to certain conditions, 
        such as metabolic disorders and cardiovascular risks.
      `,
  },
  Gene1: {
    researchLinks: [
      {
        title: `GeneCards Gene1 Summary`,
        url: `https://www.genecards.org/`,
      },
    ],
    detailedExplanation: `
        Gene1 is a placeholder for a specific gene in research. It is linked to processes like 
        cellular signaling, protein synthesis, and immune response.
      `,
  },
  SNP3: {
    researchLinks: [
      {
        title: `dbSNP Resource for SNP3`,
        url: `https://www.ncbi.nlm.nih.gov/snp/rs7412`,
      },
    ],
    detailedExplanation: `
        SNP3 has been implicated in neurological studies, particularly for its role 
        in synaptic plasticity and neuron function.
      `,
  },
  Gene2: {
    researchLinks: [
      {
        title: `Gene2 Function and Expression`,
        url: `https://www.ncbi.nlm.nih.gov/gene/`,
      },
    ],
    detailedExplanation: `
        Gene2 contributes to cellular metabolism and energy homeostasis. Variants 
        in this gene are linked to metabolic syndromes and energy disorders.
      `,
  },
  Variant1: {
    researchLinks: [
      {
        title: `ClinVar Variant1 Database`,
        url: `https://www.ncbi.nlm.nih.gov/clinvar/`,
      },
      {
        title: `Genetic Home Reference`,
        url: `https://ghr.nlm.nih.gov/`,
      },
    ],
    detailedExplanation: `
        Variant1 refers to a specific mutation studied for its implications in genetic disorders, 
        particularly in inherited conditions like familial cancers and hereditary diseases.
      `,
  },
}

export function getMarkerResources(markerId: string) {
  return medicalResources[markerId as keyof typeof medicalResources] || {}
}
