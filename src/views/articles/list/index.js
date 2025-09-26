// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
//import Pic from 'https://res.cloudinary.com/dw90vkmoc/image/upload/v1687554830/slider5_qzhkuc.jpg';
// ** Third Party Components
import { useFetch } from "../../../hooks/useSWR";


// ** Custom Components
import Sidebar from '../BlogSidebar'
import Breadcrumbs from '@components/breadcrumbs/Articles'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import DOMPurify from 'dompurify'; // Import DOMPurify

const BlogList = () => {
  const { GetBlogs } = useFetch();
  const { data: News } = GetBlogs();
  // ** States
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  const badgeColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }
  const renderRenderList = () => {
    return News?.map((news, index) => {
      return (
        <Col md='6'>
          <Card>
            <Link to={`/articles/detail/${news.id}`}>
              <CardImg className='img-fluid' src={news.image_url} alt={news.title} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/articles/detail/${news.id}`}>
                {news.title}
                </Link>
              </CardTitle>
              <CardText className='blog-content-truncate'  dangerouslySetInnerHTML={sanitizeHTML(news.content)} />
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link className='fw-bold' to={`/articles/detail/${news.id}`}>
                  Read More
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Breadcrumbs data={[{ title: 'Articles' }]} />
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>
                
              </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  )
}

export default BlogList
