import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import toast from 'react-hot-toast';

const BlogEdit = () => {
  const [category, setCategory] = useState('');
  const [image_url, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    // replace with your Cloudinary upload preset + cloud name
    formData.append('upload_preset', 'akomyawo');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dw90vkmoc/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImage(data.secure_url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  // Event handler for submit button
  const handleSubmit = () => {
    fetch(`https://ako-api.vercel.app/galleries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        image_url,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setImage('');
        setCategory('');
        toast.success('Gallery created successfully');
        window.location = '/gallery';
      })
      .catch(() => {
        toast.error('Something went wrong, try again');
        window.location = '/gallery';
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
                    <Label className='form-label' htmlFor='gallery-category'>
                      Category
                    </Label>
                    <Input
                      id='gallery-category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Col>

                  <Col className='mb-2' sm='12'>
                    <Label className='form-label'>Upload Image</Label>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    {uploading && <p>Uploading image...</p>}
                    {image_url && (
                      <div className='mt-2'>
                        <img
                          src={image_url}
                          alt='Preview'
                          style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
                        />
                      </div>
                    )}
                  </Col>

                  <Col className='mt-50'>
                    <Button
                      color='primary'
                      className='me-1'
                      onClick={handleSubmit}
                      disabled={uploading}
                    >
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
