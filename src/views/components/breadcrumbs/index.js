// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Third Party Components
import Prism from 'prismjs'

// ** Demo Components
//import BreadCrumbStyles from './BreadcrumbStyles'
//import BreadcrumbsDefault from './BreadcrumbsDefault'
//import BreadCrumbsPage from '@components/breadcrumbs'
//import BreadCrumbAlignment from './BreadcrumbAlignment'

// ** Custom Components
import Card from '@components/card-snippet'

// ** Reactstrap Imports
import { Row, Col, CardText } from 'reactstrap'

// ** Source Code
import { breadcrumbsAlignment, breadcrumbsDefault, breadcrumbsStyles } from './BreadCrumbsSourceCode'

const BreadCrumbs = () => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Fragment>

      <Row>
        <Col sm='12'>
          <section id='component-breadcrumbs'>
            <Card title='Default' code={breadcrumbsDefault}>
            </Card>
            <Card title='Styles' code={breadcrumbsStyles}>
              <CardText>
                These breadcrumbs are only for demo puropses. You can change breadcrumb seprator by changing{' '}
                <code>$breadcrumb-divider</code> variable value in scss
              </CardText>
            </Card>
          </section>
        </Col>
        <Col sm='12'>
          <section id='breadcrumb-alignment'>
            <Card title='Alignment' code={breadcrumbsAlignment}>
              <CardText>
                Use class <code>.justify-content-{'{position}'}</code> to align breadcrumb to desired position.
              </CardText>
            </Card>
          </section>
        </Col>
      </Row>
    </Fragment>
  )
}
export default BreadCrumbs
