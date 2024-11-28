'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '&/components/ui/alert'
import { AlertCircle, Info, Upload } from 'lucide-react'
import { useGeneticData } from '&/app/genetic-data-context'
import { processGeneticData } from '&/app/action'
import { useRouter } from 'next/navigation'

const FILE_TYPES = [`bed`, `json`, `tsv`, `vcf`, `fasta`]

export default function UploadData() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { setGeneticData, incrementTotalAnalyses } = useGeneticData()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError(null)
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase()
      if (FILE_TYPES.includes(fileType!)) {
        const reader = new FileReader()
        reader.onload = e => setPreview(e.target?.result as string)
        reader.readAsText(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  const handleUpload = async (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const geneticData = await processGeneticData(formData)
      setGeneticData(geneticData)
      incrementTotalAnalyses()
      router.push('/dashboard')
    } catch {
      setError('An error occurred during processing. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Upload Your Genetic Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
              <Input
                type='file'
                accept='.vcf,.fasta,.tsv,.bed,.json'
                onChange={handleFileChange}
                className='hidden'
                id='file-upload'
                disabled={uploading}
              />
              <label htmlFor='file-upload' className='cursor-pointer'>
                <div className='flex flex-col items-center'>
                  <Upload className='h-12 w-12 text-gray-400' />
                  <span className='mt-2 text-sm font-medium text-gray-600'>
                    Drag and drop your file here, or click to select
                  </span>
                </div>
              </label>
            </div>
            {file && (
              <div className='text-sm text-gray-600'>
                Selected file: {file.name}
              </div>
            )}
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className='w-full'
            >
              {uploading ? (
                <>
                  <Upload className='mr-2 h-4 w-4 animate-spin' />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className='mr-2 h-4 w-4' />
                  Upload Data
                </>
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          {error && (
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>

      <Alert>
        <Info className='h-4 w-4' />
        <AlertTitle>Supported File Types</AlertTitle>
        <AlertDescription>
          We accept genetic data files in .fasta, .bed, .csv, .vcf, and .json
          formats.
        </AlertDescription>
      </Alert>

      {preview && (
        <Card>
          <CardHeader>
            <CardTitle>File Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className='text-xs overflow-auto max-h-40 bg-gray-100 p-2 rounded'>
              {preview.slice(0, 500)}...
            </pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Data Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-gray-600'>
            Your data is securely processed and never shared without consent. We
            use industry-standard encryption to protect your information.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
