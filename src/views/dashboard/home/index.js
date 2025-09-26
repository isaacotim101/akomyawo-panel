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
        <Col md='6'>
          <NewsArticles />
        </Col>
        <Col md='6'>
          <Gallary />
        </Col>
      </Row>
    </Fragment>
  )
}

export default HomeDashboard
