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
    axios.get(`https://african-hearts-api.vercel.app/api/v1/campaigns/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log("data collected", data);
  //handlesubmit function
  const handleUpdate = () => {
    axios.put(`https://african-hearts-api.vercel.app/api/v1/campaigns/${id}`, data)
    .then(function (response) {
      Swal.fire(
        'Congragulations!',
        'Congragulations, Updated successfuly!!',
        'success'
      )
      .then(function() {
        window.location = "/campaigns";
    });
     
    })
    .catch(function (error) {
      Swal.fire(
        'Ooops!!!',
        'Something went wrong!!',
        'error'
      )
      .then(function() {
        window.location = "/campaigns";
    });
    });
  }
  
return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update Campaigns</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form >
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="title"
                      onChange={e => setData({...data, title: e.target.value})}
                      value={data.title} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Body</Form.Label>
                      <Form.Control 
                    as="textarea" 
                    rows={12}
                      type="text" 
                      name="body"
                      onChange={e => setData({...data, body: e.target.value})}
                      value={data.body} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control 
                      type="text" 
                      name="image"
                      onChange={e => setData({...data, image: e.target.value})}
                      value={data.image}
                      />
                    </Form.Group>
                    <Button variant="warning" onClick={handleUpdate}>Update</Button>
                  </Form>
                </Col>
                <Col md={6}>
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={data.image} className='w-100' alt={data.title} />
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
 




   

