'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Input } from '&/components/ui/input'
import { Button } from '&/components/ui/button'
import { Switch } from '&/components/ui/switch'
import { Label } from '&/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '&/components/ui/tabs'
import { motion } from 'framer-motion'
import { Download, Trash2 } from 'lucide-react'
import { useGeneticData } from '&/app/genetic-data-context'
import { toast } from '&/hooks/use-toast'

const AnimatedCard = motion(Card)

export default function Settings() {
  const { geneticData } = useGeneticData()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [dataConsent, setDataConsent] = useState(false)

  useEffect(() => {
    if (!geneticData) {
      router.push('/upload')
    }
  }, [geneticData, router])

  const handleUpdateProfile = () => {
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been successfully updated.',
    })
  }

  const handleUpdateNotifications = () => {
    toast({
      title: 'Notification Preferences Updated',
      description: 'Your notification settings have been saved.',
    })
  }

  const handleUpdatePrivacy = () => {
    toast({
      title: 'Privacy Settings Updated',
      description: 'Your privacy preferences have been updated.',
    })
  }

  const handleDownloadData = () => {
    const dataStr = JSON.stringify(geneticData, null, 2)
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = 'my_genetic_data.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    toast({
      title: 'Data Downloaded',
      description: 'Your genetic data has been downloaded successfully.',
    })
  }

  if (!geneticData) {
    return <div>Loading...</div>
  }

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
                  <Button onClick={handleUpdateProfile}>Update Profile</Button>
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
                  <Button onClick={handleUpdateNotifications} className='mt-4'>
                    Save Preferences
                  </Button>
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
                  <Button onClick={handleUpdatePrivacy}>
                    Update Privacy Settings
                  </Button>
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
          <Button
            className='w-full flex items-center justify-center'
            onClick={handleDownloadData}
          >
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
