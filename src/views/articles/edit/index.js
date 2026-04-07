import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const BlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image_url, setImage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAttachments, setUploadingAttachments] = useState(false);

  const normalizeAttachment = attachment => {
    if (!attachment) return null;
    return typeof attachment === 'string'
      ? { url: attachment, name: attachment.split('/').pop(), type: '' }
      : attachment;
  };

  useEffect(() => {
    fetch(`https://ako-api.vercel.app/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        if (responseData) {
          setData(responseData);
          setTitle(responseData.title || '');
          setContent(responseData.content || '');
          setImage(responseData.image_url || '');
          setAttachments((responseData.attachments || []).map(normalizeAttachment).filter(Boolean));
        }
      })
      .catch(error => {
        console.error('API Error:', error);
        toast.error('Unable to load article');
      });
  }, [id]);

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
      setImage(uploaded.url);
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
      const response = await fetch(`https://ako-api.vercel.app/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          image_url,
          attachments
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      toast.success('Article updated successfully');
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
              {data && (
                <Form className='mt-2'>
                  <Row>
                    <Col md='6' className='mb-2'>
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
                      <div className='border rounded p-2'>
                        <h4 className='mb-1'>Featured Image</h4>
                        <div className='d-flex flex-column flex-md-row'>
                          {image_url ? (
                            <img
                              className='rounded me-2 mb-1 mb-md-0'
                              src={image_url}
                              alt='featured img'
                              width='170'
                              height='110'
                            />
                          ) : null}
                          <div>
                            <small className='text-muted'>Required image resolution 800x400, image size 10mb.</small>
                            <p className='my-50'>
                              <a href='/' onClick={e => e.preventDefault()}>
                                {image_url || 'No image uploaded yet'}
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
                              </div>
                            </div>
                            {uploadingImage && <p>Uploading image...</p>}
                          </div>
                        </div>
                      </div>
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
                          <h6>Attachments</h6>
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
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogEdit;
