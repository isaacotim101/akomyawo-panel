import React from 'react';
import { Card } from 'react-bootstrap';
//import { NavLink, Link } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

//import { CopyToClipboard } from 'react-copy-to-clipboard';

import FirebaseLogin from './FirebaseLogin';

const Signin1 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <img src='https://africanhearts.vercel.app/_next/static/media/footer-logo.c853defe.jpg'/>
              </div>
              <FirebaseLogin />
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
