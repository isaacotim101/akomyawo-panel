import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'


const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [team_title, setTitle] = useState('');
  const [team_bio, setBio] = useState('');
  const [team_image, setImage] = useState('');
  const [team_names, setNames] = useState('');
  const [team_facebook, setFacebook] = useState('');
  const [team_twitter, setTwitter] = useState('');

  // Use useParams to get the id from the URL
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch(`https://african-hearts-api.vercel.app/api/v1/teams/${id}`)
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
          setNames(responseData.team_names);
          setTitle(responseData.team_title);
          setBio(responseData.team_bio);
          setImage(responseData.team_image);
          setTwitter(responseData.team_twitter);
          setFacebook(responseData.team_facebook);
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
    fetch(`https://african-hearts-api.vercel.app/api/v1/teams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_title,
        team_bio, // Send updated content as is
        team_image,
        team_names,
        team_facebook,
        team_twitter
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
        window.location = "/team";
      })
      .catch((error) => {
        toast.error('Something went wrong, try again');
       window.location = "/team";
       console.log("error", error)
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
                          Full Names
                        </Label>
                        <Input
                          id='blog-edit-title'
                          value={team_names}
                          onChange={(e) => setNames(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Title
                        </Label>
                        <Input
                          id='blog-edit-title'
                          value={team_title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Facebook Handle (use "#" if none)
                        </Label>
                        <Input
                          id='blog-edit-title'
                          value={team_facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='blog-edit-title'>
                          Twitter Handle (use "#" if none)
                        </Label>
                        <Input
                          id='blog-edit-title'
                          value={team_twitter}
                          onChange={(e) => setTwitter(e.target.value)}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Bio</Label>
                        <ReactQuill
                          value={team_bio}
                          onChange={(value) => setBio(value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        <div className='border rounded p-2'>
                          <h4 className='mb-1'>Featured Image</h4>
                          <div className='d-flex flex-column flex-md-row'>
                            <img
                              className='rounded me-2 mb-1 mb-md-0'
                              src={team_image}
                              alt='featured img'
                              width='170'
                              height='110'
                            />
                            <div>
                              <small className='text-muted'>
                                Required image resolution 800x400, image URL link.
                              </small>
                              <p className='my-50'>
                                <a href='/' onClick={(e) => e.preventDefault()}>
                                  {team_image}
                                </a>
                              </p>
                              <div className='d-inline-block'>
                                <div className='mb-0'>
                                  <Input
                                    type='text'
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
