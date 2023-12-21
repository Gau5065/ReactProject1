import React, { useEffect, useState } from "react";
import "../CSS/AdminPannel.css";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { MdDashboard, MdCategory, MdOutlineSupportAgent, MdOutlineArrowBackIosNew } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { Button } from "react-bootstrap";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Category from "./Category";
import Setting from "./Setting";
import Support from "./Support";

const AdminPannel = () => {
  const [ViewBtn, setViewBtn] = useState('small')
  const [ViewPage, setViewPage] = useState('dashboard')
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token');
      if(!token){
        navigate("/login")
      }
  }, [])

  const LogOut1 = () =>{
      localStorage.removeItem('token')
      window.location.href = "/login"
  }

  return (
    <>
    <div className="admin-mianbox1">
    {ViewBtn == 'small' && (
      <>
        <div className="admin-m1b1">
        <Button className="admin-m1b11" onClick={(a)=>setViewBtn('big')}>
          <PiShoppingCartDuotone className="admin-m1b11-icon"/>
        </Button>
        <div className="admin-m1b12">
          <Button className="admin-m1b12-btn" onClick={()=>setViewPage('dashboard')} title="Dashboard"><MdDashboard /></Button>
          <Button className="admin-m1b12-btn" onClick={()=>setViewPage('product')} title="Products"><FaShoppingCart /></Button>
          <Button className="admin-m1b12-btn" onClick={()=>setViewPage('category')} title="Category"><MdCategory /></Button>
        </div>
        <div className="admin-m1b13">
          <Button className="admin-m1b13-btn admin-m1b13-btn-m" onClick={()=>setViewPage('setting')} title="Setting"><IoMdSettings /></Button>
          <Button className="admin-m1b13-btn admin-m1b13-btn-m" onClick={()=>setViewPage('support')} title="Support"><MdOutlineSupportAgent /></Button>
          <Button className="admin-m1b13-btn" onClick={LogOut1} title="Logout"><TbLogout2 /></Button>
        </div>
      </div>
      </>
    )}
    {ViewBtn == 'big' && (
      <>
        <div className="admin-m1b3">
        <Button className="admin-m1b31" onClick={(a)=>setViewBtn('small')}>
        <MdOutlineArrowBackIosNew />
        </Button>
        <div className="admin-m1b32">
          <Button className="admin-m1b32-btn" onClick={()=>setViewPage('dashboard')}>Dashboard</Button>
          <Button className="admin-m1b32-btn" onClick={()=>setViewPage('product')}>Products</Button>
          <Button className="admin-m1b32-btn" onClick={()=>setViewPage('category')}>Category</Button>
        </div>
        <div className="admin-m1b33">
          <Button className="admin-m1b33-btn" onClick={()=>setViewPage('setting')}>Setting</Button>
          <Button className="admin-m1b33-btn" onClick={()=>setViewPage('support')}>Support</Button>
          <Button className="admin-m1b33-btn" onClick={LogOut1}>Logout</Button>
        </div>
      </div>
      </>
    )}
      <div className="admin-m1b2">
          {ViewPage == 'dashboard' && (
            <>
            <Dashboard/>
            </>
          )}
          {ViewPage == 'product' && (
            <>
            <Products/>
            </>
          )}
          {ViewPage == 'category' && (
            <>
            <Category/>
            </>
          )}
          {ViewPage == 'setting' && (
            <>
            <Setting/>
            </>
          )}
          {ViewPage == 'support' && (
            <>
            <Support/>
            </>
          )}
      </div>
    </div>
    </>
  );
};

export default AdminPannel;
