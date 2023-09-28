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
    axios.get(`https://african-hearts-api.vercel.app/api/v1/products/${id}`)
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log("data collected", data);
  //handlesubmit function
  const handleUpdate = () => {
    axios.put(`https://african-hearts-api.vercel.app/api/v1/products/${id}`, data)
    .then(function (response) {
      Swal.fire(
        'Congragulations!',
        'Congragulations, Product Updated successfuly!!',
        'success'
      )
      .then(function() {
        window.location = "/stock";
    });
     
    })
    .catch(function (error) {
      Swal.fire(
        'Ooops!!!',
        'Something went wrong!!',
        'error'
      )
      .then(function() {
        window.location = "/stock";
    });
    });
  }
  
return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update Product</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form >
                    <Form.Group>
                      <Form.Label>Product Names</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Enter Products Names here...."
                      name="name"
                      onChange={e => setData({...data, name: e.target.value})}
                      value={data.name} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Slug</Form.Label>
                      <Form.Control 
                      type="slug" 
                      placeholder="slug/aka"
                      name="slug"
                      onChange={e => setData({...data, slug: e.target.value})}
                      value={data.slug} 
                       />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Item Description goes here....." 
                      name="description"
                      onChange={e => setData({...data, description: e.target.value})}
                      value={data.description}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Item Image (230px x 200px)</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Past image web source here...eg https://www.example.com/image.jpg" 
                      name="image_original"
                      onChange={e => setData({...data, image_original: e.target.value})}
                      value={data.image_original}
                      />
                    </Form.Group>
                    <Button variant="warning" onClick={handleUpdate}>Submit</Button>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="Stock quantity"
                    name="quantity"
                    onChange={e => setData({...data, quantity: e.target.value})}
                    value={data.quantity}
                     />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Select catergory for the product</Form.Label>
                    <Form.Control as="select"  name='category' onChange={e => setData({...data, category: e.target.value})}>
                    <option value={data.category}>{data.category}</option>
                    <option value="Nursery">Nursery</option>
                      <option value="Primary">Primary</option>
                      <option value="Secondary">Secondary</option>
                      <option value="Unilever">Unilever</option>
                      <option value="Writing">Writing Materials</option>
                      <option value="Nice">Nice Plastics</option>
                      <option value="Hygiene">Personal Hygiene</option>
                      <option value="Uniform">School Uniforms</option>
                    </Form.Control>
                  </Form.Group>
                    <Form.Group>
                      <Form.Label>Price Ugx</Form.Label>
                      <Form.Control 
                      type="number" 
                      placeholder="price" 
                      name = "price" 
                      onChange={e => setData({...data, price: e.target.value})}
                      value={data.price}/>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Unit</Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="Unit" 
                      name = "unit" 
                      onChange={e => setData({...data, unit: e.target.value})}
                      value={data.unit}/>
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
 




   

