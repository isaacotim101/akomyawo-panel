import React, { useState, Fragment, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

const UserInfoCard = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetch('https://african-hearts-api.vercel.app/api/v1/action/649326560ba8b83124ce0056')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        // Handle the data here
        setData(responseData); // Assuming responseData is an object
        setFormData(responseData); // Pre-fill form data with the fetched data
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  const handleEdit = () => {
    setShow(true);
  };

  const handleReset = () => {
    setShow(false);
  };

  const handleSubmit = () => {
    // Make a PUT request to update the data at the same URL
    fetch('https://african-hearts-api.vercel.app/api/v1/action/649326560ba8b83124ce0056', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
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

    setShow(false);
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              <img
                width='100%'
                alt='user-avatar'
                src={data.image}
                className='img-fluid rounded mt-3 mb-2'
              />
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{data.title}</h4>
                </div>
              </div>
            </div>
          </div>

          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            <ul className='list-unstyled'>
              <li className='mb-75'>
                <span>{data.description}</span>
              </li>
            </ul>
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={handleEdit}>
              Edit
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={handleReset} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={handleReset}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit Call to Action Section</h1>
            <p>Updating Call to Action Section Details</p>
          </div>
          <Form>
            <Row className='gy-1 pt-75'>
              <Col xs={12}>
                <Label className='form-label' for='title'>
                  Title
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  id='title'
                  name='title'
                  placeholder='Title'
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='description'>
                  Description
                </Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  id='description'
                  name='description'
                  type='textarea'
                  placeholder='Description'
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='image'>
                  Image URL
                </Label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  id='image'
                  name='image'
                  placeholder='Image URL'
                />
              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='button' className='me-1' color='primary' onClick={handleSubmit}>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset();
                    setFormData(data); // Reset form data to the fetched data
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
