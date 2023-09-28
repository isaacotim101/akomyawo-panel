import React, { useState} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
const FormsElements = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
const handleSubmit = event => {
event.preventDefault(); 

const nestedData = {
  code: Date.now(),
  id: Date.now(),
  name: name,
  image: image,
  
  };
var config = {
method: 'post',
  url: 'https://african-hearts-api.vercel.app/api/v1/banner',
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
    'Congragulations, Add new Banner successfuly !!',
    'success'
  )
  .then(function() {
    window.location = "/banner";
});
 
})
.catch(function (error) {
  Swal.fire(
    'Ooops!!!',
    'Something went wrong!!',
    'error'
  )
  .then(function() {
    window.location = "/banner";
});
});

setName('');
setImage('');


};
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Banner</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter name here...."
                      name="name"
                      onChange={event => setName(event.target.value)}
                      value={name} />
                    </Form.Group>
                     <Button variant="primary" type = "submit">Submit</Button>
                  </Form>
                </Col>
                <Col md={6}>
                    <Form.Group>
                      <Form.Label>Image (720px × 390px)</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Past image web source here...eg https://www.example.com/image.jpg" 
                      name="image"
                      onChange={event => setImage(event.target.value)}
                      value={image}
                      />
                    </Form.Group>
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
 




   

