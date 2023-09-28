import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
//import { Formik } from 'formik';

const FirebaseLogin = ({ className, ...rest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


    const handleSubmit = event => {
      event.preventDefault(); // 👈️ prevent page refresh
      //var axios = require('axios');
  
    const formdata = {
      email: email,
      password: password
  }
  var config = {
    method: 'post',
    url: 'https://african-hearts-api.vercel.app/api/v1/auth/login',
    headers: { 
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json"
    },
    data : formdata,
  };
  
  axios(config)
  .then(function (response) {
    localStorage.setItem("isAuth", JSON.stringify(response.data));
      window.location.href = "/";
    console.log("login success", response)     
  })
  .catch(function (error) {
   console.log("login error", error)
  });//
  
      setEmail('');
      setPassword('');
      
    };  
  
  return (
    <React.Fragment><form noValidate className={className} {...rest}  onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Email Address / Username"
                placeholder='Email'
                name="email"
                type="email" 
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                placeholder='Password'
                name="password"
                type="password" 
                onChange={event => setPassword(event.target.value)}
                value={password}
              />
            </div>

            <Row>
              <Col mt={2}>
                <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
                  Signin
                </Button>
              </Col>
            </Row>
          </form>

     
    </React.Fragment>
  );
};

export default FirebaseLogin;
