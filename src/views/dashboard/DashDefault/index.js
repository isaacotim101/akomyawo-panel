//import React from 'react';
import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { useFetch } from "../../../hooks/useSWR";
import axios from 'axios';
const DashDefault = () => {
  
  //const { GetFiltered } = useFetch();
  //const { data: Txns } = GetFiltered();

  const [newsLength, setNewsLength] = useState('');
  const [successLength, setSuccessLength] = useState('');
  const [projectsLength, setProjectsLength] = useState('');
  const [galleryLength, setGalleryLength] = useState('');
  const [campaignsLength, setCampaignsLength] = useState('');
  const [teamLength, setOutTeamLength] = useState('');

  function getnewsLength() {
    return axios.get('https:african-hearts-api.vercel.app/api/v1/blogs');
  }
  function getsuccessLength() {
    return axios.get('https:african-hearts-api.vercel.app/api/v1/success');
  }
  
  function getprojectsLength() {
    return axios.get('https:african-hearts-api.vercel.app/api/v1/projects');
  }
  function getgalleryLength() {
    return axios.get('https:african-hearts-api.vercel.app/api/v1/gallerys');
  }
    function getcampaignsLength() {
    return axios.get('https:african-hearts-api.vercel.app/api/v1/campaigns');
  }
  function getteamLength() {
    return axios.get('https:african-hearts-api.vercel.app/api/v1/teams');
  }
  
  Promise.all([getnewsLength(), getsuccessLength(), getprojectsLength(), getgalleryLength(), getcampaignsLength(), getteamLength() ])
    .then(function (results) {
      const news = results[0];
      const success = results[1];
      const projects = results[2];
      const gallery = results[3];
      const campaigns = results[4];
      const team = results[5];

      
      setNewsLength(news.data.length);
      setSuccessLength(success.data.length);
      setProjectsLength(projects.data.length);
      setGalleryLength(gallery.data.length);
      setCampaignsLength(campaigns.data.length);
      setOutTeamLength(team.data.length);

    });

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={4}>
          <Card>
          <Link to="/news">
          <Card.Body>
              <h6 className="mb-4">News Letters</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  <img alt='img' src='https://res.cloudinary.com/dw90vkmoc/image/upload/v1686775714/newsletter_qagap7.png' width="30%" />
                  {newsLength} Articles
                  </h3>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Link>
            
          </Card>
        </Col>
        <Col md={6} xl={4}>
            <Link to="/Campaigns">
          <Card>
            <Card.Body>
              <h6 className="mb-4">Campaigns and Fundraising</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  <img alt='img' src='https://res.cloudinary.com/dw90vkmoc/image/upload/v1686775714/donation_nhxr7u.png' width="30%" />
                    {campaignsLength} Campaigns
                  </h3>
                </div>

              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme2"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="35"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
            </Link>
        </Col>
        <Col xl={4}>
            <Link to="/stories">
          <Card>
            <Card.Body>
              <h6 className="mb-4">Success Stories</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  <img alt='img' src='https://res.cloudinary.com/dw90vkmoc/image/upload/v1686775717/growth_yoo01v.png' width="30%" />{successLength} Stories
                  </h3>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
            </Link>
        </Col>
        <Col xl={4}>
            <Link to="/projects">
          <Card>
            <Card.Body>
              <h6 className="mb-4">Successful Projects</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  <img alt='img' src='https://res.cloudinary.com/dw90vkmoc/image/upload/v1686775714/briefing_jppxon.png' width="30%" />{projectsLength} Projects
                  </h3>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
            </Link>
        </Col>
        <Col xl={4}>
            <Link to="/gallery">
          <Card>
            <Card.Body>
              <h6 className="mb-4">Gallery Images</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  <img alt='img' src='https://res.cloudinary.com/dw90vkmoc/image/upload/v1686776200/gallery_ikb4ll.png' width="30%" />{galleryLength} Images
                  </h3>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
            </Link>
        </Col>
        <Col xl={4}>
            <Link to="/teams">
          <Card>
            <Card.Body>
              <h6 className="mb-4">Team Members</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                  <img alt='img' src='https://res.cloudinary.com/dw90vkmoc/image/upload/v1686775718/leader_neajdw.png' width="30%" />{teamLength} Staff
                  </h3>
                </div>
              </div>
              <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '100%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            </Card.Body>
          </Card>
            </Link>
        </Col>
       
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
