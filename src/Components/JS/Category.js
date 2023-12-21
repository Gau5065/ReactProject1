import React, { useEffect, useState } from 'react'
import '../CSS/Category.css'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { Formik } from 'formik';

const Category = () => {
  const [CategoryList, setCategoryList] = useState([])
  const [AddCategoryInp, setAddCategoryInp] = useState('none')
  const [ViewModal, setViewModal] = useState('none')
  const [CategoryEditId, setCategoryEditId] = useState()
  const token = localStorage.getItem('token')
  useEffect(()=>{
    getCategories();
  }, [])


   const getCategories = () =>{
    axios.get('https://react-batch.onrender.com/api/products/get-categories/', {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    })
    .then(function (response) {
      // console.log(response.data.data);
      setCategoryList(response.data.data)
    })
   }
  const AddNewCategory = (values) =>{
    var count1 = 0;
    var count2 = 0;
    if(values.category != ""){
      // console.log(values)
      CategoryList.map((category, index)=>{
          count1++;
          if(category.name.toLowerCase() != values.category.toLowerCase()){
            count2++;
          }
      })
      if(count1 == count2){
        axios.post('https://react-batch.onrender.com/api/products/add-category', {
          category: values.category,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          // console.log(response);
          setAddCategoryInp('none')
          getCategories();
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        alert(values.category+" is Already Exists Please Enter Different Category")
      }
    }else{
      alert("Please Enter Category First")
    }
      
  }


  const EditCategoryName = (category) =>{
    setViewModal('block')
    // console.log(category)
    setCategoryEditId(category._id)
  }

  const closeModal = () =>{
    setViewModal('none')
  }

  const ModalEditCategory = (values) =>{
    var count1 = 0;
    var count2 = 0;
      if(values.editCategory != ""){
          CategoryList.map((category, index)=>{
            count1++;
            if(category.name.toLowerCase() != values.editCategory.toLowerCase()){
              count2++;
            }
          })
          if(count1 == count2){
            axios.put('https://react-batch.onrender.com/api/products/edit-category/'+CategoryEditId, {
              "category": values.editCategory
            },{
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            })
              .then((response) => {
                // console.log(response.data);
                setViewModal('none')
              })
              .catch((error) => {
                console.error(error);
              });
          }else{
            alert("Category Name Already Exists")
          }
      }else{
        alert("Input Is Empty")
      }
  }
  return (
    <>
    {ViewModal == 'block' && (
      <>
        <div className='main-modal'>
      <div className='modal-body'>
      <Formik
       initialValues={{ editCategory: '' }}
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
           className='Edit-Category-Inp'
             type="text"
             name="editCategory"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.editCategory}
           /><br></br>
           <button type="submit" disabled={isSubmitting} className='Edit-Category-Btn' onClick={()=>ModalEditCategory(values)}>
             EDIT
           </button>
           <button type='button' className='Edit-Category-Btn' onClick={closeModal}>CANCEL</button>
         </form>
       )}
     </Formik>
      </div>
    </div>
      </>
    )}
    
    <div className='category-mainbox1'>
      {
        CategoryList.map((category, index)=>{
          return(
            <Button className='category-btn1' key={index + category} onClick={()=>EditCategoryName(category)}>{category.name}</Button>
          )
        })
      }  
    </div>
    <div className='category-mainbox2'>
    <Button className='add-category-btn1' onClick={()=>setAddCategoryInp('block')}><FaPlus /> Add New Category</Button> 
    {AddCategoryInp == 'block' && (
      <>
          <div className='add-category-box1'>
    <Formik
       initialValues={{ category: '' }}
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
       }) => (
         <form onSubmit={handleSubmit}>
           <input
           className='add-category-inp1'
             type="text"
             name="category"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.category}
           />
           <br></br>
           <button type="submit" disabled={isSubmitting} className='add-category-btn2' onClick={()=>AddNewCategory(values)}>
             ADD
           </button>
           <button className='add-category-btn2' onClick={()=>setAddCategoryInp('none')}>CANCEL</button>
         </form>
       )}
     </Formik>
    </div>
    </>
    )}
    </div>
    </>
  )
}

export default Category
