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

  const { GetSuccess } = useFetch();
  const { data: Success } = GetSuccess();
  //const [search, setSearch] = useState('');
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  return (
    <>
      <Link to={`/Stories/addstories`} className="label theme-bg text-white f-12">
                      Create New Success Stories
                      </Link>
      <Row>
      {Success?.map((Success, index) => ( 
       <><Col md={6} xl={4}>
          <Link to="/#">
            <Card className="Recent-Users">
              <Link to="#">
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={Success.image} className='w-100' alt={Success.title} />
                </div>
                </Card.Body>
              </Link>
            </Card>
          </Link>
        </Col><Col md={6} xl={8}>
            <Card>
                <Card.Body>
                <Card.Text>{Success.title}</Card.Text>
                <Card.Text dangerouslySetInnerHTML={sanitizeHTML(Success.description)} />

        <Link to={`/stories/update?id=${Success._id}`} className="label theme-bg text-white f-12">
                      EDIT
                      </Link>
                      <Link to={`/delete?id=${Success._id}&route=success`} className="label theme-bg2 text-white f-12">
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