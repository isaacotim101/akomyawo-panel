import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
const FormsElements = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")

  const [post, setPost] = useState({
    role: "",
    displayName: "",
    email: "",
    password: "",
    username: "",
    avatar: "",
    status: "",
  });

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`https://api.africanjearts.com/api/v1/users/${id}`);
      setPost(data);
    };
    fetchPost();
  }, []);

  const handleChange = (e) => {
    const postClone = { ...post };
    postClone[e.target.name] = e.target.value;
    setPost(postClone);
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
                  <Form >
                    <Form.Group>
                      <Form.Label>Names</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter Full Names here...."
                      name="displayName"
                      value={post.displayName}
                      onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                      type="email" 
                      placeholder="user@gmail.com"
                      name="email"
                      value={post.email}
                      onChange={handleChange}
                       
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Profile Picture Url</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="https:example.com/image.jpg" 
                      name="avatar"
                      value={post.avatar}
                      onChange={handleChange}
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
                    value={post.username}
                    onChange={handleChange}
                     />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>User Role</Form.Label>
                    <Form.Control as="select"  name='role'
            onChange={handleChange}>
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
                      value={post.password}
                      onChange={handleChange}/>
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
 




   

