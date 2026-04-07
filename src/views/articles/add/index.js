import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dw90vkmoc/auto/upload';
const CLOUDINARY_UPLOAD_PRESET = 'akomyawo';

const BlogCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAttachments, setUploadingAttachments] = useState(false);

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
      setImageUrl(uploaded.url);
      toast.success('Featured image uploaded');
    } catch (error) {
      console.error(error);
      toast.error('Featured image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAttachmentsUpload = async e => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingAttachments(true);

    try {
      const uploadedFiles = await Promise.all(files.map(file => cloudinaryUpload(file)));
      setAttachments(prev => [...prev, ...uploadedFiles]);
      toast.success(`${uploadedFiles.length} attachment(s) uploaded`);
    } catch (error) {
      console.error(error);
      toast.error('Attachment upload failed');
    } finally {
      setUploadingAttachments(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const response = await fetch('https://ako-api.vercel.app/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          image_url: imageUrl,
          attachments
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      setTitle('');
      setContent('');
      setImageUrl('');
      setAttachments([]);
      toast.success('Article created successfully');
      navigate('/articles');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong, try again');
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
                    <Label className='form-label' htmlFor='blog-edit-title'>
                      Title
                    </Label>
                    <Input id='blog-edit-title' value={title} onChange={e => setTitle(e.target.value)} />
                  </Col>

                  <Col sm='12' className='mb-2'>
                    <Label className='form-label'>Content</Label>
                    <ReactQuill value={content} onChange={value => setContent(value)} />
                  </Col>

                  <Col className='mb-2' sm='12'>
                    <Label className='form-label'>Featured Image | Required resolution 800x400</Label>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && <p>Uploading image...</p>}
                    {imageUrl && (
                      <div className='mt-2'>
                        <img
                          src={imageUrl}
                          alt='Uploaded preview'
                          style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
                        />
                      </div>
                    )}
                  </Col>

                  <Col className='mb-2' sm='12'>
                    <Label className='form-label'>Attachments (PDF, DOC, ZIP, etc.)</Label>
                    <Input
                      type='file'
                      multiple
                      accept='image/*,.pdf,.doc,.docx,.xlsx,.ppt,.pptx,.txt,.zip'
                      onChange={handleAttachmentsUpload}
                      disabled={uploadingAttachments}
                    />
                    {uploadingAttachments && <p>Uploading attachments...</p>}
                    {attachments.length > 0 && (
                      <div className='mt-2'>
                        <h6>Uploaded Attachments</h6>
                        <ListGroup flush>
                          {attachments.map((file, index) => (
                            <ListGroupItem key={index} className='ps-0'>
                              <a href={file.url} target='_blank' rel='noreferrer'>
                                {file.name}
                              </a>
                              <span className='text-muted ms-50'>({file.type || 'attachment'})</span>
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </div>
                    )}
                  </Col>

                  <Col className='mt-50'>
                    <Button color='primary' className='me-1' onClick={handleSubmit} disabled={uploadingImage || uploadingAttachments}>
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

export default BlogCreate;
