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
            <Link to={`/pages/blog/detail/12`}>
              <CardImg className='img-fluid' src={news.post_featured_image} alt={news.post_title} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/articles/detail/${news._id}`}>
                {news.post_title}
                </Link>
              </CardTitle>
              <div className='d-flex'>
                <div>
                  <small className='text-muted me-25'>By</small>
                  <small>
                    <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                    {news.post_auther}
                    </a>
                  </small>
                  <span className='text-muted ms-50 me-25'>|</span>
                  <small className='text-muted'>{news.post_created_at}</small>
                </div>
              </div>
              <CardText className='blog-content-truncate'  dangerouslySetInnerHTML={sanitizeHTML(news.post_description)} />
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link className='fw-bold' to={`/articles/detail/${news._id}`}>
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
