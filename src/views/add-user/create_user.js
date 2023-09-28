import React, { useState} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
const FormsElements = () => {

  const [displayName, SetDisplayName] = useState('');
  const [username, SetUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');

const handleSubmit = event => {
event.preventDefault(); // 👈️ prevent page refresh

//var axios = require('axios');

const userData = {
role: role,
displayName: displayName,
email: email,
password: password,
username: username,
avatar: avatar,
status: "true"
}

var config = {
method: 'post',
baseURL: 'https://african-hearts-api.vercel.app/api/v1/users',
headers: { 
    Accept: '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  'Content-Type': 'application/json'},
data: userData,
};

axios(config)
.then(function (response) {
window.location.href = "/";
 
})
.catch(function (error) {
});//
// 👇️ clear all input values in the form
SetDisplayName('');
SetUsername('');
setEmail('');
setRole('');
setPassword('');
setAvatar('');


};
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add New User</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Names</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter Full Names here...."
                      name="displayName"
                      onChange={event => SetDisplayName(event.target.value)}
                      value={displayName} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                      type="email" 
                      placeholder="user@gmail.com"
                      name="email"
                      onChange={event => setEmail(event.target.value)}
                      value={email} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Profile Picture Url</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="https:example.com/image.jpg" 
                      name="avatar"
                      onChange={event => setAvatar(event.target.value)}
                      value={avatar}
                      />
                    </Form.Group>
                    <Button variant="primary" type = "submit">Submit</Button>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Usernames here..."
                    name="username"
                    onChange={event => SetUsername(event.target.value)}
                    value={username}
                     />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>User Role</Form.Label>
                    <Form.Control as="select"  name='role' onChange={event => setRole(event.target.value)}>
                    <option >Select Role</option>
                    <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Client">Client</option>
                    </Form.Control>
                  </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                      type="password" 
                      placeholder="Password" 
                      name = "password" 
                      onChange={event => setPassword(event.target.value)}
                      value={password}/>
                    </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
 




   

