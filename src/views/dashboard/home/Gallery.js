// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Reactstrap Imports
import { Card, Button, CardBody, CardText, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom'


import { Award, Camera, CheckSquare } from 'react-feather'

// ** Styles
import '@styles/base/pages/page-pricing.scss'

const Gallary = () => {
  const [successCount, setSuccessCount] = useState(0); // State to store the campaign count

  useEffect(() => {
    // Fetch data from the API
    fetch('https://african-hearts-api.vercel.app/api/v1/gallerys')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of success
        const count = data.length;
        setSuccessCount(count); // Update the state with the count
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  return (
    <Fragment>
      <Card>
        <CardBody className='text-center'>
          <Camera className='font-large-2 mb-1' />
          <CardTitle tag='h5'>Gallery</CardTitle>
          <CardText>Organisation Images to be added under gallery section of the website can be added and deleted under this section.</CardText>
          <h1 color='primary'>{successCount} Gallaries</h1>
          <Link className='blog-title-truncate text-body-heading' to={`/gallery`}>
          <Button color='primary'>
            Open
          </Button>
          </Link>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Gallary
