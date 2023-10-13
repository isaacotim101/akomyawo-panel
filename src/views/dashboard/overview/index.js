// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CompanyTable from './CompanyTable'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import UtilCard from '@src/views/ui-elements/cards/utilities/UtilsCard'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** vars
  const trackBgColor = '#e9ecef'

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='12' md='12' xs='12'>
          <UtilCard cols={{ xl: '2', sm: '6' }} />
        </Col>
      </Row>
      <Row className='match-height'>
      <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col>
        <Col lg='8' md='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='12'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardMeetup />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
