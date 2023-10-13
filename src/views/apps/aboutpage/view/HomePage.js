import React, { Fragment, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Row,
  Col,
  Card,
  Input,
  Modal,
  Label,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader
} from 'reactstrap';

const BillingCurrentPlan = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Make a GET request to fetch data
    fetch('https://african-hearts-api.vercel.app/api/v1/homepages/646d32fbdb1a58ef8824c3d8')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        // Handle the data here
        setData(responseData); // Assuming responseData is an object
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
    register
  } = useForm({
    defaultValues: {
      homepage_header: '',
      homepage_mission: '',
      homepage_vision: '',
      homepage_about: '',
      homepage_image: '',
    },
  });

  const onSubmit = (formData) => {
    // Make a PUT request to update the data with formData
    fetch('https://african-hearts-api.vercel.app/api/v1/homepages/646d32fbdb1a58ef8824c3d8', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send updated data
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
        setShow(false);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };

  const onDiscard = () => {
    reset();
    setShow(false);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Home Page</CardTitle>
        </CardHeader>
        <CardBody>
          {data ? (
            <Row>
              <Col md='6'>
                <div className='mb-2 pb-50'>
                  <h5>Home Page Header</h5>
                  <span>{data.homepage_header}</span>
                </div>
                <div className='mb-2 pb-50'>
                  <h5>Mission</h5>
                  <span>{data.homepage_mission}</span>
                </div>
                <div className='mb-2 pb-50'>
                  <h5>Vision</h5>
                  <span>{data.homepage_vision}</span>
                </div>
                {data.homepage_about && (
                  <div className='mb-2 mb-md-1'>
                    <h5>Home Page Body</h5>
                    <span>{data.homepage_about}</span>
                  </div>
                )}
              </Col>
              <Col md='6'>
                <img
                  width='100%'
                  alt='user-avatar'
                  src={data.homepage_image}
                  className='img-fluid rounded mt-3 mb-2'
                />
              </Col>
              <Col xs={12}>
                <Button color='primary' className='me-1 mt-1' onClick={() => setShow(true)}>
                  Update
                </Button>
              </Col>
            </Row>
          ) : (
            <div>Loading...</div>
          )}
        </CardBody>
      </Card>

      <Modal
        isOpen={show}
        onClosed={onDiscard}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-4 mx-50'>
          <h1 className='address-title text-center mb-1'>Update HomePage</h1>
          <Row tag='form' className='gy-1 gx-2' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12}>
              <Label className='form-label' for='homepage_header'>
                Home Page Header
              </Label>
              <Controller
                name='homepage_header'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='homepage_header'
                    placeholder='Enter Home Page Header'
                    invalid={errors.homepage_header && true}
                    value={field.value || (data ? data.homepage_header : '')}
                  />
                )}
              />
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='homepage_mission'>
                Mission
              </Label>
              <Controller
                name='homepage_mission'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='homepage_mission'
                    placeholder='Enter Mission'
                    invalid={errors.homepage_mission && true}
                    value={field.value || (data ? data.homepage_mission : '')}
                  />
                )}
              />
            </Col>
            <Col xs={12} md={6}>
              <Label className='form-label' for='vision'>
                Vision
              </Label>
              <Controller
                name='vision'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='vision'
                    placeholder='Enter Vision'
                    invalid={errors.vision && true}
                    value={field.value || (data ? data.homepage_vision : '')}
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='body'>
                Home Page Body
              </Label>
              <Input
                type='textarea'
                id='body'
                placeholder='Enter Home Page Body'
                {...register('homepage_about')}
                value={data ? data.homepage_about : ''}
                onChange={(e) => setData({ ...data, homepage_about: e.target.value })}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='imageUrl'>
                HomePage Image URL
              </Label>
              <Input
                id='imageUrl'
                placeholder='Enter HomePage Image URL'
                {...register('imageUrl')}
                value={data ? data.homepage_image : ''}
                onChange={(e) => setData({ ...data, homepage_image: e.target.value })}
              />
            </Col>
            <Col className='text-center' xs={12}>
              <Button type='submit' className='me-1 mt-2' color='primary'>
                Submit
              </Button>
              <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default BillingCurrentPlan;
