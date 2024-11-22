'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '&/components/ui/alert'
import { Info, Upload } from 'lucide-react'

export default function UploadData() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // For text files, read and set preview
      if (selectedFile.type === 'text/plain') {
        const reader = new FileReader()
        reader.onload = e => setPreview(e.target?.result as string)
        reader.readAsText(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  const handleUpload = () => {
    // Implement file upload logic here
    console.log('Uploading file:', file)
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
                accept='.txt,.csv,.vcf,.pdf'
                onChange={handleFileChange}
                className='hidden'
                id='file-upload'
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
            <Button onClick={handleUpload} disabled={!file} className='w-full'>
              Upload Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Info className='h-4 w-4' />
        <AlertTitle>Supported File Types</AlertTitle>
        <AlertDescription>
          We accept genetic data files in .txt, .csv, .vcf, and .pdf formats
          from services like 23andMe or AncestryDNA.
        </AlertDescription>
      </Alert>

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
    </div>
  )
}
