import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
//import axios from 'axios'
import React, { useState } from 'react';

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
  Button,
  CardText, Card, 
  CardTitle, CardBody,
  FormFeedback
} from 'reactstrap'
// ** Styles
import '@styles/react/pages/page-authentication.scss'
const defaultValues = {
  password: 'admin',
  loginEmail: 'admin@demo.com'
}
const LoginBasic = () => {

    //const dispatch = useDispatch()
    //const navigate = useNavigate()
    //const ability = useContext(AbilityContext)
    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({ defaultValues })
  
  
    const onSubmit = data => {
      console.log('Data:', data); // Log the form data to check if it's correctly received.
      if (Object.values(data).every(field => field.length > 0)) {
        console.log('Submitting data...'); // Check if it reaches this point.

    
        axios.post('https://african-hearts-api.vercel.app/api/v1/auth/login', data)
          .then(res => {
            // Handle successful login
            const resdata = res.data; // Assuming the response contains user data
            console.log('Data:', resdata);
            //dispatch(handleLogin(data));
            //ability.update(data.ability);
           // navigate(getHomeRouteForLoggedInUser(data.role));
           // toast(t => (
           //   <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
           // ));
          })
          .catch(err => {
            console.log('Error:', err);
          });
      }
    };
    
  
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              
              <h2 className='brand-text text-primary ms-1'>African Hearts</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome to African Hearts! 👋
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
