// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
// ** Third Party Components
import {
  Grid,
  Delete,
  Edit
} from 'react-feather'

// ** Utils

// ** Custom Components
import Sidebar from '../BlogSidebar'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'
import DOMPurify from 'dompurify'; // Import DOMPurify
// ** Images

const BlogDetails = () => {
    const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  // ** State
  const [data, setData] = useState(null);
  // Use useParams to get the id from the URL
  const { id } = useParams();
  useEffect(() => {
    // Make a GET request to the API endpoint using fetch
    fetch(`https://ako-api.vercel.app/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((responseData) => {
        // Check if the responseData is not null
        if (responseData) {
          setData(responseData);
        } else {
        }
      })
      .catch((error) => {
      });
  }, [id]);

  return (
    <Fragment>
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            <Row>
              <Col sm='12'>
                <Card className='mb-3'>
                  {data && (
                    <>
                      <CardImg src={data.image_url} className='img-fluid' top />
                      <CardBody>
                        <CardTitle tag='h4'>{data.title}</CardTitle>
                        
                        <div  dangerouslySetInnerHTML={sanitizeHTML(data.content)} />

                        <hr className='my-2' />
                        <div className='d-flex align-items-center justify-content-between'>
                          <UncontrolledDropdown className='dropdown-icon-wrapper'>
                            <DropdownToggle color='primary' className='btn-icon btn-round dropdown-toggle'>
                              <Grid size={21} /> More Actions
                            </DropdownToggle>
                            <DropdownMenu end>
                              <DropdownItem className='py-50 px-1'>
                              <Link to={`/delete?id=${data.id}&route=blogs`}>
                              <Delete size={18} /> Delete
                             </Link>
                              </DropdownItem>
                              <DropdownItem className='py-50 px-1'>
                              <Link className='fw-bold' to={`/articles/edit/${id}`}>
                              <Edit size={18} /> Edit
                              </Link>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </CardBody>
                    </>
                  )}
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default BlogDetails;