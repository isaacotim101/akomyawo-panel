import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import toast from 'react-hot-toast';

const BlogEdit = () => {
  const [category, setCategory] = useState('');
  const [imageUrls, setImageUrls] = useState([]); // Store multiple image URLs
  const [uploading, setUploading] = useState(false);

  // Handle multiple image uploads to Cloudinary
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    if (!files.length) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'akomyawo'); // Replace with your Cloudinary upload preset

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dw90vkmoc/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        if (!data.secure_url) {
          throw new Error('Image upload failed');
        }
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImageUrls((prev) => [...prev, ...uploadedUrls]); // Append new URLs
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      toast.error('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  // Event handler for submit button
  const handleSubmit = async () => {
    if (!imageUrls.length || !category) {
      toast.error('Please upload at least one image and select a category');
      return;
    }

    try {
      // Send a separate API request for each image URL
      const submitPromises = imageUrls.map(async (image_url) => {
        const response = await fetch(`https://ako-api.vercel.app/galleries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category,
            image_url,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      });

      await Promise.all(submitPromises);
      setImageUrls([]);
      setCategory('');
      toast.success('Gallery entries created successfully');
      window.location = '/gallery';
    } catch (error) {
      toast.error('Something went wrong, try again');
      window.location = '/gallery';
    }
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
                    <Label className='form-label'>Upload Images</Label>
                    <Input
                      type='file'
                      accept='image/*'
                      multiple // Enable multiple file selection
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    {uploading && <p>Uploading images...</p>}
                    {imageUrls.length > 0 && (
                      <div className='mt-2'>
                        {imageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: '100%',
                              maxWidth: '200px',
                              margin: '10px',
                              borderRadius: '8px',
                            }}
                          />
                        ))}
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