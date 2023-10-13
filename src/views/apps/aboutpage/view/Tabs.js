// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { Lock, Bookmark, Home } from 'react-feather'

// ** User Components
import AboutPage from './AboutPage'
import HomePage from './HomePage'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <Home className='font-medium-3 me-50' />
            <span className='fw-bold'>Home Page</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>About Page</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <HomePage />
        </TabPane>
        <TabPane tabId='2'>
          <AboutPage />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
