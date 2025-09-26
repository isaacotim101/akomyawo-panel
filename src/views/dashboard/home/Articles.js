import { Fragment, useState, useEffect } from 'react';
import {
  Card,
  Button,
  CardBody,
  CardText,
  CardTitle,
} from 'reactstrap';
import { FileText } from 'react-feather';
import { Link } from 'react-router-dom'

const NewsArticles = () => {
  const [articleCount, setArticleCount] = useState(0); // State to store the article count

  useEffect(() => {
    // Fetch data from the API
    fetch('https://ako-api.vercel.app/posts')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response has a property 'count' that represents the article count
        const count = data.length;
        setArticleCount(count); // Update the state with the count
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Fragment>
      <Card>
        <CardBody className='text-center'>
          <FileText className='font-large-2 mb-1' />
          <CardTitle tag='h5'>Blog Articles</CardTitle>
          <CardText>Blog articles of the Organisation can be added, edited, and deleted under this section.</CardText>
          <h1 color='primary'>{articleCount} Articles</h1>
          
          <Link className='blog-title-truncate text-body-heading' to={`/articles`}>
          <Button color='primary'>
            Open
          </Button>
          </Link>
                
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NewsArticles;
