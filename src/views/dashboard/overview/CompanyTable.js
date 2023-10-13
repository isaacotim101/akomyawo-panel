// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card } from 'reactstrap'

// ** Icons Imports
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown } from 'react-feather'

// ** Icons Imports
import starIcon from '@src/assets/images/icons/star.svg'
import bookIcon from '@src/assets/images/icons/book.svg'
import brushIcon from '@src/assets/images/icons/brush.svg'
import rocketIcon from '@src/assets/images/icons/rocket.svg'
import toolboxIcon from '@src/assets/images/icons/toolbox.svg'
import speakerIcon from '@src/assets/images/icons/speaker.svg'
import parachuteIcon from '@src/assets/images/icons/parachute.svg'

const CompanyTable = () => {
  // ** vars

  const data = [
    {
      img: toolboxIcon,
      name: 'Dixons',
      email: 'meguc@ruj.io',
      icon: <Monitor size={18} />,
      category: 'Technology',
      views: '23.4k',
      time: '24 hours',
      revenue: '891.2'
    },
    {
      img: parachuteIcon,
      name: 'Motels',
      email: 'vecav@hodzi.co.uk',
      icon: <Coffee size={18} />,
      category: 'Grocery',
      views: '78k',
      time: '2 days',
      revenue: '668.51'
    },
    {
      img: brushIcon,
      name: 'Zipcar',
      email: 'davcilse@is.gov',
      icon: <Watch size={18} />,
      category: 'Fashion',
      views: '162',
      time: '5 days',
      revenue: '522.29'
    },
    {
      img: starIcon,
      name: 'Owning',
      email: 'us@cuhil.gov',
      icon: <Monitor size={18} />,
      category: 'Technology',
      views: '214',
      time: '24 hour',
      revenue: '291.01'
    },
    {
      img: bookIcon,
      name: 'Cafés',
      email: 'pudais@jife.com',
      icon: <Coffee size={18} />,
      category: 'Grocery',
      views: '208',
      time: '1 week',
      revenue: '783.93'
    },
    {
      img: rocketIcon,
      name: 'Kmart',
      email: 'bipri@cawiw.com',
      icon: <Watch size={18} />,
      category: 'Fashion',
      views: '990',
      time: '1 month',
      revenue: '780.05'
    },
    {
      img: speakerIcon,
      name: 'Payers',
      email: 'luk@izug.io',
      icon: <Watch size={18} />,
      category: 'Fashion',
      views: '12.9k',
      time: '12 hours',
      revenue: '531.49'
    }
  ]
  const colorsArr = {
    Technology: 'light-primary',
    Grocery: 'light-success',
    Fashion: 'light-warning'
  }

  const renderData = () => {
    return data.map(col => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className='text-success' />
      ) : (
        <TrendingDown size={15} className='text-danger' />
      )

      return (
        <tr key={col.name}>
          <td>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  <img src={col.img} alt={col.name} />
                </div>
              </div>
              <div>
                <div className='fw-bolder'>{col.name}</div>
                <div className='font-small-2 text-muted'>{col.email}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <Avatar className='me-1' color={colorsArr[col.category]} icon={col.icon} />
              <span>{col.category}</span>
            </div>
          </td>
          <td className='text-nowrap'>
            <div className='d-flex flex-column'>
              <span className='fw-bolder mb-25'>{col.views}</span>
              <span className='font-small-2 text-muted'>in {col.time}</span>
            </div>
          </td>
          <td>${col.revenue}</td>
        </tr>
      )
    })
  }

  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <tr>
            <th>Company</th>
            <th>Category</th>
            <th>Views</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
