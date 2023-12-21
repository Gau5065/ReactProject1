import React from 'react'
import '../CSS/RegisterPage.css'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RegisterSchema } from '../ValidationSchema/RegisterPage';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { FaTwitter, FaVimeoSquare, FaFlickr, FaLinkedin, FaGooglePlusG, FaFacebookF,FaRss } from "react-icons/fa";
import { FaSkype } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";
import axios from 'axios';

const RegisterPage = () => {

  const RegisterUser = (values) =>{
      if(values.email != ""){
        console.log(values);
          // axios.post('https://react-batch.onrender.com/api/user/register', {
          //   "firstname": values.firstname, 
          //   "lastname": values.lastname, 
          //   "email": values.email, 
          //   "password": values.password, 
          //   "gender": values.gender, 
          //   "address": values.address, 
          //   "phoneNumber": values.phoneNumber, 		 
          //   "company": values.company
          // })
          // .then(function (response) {
          //   console.log(response);
          //   alert("Registered Successfully")
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
      }
  }
  return (
    <>
    <div className='register-mainbox1'>
        <div className='register-m1b1'>
        <div className="register-m1b11" title="Welcome To EasyShop">
            <div className="register-m1b11sb1"></div>
          </div>
          <div className="register-m1b12">
            <Row>
              <Col><FaTwitter className="register-icon"/></Col>
              <Col><FaVimeoSquare className="register-icon"/></Col>
              <Col><FaSkype className="register-icon"/></Col>
              <Col><FaFlickr className="register-icon"/></Col>
              <Col><FaLinkedin className="register-icon"/></Col>
              <Col><TfiYoutube className="register-icon"/></Col>
              <Col><FaGooglePlusG className="register-icon"/></Col>
              <Col><FaFacebookF className="register-icon"/></Col>
              <Col><FaRss className="register-icon"/></Col>
            </Row>
          </div>
        </div>
        <div className='register-m1b2'>
        <Formik
       initialValues={{ firstname: '', lastname: '', email:'', password:'', confirmPassword:'', gender:'', address:'', phoneNumber:'', company:'6567816a2d2aad1701c4a3c8' }}
       validationSchema={RegisterSchema}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           setSubmitting(false);
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
          className='register-inp1'
          placeholder='Enter First Name'
             type="text"
             name="firstname"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.firstname}
           /><br></br>
           {errors.firstname && touched.firstname && errors.firstname}<br></br>
           <input
           className='register-inp1'
           placeholder='Enter Last Name'
             type="text"
             name="lastname"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.lastname}
           /><br></br>
           {errors.lastname && touched.lastname && errors.lastname}<br></br>
           <input
           className='register-inp1'
           placeholder='Enter Your Email'
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           /><br></br>
           {errors.email && touched.email && errors.email}<br></br>
           <input
           className='register-inp1'
           placeholder='Enter Your Password'
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           /><br></br>
           {errors.password && touched.password && errors.password}<br></br>
           <input
           className='register-inp1'
           placeholder='Confirm Your Password'
             type="password"
             name="confirmPassword"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.confirmPassword}
           /><br></br>
           {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}<br></br>
           <p className='register-inp2'>
           <input
             type="radio"
             name="gender"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.gender}
            //  checked={values.gender === "Male"}
           />&nbsp; <label>Male</label> &nbsp;
           <input
             type="radio"
             name="gender"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.gender}
            //  checked={values.gender === "Female"}
           />&nbsp; <label>Female</label><br></br>
           {/* {errors.gender && errors.gender}<br></br> */}
           </p>
           <input
           className='register-inp1'
           placeholder='Enter Your Address'
             type="text"
             name="address"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.address}
           /><br></br>
           {errors.address && touched.address && errors.address}<br></br>
           <input
           className='register-inp1'
           placeholder='Enter Your Mobile Number'
             type="number"
             name="phoneNumber"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.phoneNumber}
           /><br></br>
           {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}<br></br>
           <input
           className='register-inp1'
           placeholder='Enter Your Company Name'
             type="text"
             name="company"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.company}
           /><br></br>
           {errors.company && touched.company && errors.company}<br></br>
           <button type="submit" disabled={isSubmitting} className='register-rbtn1' onClick={()=>RegisterUser(values)}>
             REGISTER
           </button><br></br>
           <Link to="/login"><button type='button' className='register-lbtn1'>Back To Login</button></Link>
         </form>
       )}
     </Formik>
        </div>
    </div>
    </>
  )
}

export default RegisterPage
