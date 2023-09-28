import React from 'react';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";

export default function App() {

  const { GetTeams } = useFetch();
  const { data: Team } = GetTeams();
  //const [search, setSearch] = useState('');
  return (
    <>
    <Link to={`/addteam`} className="label theme-bg text-white f-12">
                      Add New Team Member
                      </Link>
      <MDBRow>
      {Team?.map((Team, index) => ( 
        <MDBCol lg={4} md={12} className='mb-4 mb-lg-0' key={index}>
          <div className='bg-image hover-overlay ripple shadow-1-strong rounded'>
            <img src={Team.team_image} className='w-100' alt={Team.team_names} />
            <a href='/' style={{ cursor: 'pointer' }} >
              <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
            </a>
          </div>
          <Card.Body>
        <Card.Title>{Team.team_names}</Card.Title>
        <Card.Text>
          {Team.team_bio}
        </Card.Text>
        <Card.Text>
          Twitter:{Team.team_twitter}
        </Card.Text>
        <Card.Text>
          Facebook:{Team.team_facebook}
        </Card.Text>
        <Link to={`/teams/update?id=${Team._id}`} className="label theme-bg text-white f-12">
                      EDIT
                      </Link>
                      <Link to={`/delete?id=${Team._id}&route=teams`} className="label theme-bg2 text-white f-12">
                      DELETE
                      </Link>
      </Card.Body>
        </MDBCol>
        ))}
      </MDBRow>

    </>
  );
}