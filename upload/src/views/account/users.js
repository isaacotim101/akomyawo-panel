import React, { useState } from "react";
import { Row, Col, Card, Table, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFetch } from "../../hooks/useSWR";

const Users = () => {
  const { GetUsers } = useFetch();
  const { data: Users } = GetUsers();
  const [search, setSearch] = useState('');
  const formatTimestamp = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    return date.toLocaleString(); // Use this for a default format, you can customize it further
  };
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Search  by Name" aria-label="search" aria-describedby="basic-addon1"  onChange={(e) => setSearch(e.target.value)} />
              </InputGroup>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>IMG</th>
                    <th>NAME</th>	
                    <th>USERNAME</th>	
                    <th>ROLE</th>	
                    <th>EMAIL</th>	
                    <th>CREATED AT</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                {Users?.filter((users) => {
                return search.toLowerCase() === ''
                  ? users
                  : users.displayName.toLowerCase().includes(search);
              })
              .map((users, index) => (
                  <tr className="unread" key={index}>
                  <td><img  className="rounded-circle" style={{ width: '40px' }}  src={users.avatar} /></td>
                  <td>
                    <h6 className="mb-1">{users.displayName}</h6>
                  </td>
                  <td>
                  <h6 className="m-1">{users.username}</h6>
                  </td>
                  <td>
                  <h6 className="m-1">{users.role}</h6>
                  </td>
                    <td>
                      <h6 className="mb-1">{users.email}</h6>
                    </td>
                    <td>
                    <h6 className="m-1">{formatTimestamp(users.created_at)}</h6>
                    </td>
                    <td>
                      <Link to={`/users/delete?id=${users._id}`} className="label theme-bg2 text-white f-12">
                        Delete
                      </Link>
                      <Link to={`/users/update?id=${users._id}`} className="label theme-bg text-white f-12">
                        Update
                      </Link>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Users;
