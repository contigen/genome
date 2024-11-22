'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Input } from '&/components/ui/input'
import { Button } from '&/components/ui/button'
import { Switch } from '&/components/ui/switch'
import { Label } from '&/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { motion } from 'framer-motion'
import { User, Bell, Lock, Download, Trash2 } from 'lucide-react'

const AnimatedCard = motion(Card)

export default function Settings() {
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [emailUpdates, setEmailUpdates] = useState(true)
  const [dataConsent, setDataConsent] = useState(false)

  return (
    <div className='space-y-6'>
      <AnimatedCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='profile'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='profile'>Profile</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              <TabsTrigger value='privacy'>Privacy & Data</TabsTrigger>
            </TabsList>
            <TabsContent value='profile'>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                      id='name'
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='notifications'>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='email-updates'>Email Updates</Label>
                    <Switch
                      id='email-updates'
                      checked={emailUpdates}
                      onCheckedChange={setEmailUpdates}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='privacy'>
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <Label htmlFor='data-consent'>Data Usage Consent</Label>
                    <Switch
                      id='data-consent'
                      checked={dataConsent}
                      onCheckedChange={setDataConsent}
                    />
                  </div>
                  <p className='text-sm text-gray-600'>
                    By enabling this, you agree to allow your anonymized genetic
                    data to be used for research purposes.
                  </p>
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
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Button className='w-full flex items-center justify-center'>
            <Download className='mr-2 h-4 w-4' />
            Download My Data
          </Button>
          <Button
            variant='destructive'
            className='w-full flex items-center justify-center'
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Delete My Account
          </Button>
        </CardContent>
      </AnimatedCard>
    </div>
  )
}
