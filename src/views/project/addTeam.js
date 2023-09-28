import React, { useState} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
const FormsElements = () => {

  const [team_names, setName] = useState('');
  const [team_title, setTitle] = useState('');
  const [team_bio, setBio] = useState('');
  const [team_image, setImage] = useState('');
  const [team_twitter, setTwitter] = useState('');
  const [team_facebook, setFacebook] = useState('');
const handleSubmit = event => {
event.preventDefault(); 

const nestedData = {
  team_names: team_names,
  team_title: team_title,
  team_bio: team_bio,
  team_image: team_image,
  team_twitter: team_twitter,
  team_facebook: team_facebook,
  };
var config = {
method: 'post',
  url: 'https://african-hearts-api.vercel.app/api/v1/teams',
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
    window.location = "/team";
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

setName('');
setTitle('');
setBio('');
setImage('');
setTwitter('');
setFacebook('');


};
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Team Member</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form  onSubmit={handleSubmit}>

                    <Form.Group>
                    <Form.Label>Full Names</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter Full Names"
                      name="name"
                      onChange={event => setName(event.target.value)}
                      value={ team_names} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Posotion/Title</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter Posotion Held or Title here..." 
                      name="body"
                      onChange={event => setTitle(event.target.value)}
                      value={ team_title}
                      />
                      <Form.Group>
                        <Form.Label>Bio Data</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter Bio Data here....." 
                        name="body"
                        onChange={event => setBio(event.target.value)}
                        value={ team_bio}
                        />
                      </Form.Group>
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter image link here...."
                      name="name"
                      onChange={event => setImage(event.target.value)}
                      value={ team_image} />
                    </Form.Group>
                      <Form.Group>
                        <Form.Label>Twitter URL '( Enter # for Null)'</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter twitter url....." 
                        name="body"
                        onChange={event => setTwitter(event.target.value)}
                        value={ team_twitter}
                        />
                      </Form.Group>
                      <Form.Group>
                      <Form.Label>Facebook URL '( Enter # for Null)'</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter facebook url"
                      name="name"
                      onChange={event => setFacebook(event.target.value)}
                      value={ team_facebook} />
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
 




   

