// ** React Imports
import { Fragment } from 'react'

// ** Billing Components
import BillingAddress from './BillingAddress'
import BillingCurrentPlan from './BillingCurrentPlan'

const BillingTab = () => {
  return (
    <Fragment>
      <BillingCurrentPlan />
      <BillingAddress />
    </Fragment>
  )
}

export default BillingTab
