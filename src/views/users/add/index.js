import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'


const BlogEdit = () => {
  const [displayName, setDisplayname] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

   // Event handler for submit button
  const handleSubmit = () => {
    // Make a PUT request to update the content
    fetch(`https://african-hearts-api.vercel.app/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName: displayName,
        email: email, // Send updated content as is
        username: username,
        password: password,
        avatar: avatar,
        role: role,
        status: "true"
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {

        setDisplayname('');
        setEmail('');
        setUsername('');
        SetAvatar('');
        SetPassword('');
        SetStatus('');
        toast.success('User Created successfully');
        window.location = "/users";
      })
      .catch((error) => {
        //toast.error('Something went wrong, try again');
        window.location = "/users";
      });
  };

  return (
    <div className='blog-edit-wrapper'>
      <Row>
        <Col sm='12'>
          <Card>
            <CardBody>
            <Form className='mt-2'>
                    <Row>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Full Names
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setDisplayname(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Username
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Email
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          password
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Col>
                      <Col md='12' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Role
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setRole(e.target.value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        <Label>Image</Label>
                      <Input
                                    type='text'
                                    accept='.jpg, .png, .gif'
                                    onChange={(e) => setAvatar(e.target.value)}
                                  />
                      </Col>
                      <Col className='mt-50'>
                        <Button color='primary' className='me-1' onClick={handleSubmit}>
                          Create
                        </Button> 
                      </Col>
                    </Row>
                  </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogEdit;
