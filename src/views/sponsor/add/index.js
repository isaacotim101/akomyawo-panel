import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles
import toast from 'react-hot-toast'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dw90vkmoc/auto/upload';
const CLOUDINARY_UPLOAD_PRESET = 'akomyawo';

const BlogEdit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [amountToDonate, setAmountToDonate] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

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

   // Event handler for submit button
  const handleSubmit = () => {
    // Make a PUT request to update the content
    fetch(`https://ako-api.vercel.app/sponsors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: description,
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

        setName('');
        setDescription('');
        setImageLink('');
        setAmountToDonate('');
        toast.success('Sponsor Created successfully');
        window.location = "/sponsor";
      })
      .catch((error) => {
        toast.error('Something went wrong, try again');
        window.location = "/sponsor";
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
                        <Label className='form-label' htmlFor='sponsor-add-name'>
                          Name
                        </Label>
                        <Input
                          id='sponsor-add-name'
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Col>

                      <Col md='6' className='mb-2'>
                        <Label className='form-label' htmlFor='sponsor-add-amount'>
                          Donation Amount ($)
                        </Label>
                        <Input
                          id='sponsor-add-amount'
                          type='number'
                          step='0.01'
                          onChange={(e) => setAmountToDonate(e.target.value)}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Description</Label>
                        <ReactQuill
                          onChange={(value) => setDescription(value)}
                        />
                      </Col>
                      <Col className='mb-2' sm='12'>
                        
                      <Label className='form-label'>Profile Image | Required resolution 400x400</Label>
                          <Input
                            type='file'
                            accept='image/*'
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                          />
                          {uploadingImage && <p>Uploading image...</p>}
                          {imageLink && (
                            <div className='mt-2'>
                              <img
                                src={imageLink}
                                alt='Uploaded preview'
                                style={{ width: '100%', maxWidth: '200px', borderRadius: '8px' }}
                              />
                            </div>
                          )}
                      </Col>
                      <Col className='mt-50'>
                        <Button color='primary' className='me-1' onClick={handleSubmit} disabled={uploadingImage}>
                          Create Sponsor
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
