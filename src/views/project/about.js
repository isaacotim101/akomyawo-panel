import React from 'react';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
//import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";
import { Row, Col, Card } from 'react-bootstrap';
export default function App() {

  const { GetAbout } = useFetch();
  const { data: About } = GetAbout();
  //const [search, setSearch] = useState('');
  return (
    <>
      
      <Row>
      {About?.map((About, index) => ( 
       <><Col md={6} xl={4}>
          <Link to="/#">
            <Card className="Recent-Users">
              <Link to="#">
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                  <img src={About.about_image} className='w-100' alt={About.about_header} />
                <Card.Text>{About.about_image_hint}</Card.Text>
                </div>
                </Card.Body>
              </Link>
            </Card>
          </Link>
        </Col><Col md={6} xl={8}>
            <Card>
                <Card.Body>
                <Card.Text>Header -About</Card.Text>
                <Card.Title>{About.about_header}</Card.Title>
                <Card.Text>Title -About</Card.Text>
                <Card.Title>{About.about_title}</Card.Title>
                <Card.Text>Descrition -About</Card.Text>
                <Card.Text>{About.about_body}</Card.Text>

        <Card.Text>
          {About.About_about}
        </Card.Text>
        <Link to={`/updateabout?id=${About._id}`} className="label theme-bg text-white f-12">
                      Update
                      </Link>
                </Card.Body>
            </Card>
          </Col></>
        ))}
      </Row>
    </>
  );
}