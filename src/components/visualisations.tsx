'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Button } from '&/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '&/components/ui/select'
import { Slider } from '&/components/ui/slider'
import cytoscape from 'cytoscape'

export function VisualisationsComponent() {
  const [visualizationType, setVisualizationType] = useState('network')
  const [threshold, setThreshold] = useState(0.5)
  const cyRef = useRef(null)

  useEffect(() => {
    if (cyRef.current) {
      const cy = cytoscape({
        container: cyRef.current,
        elements: [
          { data: { id: 'a' } },
          { data: { id: 'b' } },
          { data: { id: 'c' } },
          { data: { id: 'ab', source: 'a', target: 'b' } },
          { data: { id: 'bc', source: 'b', target: 'c' } },
        ],
        style: [
          {
            selector: 'node',
            style: {
              'background-color': '#6366f1',
              label: 'data(id)',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 3,
              'line-color': '#94a3b8',
              'target-arrow-color': '#94a3b8',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
          name: 'circle',
        },
      })
    }
  }, [])

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Visualization Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <Select onValueChange={setVisualizationType}>
              <SelectTrigger>
                <SelectValue placeholder='Select visualization type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='network'>Gene Network</SelectItem>
                <SelectItem value='heatmap'>Expression Heatmap</SelectItem>
                <SelectItem value='manhattan'>Manhattan Plot</SelectItem>
              </SelectContent>
            </Select>
            <div className='space-y-2'>
              <label htmlFor='threshold' className='text-sm font-medium'>
                Significance Threshold: {threshold}
              </label>
              <Slider
                id='threshold'
                min={0}
                max={1}
                step={0.01}
                value={[threshold]}
                onValueChange={value => setThreshold(value[0])}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {visualizationType === 'network' ? 'Gene Network' : 'Visualization'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            ref={cyRef}
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#f1f5f9',
            }}
          />
        </CardContent>
      </Card>

      <div className='flex justify-end'>
        <Button>Save as PDF</Button>
      </div>
    </div>
  )
}
