// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs/Users'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import TableWithButtons from './TableWithButtons'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Users' data={[{ title: 'Accounts' }]} />
      <Row>
         <Col sm='12'>
          <TableWithButtons />
        </Col>
         </Row>
    </Fragment>
  )
}

export default Tables
