// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, Button, CardBody, CardText, CardTitle } from 'reactstrap'


import { Award, CheckSquare } from 'react-feather'

// ** Styles
import '@styles/base/pages/page-pricing.scss'

const Projects = () => {
  const [successCount, setSuccessCount] = useState(0); // State to store the campaign count

  useEffect(() => {
    // Fetch data from the API
    fetch('https://african-hearts-api.vercel.app/api/v1/projects')
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
          <CheckSquare className='font-large-2 mb-1' />
          <CardTitle tag='h5'>Success Projects</CardTitle>
          <CardText>Success Projects of the Organisation can be added, edited, and deleted under this section.</CardText>
          <h1 color='primary'>{successCount} Projects</h1>
          <Link className='blog-title-truncate text-body-heading' to={`/projects`}>
          <Button color='primary'>
            Open
          </Button>
          </Link>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Projects
