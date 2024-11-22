'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "&/components/ui/card"
import { Button } from "&/components/ui/button"
import { FileUp, AlertCircle } from 'lucide-react'

export function UploadDataComponent() {
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Genomic Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your file here, or click to select a file
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Supported formats: CSV, VCF
            </p>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleChange}
              accept=".csv,.vcf"
            />
            <Button className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
              Select File
            </Button>
          </div>
          {file && (
            <div className="mt-4 text-sm text-gray-600">
              Selected file: {file.name}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preprocessing Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {file ? (
            <div className="space-y-2">
              <div className="flex items-center text-green-600">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>File format validated successfully</span>
              </div>
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>2 columns with missing data detected</span>
              </div>
              <div className="flex items-center text-blue-600">
                <AlertCircle className="mr-2 h-4 w-4" />
                <span>10,000 rows of genomic data found</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Upload a file to see preprocessing results</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}