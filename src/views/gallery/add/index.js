import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import toast from 'react-hot-toast'


const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [gallery_catergory, setcatergory] = useState('');
  const [gallery_image, setImage] = useState('');

   // Event handler for submit button
  const handleSubmit = () => {
    // Make a PUT request to update the content
    fetch(`https://african-hearts-api.vercel.app/api/v1/gallerys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gallery_catergory: gallery_catergory, // Send updated content as is
        gallery_image: gallery_image,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {

        setImage('');
        setcatergory('');
        toast.success('Gallery  Created successfully');
        window.location = "/gallery";
      })
      .catch((error) => {
        //toast.error('Something went wrong, try again');
        window.location = "/gallery";
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
                      <Col md='12' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Catergory
                        </Label>
                        <Input
                          id='blog-edit-title'
                          onChange={(e) => setcatergory(e.target.value)}
                        />
                      </Col>

                      <Col className='mb-2' sm='12'>
                        
                      <Label className='form-label'>Image URL</Label>
                          <Input type='text' name='gallery_image' onChange={(e) => setImage(e.target.value)} />
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
