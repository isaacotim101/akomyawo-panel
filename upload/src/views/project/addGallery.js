import React, { useState} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
const FormsElements = () => {

  const [gallery_image, setImage] = useState('');
  const [gallery_catergory, setCatergory] = useState('');
const handleSubmit = event => {
event.preventDefault(); 

const nestedData = {
  gallery_image: gallery_image,
  gallery_catergory: gallery_catergory,
  };
var config = {
method: 'post',
  url: 'https://african-hearts-api.vercel.app/api/v1/gallerys',
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
    'Congragulations, Added successfuly !!',
    'success'
  )
  .then(function() {
    window.location = "/gallery";
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

setImage('');
setCatergory('');


};
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Gallery</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form  onSubmit={handleSubmit}>

                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter image link here...."
                      name="name"
                      onChange={event => setImage(event.target.value)}
                      value={ gallery_image} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Catergory</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Image Catergory goes here....." 
                      name="body"
                      onChange={event => setCatergory(event.target.value)}
                      value={ gallery_catergory}
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
 




   

