import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle, CardText, Form, Label, Input } from 'reactstrap'
import toast from 'react-hot-toast'
import '@styles/react/pages/page-authentication.scss'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser } from '@utils'

const LoginBasic = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
  e.preventDefault()

  if (!email || !password) {
    toast.error('Please fill all fields')
    return
  }

  const formdata = { email, password }

  try {
    const response = await fetch('https://ako-api.vercel.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    })
    const data = await response.json()

    if (data.user) {
      const appUserData = {
        id: data.user.id,
        fullName: data.user.full_name,
        username: data.user.full_name,
        email: data.user.email,
        role: 'Admin', // default
      }
      localStorage.setItem('userData', JSON.stringify(appUserData))
      toast.success(data.message || 'Login successful')

      // Redirect after a short delay to ensure state updates
      setTimeout(() => {
        navigate(getHomeRouteForLoggedInUser(appUserData.role))
      }, 100)
    } else {
      toast.error('Invalid login credentials')
    }
  } catch (error) {
    console.error('Login error:', error)
    toast.error('Something went wrong')
  }
}


  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={(e) => e.preventDefault()}>
              <h2 className='brand-text text-primary ms-1'>Akomwayo Ministries</h2>
            </Link>

            <CardTitle tag='h4' className='mb-1'>
              Welcome to Akomwayo Ministries! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>

            <Form className='auth-login-form mt-2' onSubmit={handleLogin}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  id='login-email'
                  placeholder='john@example.com'
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='login-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  className='input-group-merge'
                  id='login-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginBasic
