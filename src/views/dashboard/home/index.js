// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components
import Campaigns from './Campaigns'
import Projects from './Projects'
import TeamMembers from './Team'
import Success from './Success'
import NewsArticles from './Articles'
import Gallary from './Gallery'

const HomeDashboard = () => {
  return (
    <Fragment>
      <Row className='match-height'>
        <Col md='4'>
          <NewsArticles />
        </Col>
        <Col md='4'>
          <Campaigns />
        </Col>
        <Col md='4'>
          <Success />
        </Col>
        <Col md='4'>
          <Projects />
        </Col>
        <Col md='4'>
          <Gallary />
        </Col>
        <Col md='4'>
          <TeamMembers />
        </Col>
      </Row>
    </Fragment>
  )
}

export default HomeDashboard
