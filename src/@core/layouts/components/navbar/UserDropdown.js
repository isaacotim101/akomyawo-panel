import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Avatar from '@components/avatar';
import { Power } from 'react-feather';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import avatar from '@src/assets/images/logo/logo.jpg'
const UserDropdown = () => {
  // ** Store Vars
  // const dispatch = useDispatch(); // You can add this back if needed

  // ** State
  const [userData, setUserData] = useState(null);

  // Use an effect to fetch and set user data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('userDetails');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData.user);
    }
  }, []); // The empty array makes this effect run only once on component mount

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{userData ? userData.userName : ''}</span>
          <span className='user-status'>{userData ? userData.userRole : ''}</span>
        </div>
        <Avatar img={avatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/login'>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

export default UserDropdown;
