// ** React Imports
import { useSkin } from '@hooks/useSkin'
import { Link } from 'react-router-dom'

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login.jpg'
import illustrationsDark from '@src/assets/images/pages/login.jpg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const LoginCover = () => {
  const { skin } = useSkin()

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-flex align-items-center'>
           <img className='img-fluid' src={source} alt='Login Cover' />
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to African Hearts!
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account</CardText>
            <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='user@example.com' autoFocus />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle className='input-group-merge' id='login-password' />
              </div>
              <Button color='primary' block>
                Sign in
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginCover
