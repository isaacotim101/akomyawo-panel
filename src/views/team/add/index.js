import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'


const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [team_title, setTitle] = useState('');
  const [team_bio, setBio] = useState('');
  const [team_leadership, setLeadership] = useState('');
  const [team_image, setImage] = useState('');
  const [team_names, setNames] = useState('');
  const [team_facebook, setFacebook] = useState('');
  const [team_twitter, setTwitter] = useState('');

   // Event handler for submit button
  const handleSubmit = () => {
    // Make a PUT request to update the content
    fetch(`https://african-hearts-api.vercel.app/api/v1/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_title: team_title,
        team_bio: team_bio, // Send updated content as is
        team_leadership: team_leadership,
        team_image: team_image,
        team_names: team_names,
        team_facebook: team_facebook,
        team_twitter: team_twitter
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {

        setTitle('');
        setAuthor('');
        setBody('');
        setImage('');
        toast.success('Article Created successfully');
        window.location = "/team";
      })
      .catch((error) => {
        //toast.error('Something went wrong, try again');
        window.location = "/team";
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
                          onChange={(e) => setNames(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Title
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Facebook Handle (use "#" if none)
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setFacebook(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Twitter Handle (use "#" if none)
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setTwitter(e.target.value)}
                        />
                      </Col>
                      <Col md='12' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Leadership Catergory
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setLeadership(e.target.value)}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Bio</Label>
                        <ReactQuill
                          onChange={(value) => setBio(value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        <Label>Image</Label>
                      <Input
                                    type='text'
                                    accept='.jpg, .png, .gif'
                                    onChange={(e) => setImage(e.target.value)}
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
