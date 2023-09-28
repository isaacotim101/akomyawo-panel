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

  const { GetHomepage } = useFetch();
  const { data: Homepage } = GetHomepage();
  //const [search, setSearch] = useState('');
  return (
    <>
      
      <Row>
      {Homepage?.map((Homepage, index) => ( 
       <><Col md={6} xl={4}>
          <Link to="/#">
            <Card className="Recent-Users">
              <Link to="#">
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                  <img src={Homepage.homepage_image} className='w-100' alt={Homepage.homepage_header} />
                <Card.Text>Homepage Image</Card.Text>
                </div>
                </Card.Body>
              </Link>
            </Card>
          </Link>
        </Col><Col md={6} xl={8}>
            <Card>
                <Card.Body>
                <Card.Text><strong>Title -Homepage</strong></Card.Text>
                <Card.Title>{Homepage.homepage_header}</Card.Title>
                <Card.Text><strong>About -Homepage</strong></Card.Text>
        <Card.Text>
          {Homepage.homepage_about}
        </Card.Text>
        <Card.Text><strong>Mission</strong></Card.Text>
                <Card.Text>{Homepage.homepage_mission}</Card.Text>
                <Card.Text><strong>Vision</strong></Card.Text>
        <Card.Text>
          {Homepage.homepage_mission}
        </Card.Text>
        <Link to={`/updatehome?id=${Homepage._id}`} className="label theme-bg text-white f-12">
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