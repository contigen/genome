'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Input } from '&/components/ui/input'
import { Button } from '&/components/ui/button'
import { Label } from '&/components/ui/label'
import { Checkbox } from '&/components/ui/checkbox'
import { ArrowRight, LockIcon, MailIcon } from 'lucide-react'

const InputField = ({ icon: Icon, ...props }) => (
  <div className='relative'>
    <Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
    <Input
      className='pl-10 bg-white/10 border-white/20 text-white placeholder-gray-300 focus:bg-white/20 transition-all duration-300'
      {...props}
    />
  </div>
)

export default function SignInFormModern() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign in with:', email, password)
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <Card className='bg-black/30 backdrop-blur-md border-white/10 shadow-2xl'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-3xl font-bold text-white'>
              Welcome Back
            </CardTitle>
            <CardDescription className='text-gray-300'>
              Sign in to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-white'>
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
                <Label htmlFor='password' className='text-white'>
                  Password
                </Label>
                <InputField
                  id='password'
                  icon={LockIcon}
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='remember' />
                <Label htmlFor='remember' className='text-sm text-gray-300'>
                  Remember me
                </Label>
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
          <CardFooter>
            <p className='text-center text-sm text-gray-300 mt-2 w-full'>
              Don&apos;t have an account?{' '}
              <a href='#' className='text-blue-400 hover:underline'>
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
