import React from 'react';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";

export default function App() {

  const { GetBanner } = useFetch();
  const { data: Banner } = GetBanner();
  //const [search, setSearch] = useState('');
  console.log("banner", Banner)
  return (
    <>
      <MDBRow>
      {Banner?.map((Banner, index) => ( 
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0' key={index}>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
            <img src={Banner.image} className='w-100' />
            <a style={{ cursor: 'pointer' }} >
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
          </div>
          <Card.Body>
        <Card.Title>{Banner.name}</Card.Title>
        <Card.Text>
          {Banner.description}
        </Card.Text>
        <Link to={`/Banner/delete?id=${Banner._id}`} className="label theme-bg2 text-white f-12">
                        Delete
                      </Link>
      </Card.Body>
        </MDBCol>
        ))}
      </MDBRow>

    </>
  );
}