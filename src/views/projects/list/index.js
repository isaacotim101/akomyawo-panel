// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
// ** Third Party Components
import DOMPurify from 'dompurify'; // Import DOMPurify

import { useFetch } from "../../../hooks/useSWR";


// ** Custom Components
import Sidebar from '../BlogSidebar'
import Breadcrumbs from '@components/breadcrumbs/Campaigns'

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

const BlogList = () => {
  const { GetCampaign } = useFetch();
  const { data: Campaigns } = GetCampaign();
  // ** States
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const renderRenderList = () => {
    return Campaigns?.map((campaigns, index) => {
      return (
        <Col md='6'>
          <Card>
            <Link to={`/projects/detail/${campaigns.id}`}>
              <CardImg className='img-fluid' src={campaigns.image_url} alt="The Best Features Coming to iOS and Web design" top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/projects/detail/${campaigns.id}`}>
                {campaigns.title}
                </Link>
              </CardTitle>
              <CardText className='blog-content-truncate'  dangerouslySetInnerHTML={sanitizeHTML(campaigns.content)} />
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link className='fw-bold' to={`/projects/detail/${campaigns.id}`}>
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
      <Breadcrumbs data={[{ title: 'Compaigns' }]} />
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
