// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
//import Pic from 'https://res.cloudinary.com/dw90vkmoc/image/upload/v1687554830/slider5_qzhkuc.jpg';
// ** Third Party Components

import { useFetch } from "../../../hooks/useSWR";


// ** Custom Components
import Sidebar from '../BlogSidebar'
import Breadcrumbs from '@components/breadcrumbs/Stories'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import DOMPurify from 'dompurify'; // Import DOMPurify

const BlogList = () => {
  const { GetSuccess } = useFetch();
  const { data: Stories } = GetSuccess();
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
    return Stories?.map((stories, index) => {
      return (
        <Col md='6'>
          <Card>
            <Link to={`/stories/detail/12`}>
              <CardImg className='img-fluid' src={stories.image} alt="The Best Features Coming to iOS and Web design" top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/stories/detail/${stories._id}`}>
                {stories.title}
                </Link>
              </CardTitle>
              <CardText className='blog-content-truncate'  dangerouslySetInnerHTML={sanitizeHTML(stories.description)} />
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link className='fw-bold' to={`/stories/detail/${stories._id}`}>
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
      <Breadcrumbs data={[{ title: 'Success Stories' }]} />
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
