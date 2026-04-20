import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dw90vkmoc/auto/upload';
const CLOUDINARY_UPLOAD_PRESET = 'akomyawo';

const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [amountToDonate, setAmountToDonate] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Use useParams to get the id from the URL
  const { id } = useParams();

  const cloudinaryUpload = async file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('resource_type', 'auto');

    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    if (!data.secure_url) {
      throw new Error('Upload did not return a URL');
    }

    return {
      url: data.secure_url,
      name: file.name,
      type: file.type
    };
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);

    try {
      const uploaded = await cloudinaryUpload(file);
      setImageLink(uploaded.url);
      toast.success('Profile image uploaded');
    } catch (error) {
      console.error(error);
      toast.error('Profile image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch(`https://ako-api.vercel.app/sponsors/${id}`)
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
          setName(responseData.name);
          setDescription(responseData.description);
          setImageLink(responseData.image_link);
          setAmountToDonate(responseData.amount_to_donate);
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
    fetch(`https://ako-api.vercel.app/sponsors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        image_link: imageLink,
        amount_to_donate: parseFloat(amountToDonate)
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
        
        toast.success('Sponsor updated successfully');
        window.location = "/sponsor";
      })
      .catch((error) => {
        toast.error('Something went wrong, try again');
        window.location = "/sponsor";
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
                        <Label className='form-label' htmlFor='sponsor-edit-name'>
                          Name
                        </Label>
                        <Input
                          id='sponsor-edit-name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Col>

                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='sponsor-edit-amount'>
                          Donation Amount ($)
                        </Label>
                        <Input
                          id='sponsor-edit-amount'
                          type='number'
                          step='0.01'
                          value={amountToDonate}
                          onChange={(e) => setAmountToDonate(e.target.value)}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Description</Label>
                        <ReactQuill
                          value={description}
                          onChange={(value) => setDescription(value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        <div className='border rounded p-2'>
                          <h4 className='mb-1'>Profile Image</h4>
                          <div className='d-flex flex-column flex-md-row'>
                            <img
                              className='rounded me-2 mb-1 mb-md-0'
                              src={imageLink}
                              alt='profile img'
                              width='170'
                              height='110'
                            />
                            <div>
                              <small className='text-muted'>
                                Upload a new image or keep the current one.
                              </small>
                              <p className='my-50'>
                                <a href={imageLink} target='_blank' rel='noopener noreferrer'>
                                  View current image
                                </a>
                              </p>
                              <div className='d-inline-block'>
                                <div className='mb-0'>
                                  <Input
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                  />
                                  {uploadingImage && <p>Uploading image...</p>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col className='mt-50'>
                        <Button color='primary' className='me-1' onClick={handleSubmit} disabled={uploadingImage}>
                          Update Sponsor
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
