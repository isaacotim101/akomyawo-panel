import React, { useEffect, useState } from 'react';
import AvatarGroup from '@components/avatar-group';
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { MoreVertical, Edit, Trash } from 'react-feather';
import { Link } from 'react-router-dom';

const TableBasic = () => {
  // Define state to store the fetched data
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    // Make a GET request to fetch data from the API
    fetch('https://african-hearts-api.vercel.app/api/v1/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        // Update the state with the fetched data
        setProjectData(responseData.users);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>displayName</th>
          <th>Email</th>
          <th>Username</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projectData.map((project) => (
          <tr key={project._id}>
            <td>
              <img className='me-75' src={project.avatar} alt={project.displayName} height='20' width='20' />
              <span className='align-middle fw-bold'>{project.displayName}</span>
            </td>
            <td>{project.email}</td>
            <td>
            {project.email}
            </td>
            <td>
              <Badge pill color='light-primary' className='me-1'>
                {project.role}
              </Badge>
            </td>
            <td>
              <UncontrolledDropdown>
                <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href='/' onClick={(e) => e.preventDefault()}>
                  <Link to={`/delete?id=${project._id}&route=users`}>
                    <Trash className='me-50' size={15} /> <span className='align-middle'>Delete</span>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableBasic;
