import React from 'react';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";

export default function App() {

  const { GetSchool } = useFetch();
  const { data: Partner } = GetSchool();
  //const [search, setSearch] = useState('');
  return (
    <>
      <MDBRow>
      {Partner?.map((Partner, index) => ( 
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0' key={index}>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
            <img src={Partner.image} className='w-100' />
            <a style={{ cursor: 'pointer' }} >
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
          </div>
          <Card.Body>
        <Card.Title>{Partner.title}</Card.Title>
        <Card.Text>
          {Partner.description}
        </Card.Text>
        <Card.Text>
          {Partner.slug}
        </Card.Text>
        <Link to={`/Partner/delete?id=${Partner._id}`} className="label theme-bg2 text-white f-12">
                        Delete
                      </Link>
                      <Link to={`/Partner/update?id=${Partner._id}`} className="label theme-bg text-white f-12">
                        Update
                      </Link>
      </Card.Body>
        </MDBCol>
        ))}
      </MDBRow>

    </>
  );
}