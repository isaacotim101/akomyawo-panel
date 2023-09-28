import React from 'react';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import DOMPurify from 'dompurify'; // Import DOMPurify


//import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";
import { Row, Col, Card } from 'react-bootstrap';
export default function App() {

  const { GetBlogs } = useFetch();
  const { data: News } = GetBlogs();
  
  //const [search, setSearch] = useState('');
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  return (
    <>
       <Link to={`/News/addnews`} className="label theme-bg text-white f-12">
                      Add News Letter
                      </Link>
      <Row>
      {News?.map((News, index) => ( 
       <><Col md={6} xl={4}>
          <Link to="/#">
            <Card className="Recent-Users">
              <Link to="#">
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={News.post_featured_image} className='w-100' alt={News.post_title} />
                </div>
                </Card.Body>
              </Link>
            </Card>
          </Link>
        </Col><Col md={6} xl={8}>
            <Card>
                <Card.Body>
                <Card.Text>{News.post_title}</Card.Text>
                <Card.Text>Author: {News.post_auther} |Created At: {News.post_created_at}</Card.Text>
                <Card.Text dangerouslySetInnerHTML={sanitizeHTML(News.post_description)} />

        <Link to={`/news/update?id=${News._id}`} className="label theme-bg text-white f-12">
                      EDIT
                      </Link>
                      <Link to={`/delete?id=${News._id}&route=blogs`} className="label theme-bg2 text-white f-12">
                      DELETE
                      </Link>
                </Card.Body>
            </Card>
          </Col></>
        ))}
      </Row>
    </>
  );
}