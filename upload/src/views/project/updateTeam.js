import React, { useState, useEffect} from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
const FormsElements = () => {
  // eslint-disable-next-line
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(`https://african-hearts-api.vercel.app/api/v1/teams/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log("data collected", data);
  //handlesubmit function
  const handleUpdate = () => {
    axios.put(`https://african-hearts-api.vercel.app/api/v1/teams/${id}`, data)
    .then(function (response) {
      Swal.fire(
        'Congragulations!',
        'Congragulations, Updated successfuly!!',
        'success'
      )
      .then(function() {
        window.location = "/teams";
    });
     
    })
    .catch(function (error) {
      Swal.fire(
        'Ooops!!!',
        'Something went wrong!!',
        'error'
      )
      .then(function() {
        window.location = "/teams";
    });
    });
  }
  
return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update Team Members</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form >
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="team_names"
                      onChange={e => setData({...data, team_names: e.target.value})}
                      value={data.team_names} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="team_title"
                      onChange={e => setData({...data, team_title: e.target.value})}
                      value={data.team_title} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Bio</Form.Label>
                      <Form.Control 
                    as="textarea" 
                    rows={8}
                      type="text"  
                      name="team_bio"
                      onChange={e => setData({...data, team_bio: e.target.value})}
                      value={data.team_bio}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control 
                      type="text"  
                      name="team_image"
                      onChange={e => setData({...data, team_image: e.target.value})}
                      value={data.team_image}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="team_twitter"
                      onChange={e => setData({...data, team_twitter: e.target.value})}
                      value={data.team_twitter}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="team_facebook"
                      onChange={e => setData({...data, team_facebook: e.target.value})}
                      value={data.team_facebook}
                      />
                    </Form.Group>
                    <Button variant="warning" onClick={handleUpdate}>Submit</Button>
                  </Form>
                </Col>
                <Col md={6}>
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={data.team_image} className='w-100' alt={data.team_title} />
                </div>
                </Card.Body>
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
 




   

