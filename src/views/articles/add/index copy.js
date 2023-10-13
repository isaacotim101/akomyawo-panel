import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Row, Col, Card, CardBody, Form, Label, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles

const BlogEdit = () => {
  const [data, setData] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Initialize the editorState
  const [updatedContent, setUpdatedContent] = useState(''); // State to track updated content

  // Use useParams to get the id from the URL
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch(`https://african-hearts-api.vercel.app/api/v1/blogs/${id}`)
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

          // Create an EditorState from the API data
          const contentBlocks = convertFromHTML(responseData.post_description);
          const contentState = ContentState.createFromBlockArray(contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);
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
    fetch(`https://african-hearts-api.vercel.app/api/v1/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle the response or perform any additional actions
        console.log('Updated data:', responseData);
      })
      .catch((error) => {
        console.error('API Error:', error);
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
                        <Label className='form-label' for='blog-edit-title'>
                          Title
                        </Label>
                        <Input id='blog-edit-title' 
                        value={data.post_title} 
                        onChange={e => setData({...data, post_title: e.target.value})}
                        />
                      </Col>
                      <Col md='6' className='mb-2'>
                        <Label className='form-label' for='blog-edit-slug'>
                          Author
                        </Label>
                        <Input id='blog-edit-slug' 
                        value={data.post_auther} 
                        onChange={e => setData({...data, post_auther: e.target.value})}
                        />
                      </Col>

                      <Col sm='12' className='mb-2'>
                        <Label className='form-label'>Content</Label>
                         <ReactQuill
                        value={data.post_description}
                        onChange={value => setData({...data, post_description: value})}
                        modules={{
                          toolbar: [
                            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, 
                             {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                        />
                   
                      </Col>
                      <Col className='mb-2' sm='12'>
                        <div className='border rounded p-2'>
                          <h4 className='mb-1'>Featured Image</h4>
                          <div className='d-flex flex-column flex-md-row'>
                            <img
                              className='rounded me-2 mb-1 mb-md-0'
                              src={data.post_featured_image}
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
                                {data.post_featured_image}
                                </a>
                              </p>
                              <div className='d-inline-block'>
                                <div className='mb-0'>
                                  <Input
                                    type='file'
                                    accept='.jpg, .png, .gif'
                                    onChange={e => setData({...data, post_featured_image: e.target.value})}

                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col className='mt-50'>
                        <Button color='primary' className='me-1' onClick={handleSubmit}>
                          Save Changes
                        </Button>
                        <Button color='secondary' outline>
                          Cancel
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
