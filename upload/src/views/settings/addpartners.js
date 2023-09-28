import React, { useState} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
const FormsElements = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [gallery_image_1, setGallery1] = useState('');
  const [catergories, setCatergories] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
const handleSubmit = event => {
event.preventDefault(); 

const nestedData = {
  code: Date.now(),
  id: Date.now(),
  title: title,
  slug: slug,
  description: description,
  image: image,
  
  };
var config = {
method: 'post',
  url: 'https://african-hearts-api.vercel.app/api/v1/school',
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
    'Congragulations, Add new Partner successfuly !!',
    'success'
  )
  .then(function() {
    window.location = "/partners";
});
 
})
.catch(function (error) {
  Swal.fire(
    'Ooops!!!',
    'Something went wrong!!',
    'error'
  )
  .then(function() {
    window.location = "/partners";
});
});

setTitle('');
setSlug('');
setDescription('');
setImage('');
setGallery1('');
setCatergories('');
setPrice('');
setUnit('');


};
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Partner</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form  onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter Title here...."
                      name="title"
                      onChange={event => setTitle(event.target.value)}
                      value={title} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Slug</Form.Label>
                      <Form.Control 
                      type="slug" 
                      placeholder="slug/aka"
                      name="slug"
                      onChange={event => setSlug(event.target.value)}
                      value={slug} 
                       />
                    </Form.Group>
                     <Button variant="primary" type = "submit">Submit</Button>
                  </Form>
                </Col>
                <Col md={6}>
                <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Item Description goes here....." 
                      name="description"
                      onChange={event => setDescription(event.target.value)}
                      value={description}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image (230px x 200px)</Form.Label>
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
 




   

