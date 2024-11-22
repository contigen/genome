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
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign-in logic here
    console.log('Sign in with:', email, password)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='w-[350px] shadow-2xl'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center'>
              Sign in
            </CardTitle>
            <CardDescription className='text-center'>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <div className='relative'>
                    <MailIcon className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                    <Input
                      id='email'
                      placeholder='m@example.com'
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className='pl-10'
                      required
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <div className='relative'>
                    <LockIcon className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className='pl-10'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                    >
                      {showPassword ? (
                        <EyeOffIcon className='h-5 w-5' />
                      ) : (
                        <EyeIcon className='h-5 w-5' />
                      )}
                    </button>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='remember' />
                  <Label htmlFor='remember'>Remember me</Label>
                </div>
                <Button type='submit' className='w-full'>
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className='text-center text-sm text-gray-600 mt-2 w-full'>
              Don&apos;t have an account?{' '}
              <a href='#' className='text-blue-500 hover:underline'>
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
