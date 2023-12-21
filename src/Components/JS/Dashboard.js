import React from 'react'
import '../CSS/Dashboard.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaDollarSign } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi2";
import { ImCart } from "react-icons/im";
import { FaProductHunt } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <>
    <div className='dashboard-mainbox1'>
        <Row className='dasboard-m1b1-row1'>
            <Col className='dasboard-m1b1-col1'>
            <HiCurrencyDollar  className='dasboard-m1b1-col1-Icon'/>
              <p>Total Sales
              <br></br>
              <FaDollarSign />&nbsp;19,626.20
              </p>
            </Col>
            <Col className='dasboard-m1b1-col2'>
            <ImCart className='dasboard-m1b1-col2-Icon'/>
              <p>Total Orders
              <br></br>
              3290
              </p>
            </Col>
            <Col className='dasboard-m1b1-col3'>
            <FaProductHunt  className='dasboard-m1b1-col3-Icon'/>
              <p>Total Products
              <br></br>
              322
              </p>
            </Col>
        </Row>
        <Row className='dasboard-m1b1-row2'>
          <Col className='dasboard-m1b1-row2-col1 col-8'></Col>
          <Col className='dasboard-m1b1-row2-col2'></Col>
        </Row>
        <Row className='dasboard-m1b1-row3'>
            <Col className='dasboard-m1b1-row3-col1'></Col>
        </Row>
    </div> 
    </>
  )
}

export default Dashboard
