'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { GeneticAnalysisResponse } from '&/types/genetic-analysis'

interface GeneticDataContextType {
  geneticData: GeneticAnalysisResponse | null
  setGeneticData: React.Dispatch<
    React.SetStateAction<GeneticAnalysisResponse | null>
  >
  totalAnalyses: number
  incrementTotalAnalyses: () => void
}

const GeneticDataContext = createContext<GeneticDataContextType | undefined>(
  undefined
)

export const useGeneticData = () => {
  const context = useContext(GeneticDataContext)
  if (context === undefined) {
    throw new Error('useGeneticData must be used within a GeneticDataProvider')
  }
  return context
}

export const GeneticDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [geneticData, setGeneticData] =
    useState<GeneticAnalysisResponse | null>(null)
  const [totalAnalyses, setTotalAnalyses] = useState(0)

  useEffect(() => {
    // Load genetic data from localStorage on initial render
    const storedData = localStorage.getItem('geneticData')
    if (storedData) {
      setGeneticData(JSON.parse(storedData))
    }

    // Load total analyses from localStorage
    const storedTotalAnalyses = localStorage.getItem('totalAnalyses')
    if (storedTotalAnalyses) {
      setTotalAnalyses(parseInt(storedTotalAnalyses, 10))
    }
  }, [])

  useEffect(() => {
    // Save genetic data to localStorage whenever it changes
    if (geneticData) {
      localStorage.setItem('geneticData', JSON.stringify(geneticData))
    }
  }, [geneticData])

  const incrementTotalAnalyses = () => {
    const newTotal = totalAnalyses + 1
    setTotalAnalyses(newTotal)
    localStorage.setItem('totalAnalyses', newTotal.toString())
  }

  return (
    <GeneticDataContext.Provider
      value={{
        geneticData,
        setGeneticData,
        totalAnalyses,
        incrementTotalAnalyses,
      }}
    >
      {children}
    </GeneticDataContext.Provider>
  )
}
