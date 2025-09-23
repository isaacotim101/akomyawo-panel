import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
//import axios from 'axios'
import React, { useState } from 'react';

import { HelpCircle } from 'react-feather'
// ** Custom Components
// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
// ** Reactstrap Imports
//import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, Alert } from 'reactstrap'
import {
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText, Card, 
  CardTitle, CardBody,
  FormFeedback,
  UncontrolledTooltip
} from 'reactstrap'
// ** Styles
import '@styles/react/pages/page-authentication.scss'
const defaultValues = {
  password: 'Admin',
  loginEmail: 'test@africanhearts.co'
}
const LoginBasic = () => {

    const { skin } = useSkin()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ability = useContext(AbilityContext)
    const {
      control,
      setError,
      handleSubmit,
      formState: { errors }
    } = useForm({ defaultValues })
  
  
    const onSubmit = data => {
      if (Object.values(data).every(field => field.length > 0)) {
        useJwt
          .login({ email: data.loginEmail, password: data.password })
          .then(res => {
            const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
            dispatch(handleLogin(data))
            ability.update(res.data.userData.ability)
            navigate(getHomeRouteForLoggedInUser(data.role))
            toast(t => (
              <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'Admin Account'} />
            ))
          })
          .catch(err => setError('loginEmail', {
              type: 'manual',
              message: err.response.data.error
            })
          )
      } else {
        for (const key in data) {
          if (data[key].length === 0) {
            setError(key, {
              type: 'manual'
            })
          }
        }
      }
    }
  
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              
              <h2 className='brand-text text-primary ms-1'>Admin Panel</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome Admin! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
             <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
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
