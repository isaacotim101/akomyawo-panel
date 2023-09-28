import React from 'react';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";

export default function App() {

  const { GetGallery } = useFetch();
  const { data: Gallery } = GetGallery();
  //const [search, setSearch] = useState('');
  return (
    <>
    <Link to={`/gallery/addgallery`} className="label theme-bg text-white f-12">
                      Add New Images
                      </Link>
      <MDBRow>
      {Gallery?.map((Gallery, index) => ( 
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0' key={index}>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
            <img src={Gallery.gallery_image} className='w-100' alt={Gallery.gallery_catergor} />
            <a href='/' style={{ cursor: 'pointer' }} >
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
          </div>
          <Card.Body>
        <Card.Text>
          {Gallery.gallery_catergor}
        </Card.Text>
        
                      <Link to={`/delete?id=${Gallery._id}&route=gallerys`} className="label theme-bg2 text-white f-12">
                      DELETE
                      </Link>
      </Card.Body>
        </MDBCol>
        ))}
      </MDBRow>

    </>
  );
}