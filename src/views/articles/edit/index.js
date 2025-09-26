import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'


const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image_url, setImage] = useState('');

  // Use useParams to get the id from the URL
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch(`https://ako-api.vercel.app/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        // Check if the responseData is not null
        if (responseData) {
          setData(responseData);
          setTitle(responseData.title);
          setContent(responseData.content);
          setImage(responseData.image_url);
        } else {
          // Handle the case when responseData is null
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, [id]);

  // Event handler for submit button
  const handleSubmit = () => {
    // Make a PUT request to update the content
    fetch(`https://ako-api.vercel.app/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content, // Send updated content as is
        image_url,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle the response or perform any additional actions
        
        toast.success('Article updated successfully');
        window.location = "/articles";
      })
      .catch((error) => {
        toast.error('Something went wrong, try again');
        window.location = "/articles";
      });
  };

  return (
    <div className='blog-edit-wrapper'>
      <Row>
        <Col sm='12'>
          <Card>
            <CardBody>
              {data && (
                <>
                  <Form className='mt-2'>
                    <Row>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Title
                        </Label>
                        <Input
                          id='blog-edit-title'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Content</Label>
                        <ReactQuill
                          value={content}
                          onChange={(value) => setContent(value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        <div className='border rounded p-2'>
                          <h4 className='mb-1'>Featured Image</h4>
                          <div className='d-flex flex-column flex-md-row'>
                            <img
                              className='rounded me-2 mb-1 mb-md-0'
                              src={image_url}
                              alt='featured img'
                              width='170'
                              height='110'
                            />
                            <div>
                              <small className='text-muted'>
                                Required image resolution 800x400, image size 10mb.
                              </small>
                              <p className='my-50'>
                                <a href='/' onClick={(e) => e.preventDefault()}>
                                  {image_url}
                                </a>
                              </p>
                              <div className='d-inline-block'>
                                <div className='mb-0'>
                                  <Input
                                    type='file'
                                    accept='.jpg, .png, .gif'
                                    onChange={(e) => setImage(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col className='mt-50'>
                        <Button color='primary' className='me-1' onClick={handleSubmit}>
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogEdit;
