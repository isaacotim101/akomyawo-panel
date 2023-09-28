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

  const { GetProject } = useFetch();
  const { data: Projects } = GetProject();
  //const [search, setSearch] = useState('');
    // Define a function to sanitize HTML content
    const sanitizeHTML = (html) => {
      return { __html: DOMPurify.sanitize(html) };
    };
  return (
    <>
      <Link to={`/Projects/addprojects`} className="label theme-bg text-white f-12">
                      Create New
                      </Link>
      <Row>
      {Projects?.map((Projects, index) => ( 
       <><Col md={6} xl={4}>
          <Link to="/#">
            <Card className="Recent-Users">
              <Link to="#">
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={Projects.image} className='w-100' alt={Projects.title} />
                </div>
                </Card.Body>
              </Link>
            </Card>
          </Link>
        </Col><Col md={6} xl={8}>
            <Card>
                <Card.Body>
                <Card.Text>{Projects.title}</Card.Text>
                <Card.Text dangerouslySetInnerHTML={sanitizeHTML(Projects.body)} />
                

        <Link to={`/Projects/update?id=${Projects._id}`} className="label theme-bg text-white f-12">
                      EDIT
                      </Link>
                      <Link to={`/delete?id=${Projects._id}&route=projects`} className="label theme-bg2 text-white f-12">
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