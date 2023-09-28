import React, { useState} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill'; // Import the react-quill component
import 'react-quill/dist/quill.snow.css'; // Import the default styles

const FormsElements = () => {

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
const handleSubmit = event => {
event.preventDefault(); 

const nestedData = {
  image: image,
  title: title,
  body: body,
  };
var config = {
method: 'post',
  url: 'https://african-hearts-api.vercel.app/api/v1/campaigns',
  headers: {     
    Accept: '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  'Content-Type': 'application/json'},
data: nestedData,
};

axios(config)
.then(function (response) {
  Swal.fire(
    'Congragulations!',
    'Congragulations, Added new cause successfuly !!',
    'success'
  )
  .then(function() {
    window.location = "#";
});
 
})
.catch(function (error) {
  Swal.fire(
    'Ooops!!!',
    'Something went wrong!!',
    'error'
  )
  .then(function() {
    window.location = "#";
});
});

setTitle('');
setBody('');
setImage('');


};
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Campaigns</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form  onSubmit={handleSubmit}>

                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                      type="Title" 
                      placeholder="Cause Title"
                      name="Title"
                      onChange={event => setTitle(event.target.value)}
                      value={title} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter image link here...."
                      name="name"
                      onChange={event => setImage(event.target.value)}
                      value={ image} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      {/* Integrate react-quill for the body field */}
                      <ReactQuill
                        value={body}
                        onChange={value => setBody(value)}
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
                    </Form.Group>
                    <Button variant="primary" type = "submit">Submit</Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormsElements;
 




   

