import { Fragment, useState, useEffect } from 'react';
import {
  Card,
  Button,
  CardBody,
  CardText,
  CardTitle,
} from 'reactstrap';
import { Gift } from 'react-feather';
import { Link } from 'react-router-dom'

const Campaigns = () => {
  const [campaignCount, setCampaignCount] = useState(0); // State to store the campaign count

  useEffect(() => {
    // Fetch data from the API
    fetch('https://african-hearts-api.vercel.app/api/v1/campaigns')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of campaigns
        const count = data.length;
        setCampaignCount(count); // Update the state with the count
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Fragment>
      <Card>
        <CardBody className='text-center'>
          <Gift className='font-large-2 mb-1' />
          <CardTitle tag='h5'>Compaigns and Fundraising</CardTitle>
          <CardText>Organisation Compaigns and Fundraising programs can be added, edited, and deleted under this section.</CardText>
          <h1 color='primary'>{campaignCount} Campaigns</h1>
          <Link className='blog-title-truncate text-body-heading' to={`/compaigns`}>
          <Button color='primary'>
            Open
          </Button>
          </Link>
                
        </CardBody>
      </Card>
    </Fragment>
  );
}

export default Campaigns;
