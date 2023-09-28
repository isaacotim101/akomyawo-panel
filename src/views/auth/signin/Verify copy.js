import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
//
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
//
const SignUp1 = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
  
    function onCaptchVerify() {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => {},
          },
          auth
        );
      }
    }
  
    function onSignup() {
      setLoading(true);
      onCaptchVerify();
  
      const appVerifier = window.recaptchaVerifier;
  
      const formatPh = "+" + ph;
  
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sended successfully!");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  
    function onOTPVerify() {
      setLoading(true);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          console.log(res);
          setUser(res.user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
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
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <Card.Body className="text-center">
                  <div className="mb-4">
                    <i className="feather icon-phone-call auth-icon" />
                  </div>
                  <h3 className="mb-4">OTP Verification</h3>
                  <label>
                      Enter your Mobile Number ending with <Link to="#"> Newsletter</Link> to verify.
                    </label>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Username" />
                  </div>
                  <button className="btn btn-primary mb-4">Send Code</button>
                  <p className="mb-2">
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;
