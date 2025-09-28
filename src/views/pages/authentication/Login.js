import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import axios from 'axios'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
//import axios from 'axios'
import React, { useState, useEffect } from 'react';

// ** Custom Components
// ** Actions
import { handleLogin } from '@store/authentication'
import Avatar from '@components/avatar'
// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
// ** Reactstrap Imports
import { Coffee, X } from 'react-feather'
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

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ability = useContext(AbilityContext)
    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({ defaultValues })

    const ToastContent = ({ t, name, role }) => {
      return (
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='primary' icon={<Coffee size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-between'>
              <h6>{name}</h6>
              <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
            </div>
            <span>You have successfully logged!</span>
          </div>
        </div>
      )
    }
    
   //const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [items, setItems] = useState([]);


      const formdata = {
        email: email,
        password: password
    }
  const onSubmit = (data, e) => { // Add 'e' here to access the event
    e.preventDefault(); // Prevent the default form submission
    //console.log('Data:', data);
    if (Object.values(data).every(field => field.length > 0)) {
      //console.log('Submitting data...');
  
      fetch('https://ako-api.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      })
      .then(response => response.json()) // Parse the response as JSON
        .then(data => {
          //console.log("Response Data:", data.user.role); // Log the response data
          localStorage.setItem('userDetails', JSON.stringify(data));
          const rdata = { ...data.user, accessToken: data.token, refreshToken: data.token }
            dispatch(handleLogin(rdata))
            //console.log("deburging", rdata)
            ability.update("Admin")
            navigate(getHomeRouteForLoggedInUser(data.user.role))
    //window.location = "/dashboard/home";
            
          //navigate(getHomeRouteForLoggedInUser(data.user.role))
          const newData= {
            "id": 1,
            "fullName": data.user.displayName,
            "username": data.user.username,
            "avatar": data.user.avatar,
            "email": data.user.email,
            "role": data.user.role,
            "ability": [
              {
                "action": "manage",
                "subject": "all"
              }
            ],
            "extras": {
              "eCommerceCartItemsCount": 0
            },
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3MTM1NDAyLCJleHAiOjE2OTcxMzYwMDJ9.WTo44jaTWsf7_-4CuZgEu3HVFNsisiOeUEXheL1aVnY",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3MTM1NDAyLCJleHAiOjE2OTcxMzYwMDJ9.U1W8sZltLGmDN9xXtNoYY_P4NhcF7GWLpZN8jV0vOAE"
          }
          
          localStorage.setItem('userData', JSON.stringify(newData));
          
         
          window.location = "/dashboard/home";
         toast(t => (
           <ToastContent t={t} role={data.user.role} name={data.user.displayName} />
         ))
        })
       
        .catch(error => {
          console.error('Error:', error);
            toast.error('Error!!, Incorrect Email or Password entered, Please try again');
        });
      }
    };
  
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              
              <h2 className='brand-text text-primary ms-1'>Akomwayo Ministries </h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome to Akomwayo Ministries ! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>

              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='john@example.com' autoFocus 
                onChange={event => setEmail(event.target.value)}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  </div>
                <InputPasswordToggle className='input-group-merge' id='login-password' 
                onChange={event => setPassword(event.target.value)}
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