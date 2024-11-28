'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Input } from '&/components/ui/input'
import { Button } from '&/components/ui/button'
import { Label } from '&/components/ui/label'
import { ArrowRight, LockIcon, MailIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'

const InputField = ({ icon: Icon, ...props }) => (
  <div className='relative'>
    <Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500' />
    <Input
      className='pl-10 bg-white/80 border-blue-200 text-gray-800 placeholder-gray-400 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300'
      {...props}
    />
  </div>
)

export function SignInForm() {
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    signIn(`credentials`, {
      email,
      password,
      redirectTo: `/dashboard`,
    })
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-white via-blue-100 to-blue-200'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <Card className='bg-white/70 backdrop-blur-sm shadow-xl border border-blue-100 rounded-2xl'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-3xl font-bold'>Welcome Back</CardTitle>
            <CardDescription className='text-blue-600'>
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-blue-700'>
                  Email
                </Label>
                <InputField
                  id='email'
                  icon={MailIcon}
                  placeholder='m@example.com'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password' className='text-blue-700'>
                  Password
                </Label>
                <InputField
                  id='password'
                  icon={LockIcon}
                  type='password'
                  value={password}
                  onChange={evt => setPassword(evt.target.value)}
                  required
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all duration-300'
                >
                  Sign in
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
