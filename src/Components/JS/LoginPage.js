import React from "react";
import "../CSS/LoginPage.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { LoginSchema } from "../ValidationSchema/LoginPage";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { FaTwitter, FaVimeoSquare, FaFlickr, FaLinkedin, FaGooglePlusG, FaFacebookF,FaRss } from "react-icons/fa";
import { FaSkype } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-mainbox1">
        <div className="login-m1b1">
          <div className="login-m1b11" title="Welcome To EasyShop">
            <div className="login-m1b11sb1"></div>
          </div>
          <div className="login-m1b12">
            <Row>
              <Col><FaTwitter className="login-icon"/></Col>
              <Col><FaVimeoSquare className="login-icon"/></Col>
              <Col><FaSkype className="login-icon"/></Col>
              <Col><FaFlickr className="login-icon"/></Col>
              <Col><FaLinkedin className="login-icon"/></Col>
              <Col><TfiYoutube className="login-icon"/></Col>
              <Col><FaGooglePlusG className="login-icon"/></Col>
              <Col><FaFacebookF className="login-icon"/></Col>
              <Col><FaRss className="login-icon"/></Col>
            </Row>
          </div>
        </div>
        <div className="login-m1b2">
          <div className="login-m1b21">
            <p>Welcome</p>
            <h3>User Login</h3>
          </div>
          <div className="login-m1b22">
            <Formik
              initialValues={{ email: "gaurav@gmail.com", password: "gaurav@11223" }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                  axios.post('https://react-batch.onrender.com/api/user/login',{
                    "email": values.email, 
                    "password": values.password
                  })
                  .then(function (response) {
                    // console.log(response.data.token);
                    localStorage.setItem("token", response.data.token)
                    navigate("/admin")
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    className="login-inp1"
                    placeholder="Email or Username"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <br></br>
                  {errors.email && touched.email && errors.email}
                  <br></br>
                  <input
                    className="login-inp2"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <br></br>
                  {errors.password && touched.password && errors.password}
                  <br></br>
                  <p className="login-inp3">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remeber"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    &nbsp; <label htmlFor="remember">Remember Me</label>
                  </p>
                  <a href="#" target="_blank">
                    <button type="button" className="login-fbtn1">
                      Forgot Password ?
                    </button>
                  </a>
                  <br></br>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="login-lbtn1"
                  >
                    LOGIN
                  </button>
                  <br></br>
                  <Link target="_blank" to="/register">
                    <button type="button" className="login-cbtn1">
                      Create Account
                    </button>
                  </Link>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
