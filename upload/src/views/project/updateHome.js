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
    axios.get(`https://african-hearts-api.vercel.app/api/v1/homepages/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log("data collected", data);
  //handlesubmit function
  const handleUpdate = () => {
    axios.put(`https://african-hearts-api.vercel.app/api/v1/homepages/${id}`, data)
    .then(function (response) {
      Swal.fire(
        'Congragulations!',
        'Congragulations, Updated successfuly!!',
        'success'
      )
      .then(function() {
        window.location = "/homepage";
    });
     
    })
    .catch(function (error) {
      Swal.fire(
        'Ooops!!!',
        'Something went wrong!!',
        'error'
      )
      .then(function() {
        window.location = "/homepage";
    });
    });
  }
  
return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form >
                    <Form.Group>
                      <Form.Label>Homepage Header</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="homepage_header"
                      onChange={e => setData({...data, homepage_header: e.target.value})}
                      value={data.homepage_header} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Homepage About</Form.Label>
                      <Form.Control 
                    as="textarea" 
                    rows={12}
                      type="text" 
                      name="homepage_about"
                      onChange={e => setData({...data, homepage_about: e.target.value})}
                      value={data.homepage_about} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Homepage Mission</Form.Label>
                      <Form.Control
                    as="textarea" 
                    rows={3} 
                      type="text"  
                      name="homepage_mission"
                      onChange={e => setData({...data, homepage_mission: e.target.value})}
                      value={data.homepage_mission}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Homepage Vision</Form.Label>
                      <Form.Control
                    as="textarea" 
                    rows={3} 
                      type="text"  
                      name="homepage_vision"
                      onChange={e => setData({...data, homepage_vision: e.target.value})}
                      value={data.homepage_vision}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>homepage Image</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="homepage_image"
                      onChange={e => setData({...data, homepage_image: e.target.value})}
                      value={data.homepage_image}
                      />
                    </Form.Group>
                    <Button variant="warning" onClick={handleUpdate}>Submit</Button>
                  </Form>
                </Col>
                <Col md={6}>
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={data.homepage_image} className='w-100' alt={data.homepage_title} />
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
 




   

