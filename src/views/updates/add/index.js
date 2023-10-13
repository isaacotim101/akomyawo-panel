import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'


const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [update_title, setTitle] = useState('');
  const [update_auther, setAuthor] = useState('');
  const [update_description, setDescription] = useState('');
  const [update_featured_image, setImage] = useState('');

   // Event handler for submit button
  const handleSubmit = () => {
    // Make a PUT request to update the content
    fetch(`https://african-hearts-api.vercel.app/api/v1/updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        update_title: update_title,
        update_auther: update_auther,
        update_description: update_description, // Send updated content as is
        update_featured_image: update_featured_image,
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
        setDescription('');
        setImage('');
        toast.success('updates Created successfully');
        window.location = "/updates";
      })
      .catch((error) => {
        toast.error('Something went wrong, try again');
        window.location = "/updates";
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
                          Title
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-slug'>
                          Author
                        </Label>
                        <Input
                          id='blog-edit-slug'
                          onChange={(e) => setAuthor(e.target.value)}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Content</Label>
                        <ReactQuill
                          onChange={(value) => setDescription(value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        
                      <Label className='form-label'>Featured Image URL| Required image resolution 800x400</Label>
                          <Input type='text' name='update_featured_image' onChange={(e) => setImage(e.target.value)} />
                      </Col>
                      <Col className='mt-50'>
                        <Button color='primary' className='me-1' onClick={handleSubmit}>
                          Save Changes
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
