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
    fetch('https://african-hearts-api.vercel.app/api/v1/about/646d2a38a17fc20ce91171ea')
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
      about_header: '',
      about_title: '',
      about_body: '',
      homepage_about: '',
      about_image: '',
      about_image_hint: '',
    },
  });

  const onSubmit = (formData) => {
    // Make a PUT request to update the data with formData
    fetch('https://african-hearts-api.vercel.app/api/v1/about/646d2a38a17fc20ce91171ea', {
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
          <CardTitle tag='h4'>About Page</CardTitle>
        </CardHeader>
        <CardBody>
          {data ? (
            <Row>
              <Col md='6'>
                <div className='mb-2 pb-50'>
                  <h5>About Page Header</h5>
                  <span>{data.about_header}</span>
                </div>
                <div className='mb-2 pb-50'>
                  <h5>Title</h5>
                  <span>{data.about_title}</span>
                </div>
                <div className='mb-2 pb-50'>
                  <h5>Body</h5>
                  <span>{data.about_body}</span>
                </div>
                  <div className='mb-2 mb-md-1'>
                    <h5>Image Hint</h5>
                    <span>{data.about_image_hint}</span>
                  </div>
              </Col>
              <Col md='6'>
                <img
                  width='100%'
                  alt='user-avatar'
                  src={data.about_image}
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
          <h1 className='address-title text-center mb-1'>Update About Page</h1>
          <Row tag='form' className='gy-1 gx-2' onSubmit={handleSubmit(onSubmit)}>
            <Col md={12}>
              <Label className='form-label' for='about_header'>
                About Page Header
              </Label>
              <Controller
                name='about_header'
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id='about_header'
                    placeholder='Enter Home Page Header'
                    invalid={errors.about_header && true}
                    value={field.value || (data ? data.about_header : '')}
                  />
                )}
              />
            </Col>
            <Col md={12}>
              <Label className='form-label' for='about_title'>
                Title
              </Label>
              <Controller
                name='about_title'
                control={control}
                render={({ field }) => (
                  <Input
                  type='textarea'
                    {...field}
                    id='about_title'
                    placeholder='Enter Mission'
                    invalid={errors.about_title && true}
                    value={field.value || (data ? data.about_title : '')}
                  />
                )}
              />
            </Col>
            <Col md={12}>
              <Label className='form-label' for='about_body'>
                Body
              </Label>
              <Controller
                name='about_body'
                control={control}
                render={({ field }) => (
                  <Input
                  type='textarea'
                    {...field}
                    id='about_body'
                    placeholder='Enter Body COntent here'
                    invalid={errors.about_body && true}
                    value={field.value || (data ? data.about_body : '')}
                  />
                )}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='body'>
                Image Hint
              </Label>
              <Input
                id='body'
                placeholder='Enter Home Page Body'
                {...register('about_image_hint')}
                value={data ? data.about_image_hint : ''}
                onChange={(e) => setData({ ...data, about_image_hint: e.target.value })}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='about_image'>
                HomePage Image URL
              </Label>
              <Input
                id='about_image'
                placeholder='Enter HomePage Image URL'
                {...register('about_image')}
                value={data ? data.about_image : ''}
                onChange={(e) => setData({ ...data, about_image: e.target.value })}
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
