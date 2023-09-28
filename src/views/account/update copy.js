import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
const FormsElements = () => {
  const [userData, SetUserData] = useState('');

  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  useEffect(() => {
    axios.get(`https://african-hearts-api.vercel.app/api/v1/users/${id}`).then((res) => {
      SetUserData(res.data.user)
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      await axios.post(config.apiUrl, post);
      return navigate("/");
    } else {
      await axios.put(`${config.apiUrl}/${id}`, post);
      return navigate("/");
    }
  };


};
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update User</Card.Title>
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
                      onChange={handleChange}
                      value={userData.displayName} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                      type="email" 
                      placeholder="user@gmail.com"
                      name="email"
                      onChange={handleChange}
                      value={userData.email} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Profile Picture Url</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="https:example.com/image.jpg" 
                      name="avatar"
                      onChange={handleChange}
                      value={userData.avatar}
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
                    onChange={handleChange}
                    value={userData.username}
                     />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>User Role</Form.Label>
                    <Form.Control as="select"  name='role' onChange={handleChange}>
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
                      onChange={handleChange}
                      value={userData.password}/>
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
 




   

