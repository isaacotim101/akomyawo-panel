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

  const { GetCampaign } = useFetch();
  const { data: campaigns } = GetCampaign();
  //const [search, setSearch] = useState('');
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  return (
    <>
      <Link to={`/addcampaigns`} className="label theme-bg text-white f-12">
                      Create New
                      </Link>
      <Row>
      {campaigns?.map((campaigns, index) => ( 
       <><Col md={6} xl={4}>
          <Link to="/#">
            <Card className="Recent-Users">
              <Link to="#">
                <Card.Body>
                <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
                <img src={campaigns.image} className='w-100' alt={campaigns.title} />
                </div>
                </Card.Body>
              </Link>
            </Card>
          </Link>
        </Col><Col md={6} xl={8}>
            <Card>
                <Card.Body>
                <Card.Text>{campaigns.title}</Card.Text>
                <Card.Text dangerouslySetInnerHTML={sanitizeHTML(campaigns.body)} />


        <Link to={`/campaigns/update?id=${campaigns._id}`} className="label theme-bg text-white f-12">
                      EDIT
                      </Link>
                      <Link to={`/delete?id=${campaigns._id}&route=campaigns`} className="label theme-bg2 text-white f-12">
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