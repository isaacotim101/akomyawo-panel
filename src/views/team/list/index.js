// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
//import Pic from 'https://res.cloudinary.com/dw90vkmoc/image/upload/v1687554830/slider5_qzhkuc.jpg';
// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import { Grid, CheckSquare, MessageSquare, Mail, Calendar } from 'react-feather'
import { useFetch } from "../../../hooks/useSWR";


// ** Custom Components
import Sidebar from '../BlogSidebar'
import Pic from '../../../assets/images/slider/03.jpg'
import Breadcrumbs from '@components/breadcrumbs/Team'

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
  PaginationLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import DOMPurify from 'dompurify'; // Import DOMPurify
const BlogList = () => {
  const { GetTeams } = useFetch();
  const { data: Team } = GetTeams();
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
    return Team?.map((team, index) => {
      return (
        <Col md='6'>
          <Card>
            <CardImg className='img-fluid' src={team.team_image} alt="The Best Features Coming to iOS and Web design" top />
            <CardBody>
              <CardTitle tag='h4'>
                {team.team_names}
              </CardTitle>
              <p>{team.team_leadership}</p>
              <CardText className='blog-content-truncate'  dangerouslySetInnerHTML={sanitizeHTML(team.team_bio)} />
              <hr />
              <div className='d-flex'>
                <div>
                  <small><Badge
                className={classnames('me-50')}
                color='light-info'
                pill
              >
                Twitter:{team.team_twitter}
              </Badge></small>
                  <span className='text-muted ms-50 me-25'>|</span>
                  <small className='text-muted'><Badge
                className={classnames('me-50')}
                color='light-warning'
                pill
              >
                Facebook:{team.team_facebook}
              </Badge></small>
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color='primary' className='btn-icon btn-round dropdown-toggle'>
                    <Grid size={14} /> Actions
                  </DropdownToggle>
                  <DropdownMenu tag='ul' end>
                    <DropdownItem tag={Link} to={`/team/edit/${team._id}`}>
                      <CheckSquare className='me-1' size={14} />
                      <span className='align-middle'>Edit</span>
                    </DropdownItem>
                    <DropdownItem tag={Link} to={`/delete?id=${team._id}&route=teams`}>
                      <MessageSquare className='me-1' size={14} />
                      <span className='align-middle'>Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Breadcrumbs data={[{ title: 'Team Members' }]} />
      <div className='blog-wrapper'>
          <div className='content-body'>
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>
                
              </div>
          </div>
      </div>
    </Fragment>
  )
}

export default BlogList
