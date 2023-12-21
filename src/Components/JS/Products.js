import { useEffect, useState } from "react";
import { Formik } from "formik";
import "../CSS/Products.css";
import { Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { RiArrowGoBackFill } from "react-icons/ri";
import { ProductSchema } from "../ValidationSchema/AddProduct";
import { FaRupeeSign } from "react-icons/fa";
import { FaPercentage, FaStar } from "react-icons/fa";
import { EditProductSchema } from "../ValidationSchema/EditProduct";
import TextTruncate from "react-text-truncate";

const Products = () => {
  const [ViewProduct, setViewProduct] = useState("productlist");
  const [ProductList, setProductList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [ViewAddBtn, setViewAddBtn] = useState("block");
  const [ProductDetails, setProductDetails] = useState({});
  const [SelectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    //Category List
    axios
      .get("https://react-batch.onrender.com/api/products/get-categories/", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        // console.log(response.data.data);
        setCategoryList(response.data.data);
      });

    //ProductList
    axios
      .post(
        "https://react-batch.onrender.com/api/products/products-list/",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response.data.data);
        setProductList(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const AddProductBtn1 = () => {
    setViewProduct("addproduct");
    setViewAddBtn("none");
  };

  const BackProductBtn = () => {
    setViewAddBtn("block");
    setViewProduct("productlist");
  };

  const AddNewProduct = (values) => {
    const token = localStorage.getItem("token");
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    if (values.productName != "") {
      ProductList.map((product) => {
        count1++;
        if (values.productName.toLowerCase() != product.name.toLowerCase()) {
          count2++;
        }
      });
      if (count1 == count2) {
        // console.log("New Product");
        axios
          .post(
            "https://react-batch.onrender.com/api/products/add-product",
            {
              name: values.productName,
              description: values.productDescription,
              price: values.price,
              discountedPrice: values.discountedPrice,
              imageUrl: values.imgUrl,
              category: values.productCategory,
            },
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            // console.log(response.data.data);
            alert("Product Added Successfully");
            setViewProduct("productlist");
            setViewAddBtn("block");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // console.log("Old Product");


        ProductList.map((product) => {
          count3++;
          if (
            values.productCategory.toLowerCase() !=
            product.category.toLowerCase()
          ) {
            count4++;
          }
        });
        if (count3 == count4) {
          // console.log("New Category");
          axios
            .post(
              "https://react-batch.onrender.com/api/products/add-product",
              {
                name: values.productName,
                description: values.productDescription,
                price: values.price,
                discountedPrice: values.discountedPrice,
                imageUrl: values.imgUrl,
                category: values.productCategory,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
              }
            )
            .then(function (response) {
              // console.log(response.data.data);
              alert("Product Added Successfully");
              setViewProduct("productlist");
              setViewAddBtn("block");
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          // console.log("Old Category");
          alert(
            "Product Already Exists Please Change Product Name or Category"
          );
        }
      }
    }
  };

  const getProductData = (product) => {
    console.log(product);
    setViewProduct("productDetails");
    setViewAddBtn("none");
    setProductDetails(product);
  };
  const EditProductBackBtn = () => {
    setViewProduct("productlist");
    setViewAddBtn("block");
  };

  const EditProductDetails = (values) => {
    const token = localStorage.getItem("token");
    if (values.category != "") {
      axios
            .put(
              "https://react-batch.onrender.com/api/product/" +
                ProductDetails._id,
              {
                name: values.name,
                description: values.description,
                price: values.price,
                discountedPrice: values.discountedPrice,
                imageUrl: values.imageUrl,
                category: values.category,
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              // console.log(response.data);
              alert("Product Updated Successfully");
              setViewProduct("productlist");
              setViewAddBtn("block");
            })
            .catch((error) => {
              console.error(error);
            });
    } else {
      alert("Please Select Category");
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  };

  return (
    <>
      {ViewAddBtn == "block" && (
        <>
          <Button className="AddProduct-Btn" onClick={AddProductBtn1}>
            <FaPlus />
            &nbsp;Add New Product
          </Button>
        </>
      )}
      {ViewProduct == "productlist" && (
        <>
          <div className="ProductList-NavBar">
            <div className="NavBar1">
              <select className="NavBar2-Inp1" onChange={handleCategoryChange}>
                <option value="">Category</option>
                {
                  CategoryList.map((category, index)=>{
                    return(
                      <option value={category._id} key={index + category}>{category.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="NavBar2">
              <input type="search" className="NavBar2-Inp2" placeholder="Search Here"/>
            </div>
            <div className="NavBar3">
            <select className="NavBar2-Inp3">
                <option value="">Sort By</option>
                <option value="">Price High-Low</option>
                <option value="">Price Low-High</option>
                <option value="">Top Deals</option>
              </select>
            </div>
          </div>
          <div className="ProductList-Mainbox1">
            {ProductList.map((product, index) => {
              var DiscountPrice = product.price - product.discountedPrice;
              var DiscountPercentage = (DiscountPrice / product.price) * 100;
              var Discount = parseInt(DiscountPercentage);
              return (
                <div
                  className="product-card"
                  key={index + product}
                  onClick={() => getProductData(product)}
                >
                  {/* <div className="discount-badge"></div> */}

                  <div className="ribbon">
                    <span>
                      {Discount}
                      <FaPercentage />
                      OFF
                    </span>
                  </div>

                  <div className="product-img">
                    <img
                      src={product.imageUrl}
                      height="100%"
                      width="100%"
                      className="product-imgUrl"
                      alt="Product Image"
                    />
                  </div>
                  <div className="product-detail">
                    <p className="Product-Name">
                      <TextTruncate
                        text={product.name}
                      />
                    </p>
                    <p className="Product-DiscountedPrice">
                      <sup>
                        <FaRupeeSign />
                      </sup>
                      &nbsp;{product.discountedPrice}
                    </p>
                    <p className="Product-Price">
                      <FaStar className="RateStar1" />
                      <FaStar className="RateStar2" />
                      <FaStar className="RateStar3" />
                      <FaStar className="RateStar4" />
                      <FaStar className="RateStar5" />
                      MRP: Rs.{product.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {ViewProduct == "productDetails" && (
        <>
          <Button className="EditProduct-BackBtn" onClick={EditProductBackBtn}>
            <RiArrowGoBackFill />
            &nbsp;Back
          </Button>
          <div className="EditProduct-mainbox1">
            <Formik
              initialValues={{
                name: ProductDetails.name,
                description: ProductDetails.description,
                price: ProductDetails.price,
                discountedPrice: ProductDetails.discountedPrice,
                imageUrl: ProductDetails.imageUrl,
                category: ProductDetails.category,
              }}
              validationSchema={EditProductSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
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
                    placeholder="Enter Product Name"
                    className="EditProduct-Inp"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <br></br>
                  {errors.name && touched.name && errors.name}
                  <br></br>
                  <input
                    placeholder="Enter Product Description"
                    className="EditProduct-Inp"
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <br></br>
                  {errors.description &&
                    touched.description &&
                    errors.description}
                  <br></br>
                  <select
                    className="EditProduct-Select"
                    name="category"
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    value={values.category}
                  >
                    <option value="">--Select Category--</option>
                    {CategoryList.map((category, index) => {
                      return (
                        <option key={index + category} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <br></br> <br></br>
                  <input
                    placeholder="Enter Product Price"
                    className="EditProduct-Inp"
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                  <br></br>
                  {errors.price && touched.price && errors.price}
                  <br></br>
                  <input
                    placeholder="Enter Discounted Price"
                    className="EditProduct-Inp"
                    type="number"
                    name="discountedPrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discountedPrice}
                  />
                  <br></br>
                  {errors.discountedPrice &&
                    touched.discountedPrice &&
                    errors.discountedPrice}
                  <br></br>
                  <input
                    placeholder="Enter Image Url"
                    className="EditProduct-Inp"
                    type="text"
                    name="imageUrl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.imageUrl}
                  />
                  <br></br>
                  {errors.imageUrl && touched.imageUrl && errors.imageUrl}
                  <br></br>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="EditProduct-Btn1"
                    onClick={() => EditProductDetails(values)}
                  >
                    Edit Product
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </>
      )}
      {ViewProduct == "addproduct" && (
        <>
          <Button onClick={BackProductBtn} className="AddProductBack-Btn">
            <RiArrowGoBackFill />
            &nbsp;Back
          </Button>
          <div className="AddProduct-mainbox1">
            <Formik
              initialValues={{
                productName: "",
                productDescription: "",
                price: "",
                discountedPrice: "",
                imgUrl: "",
                productCategory: "",
              }}
              validationSchema={ProductSchema}
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
                    placeholder="Enter Product Name"
                    className="AddProduct-Inp"
                    type="text"
                    name="productName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productName}
                  />
                  <br></br>
                  {errors.productName &&
                    touched.productName &&
                    errors.productName}
                  <br></br>
                  <select
                    className="AddProduct-Select"
                    name="productCategory"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productCategory}
                  >
                    <option value="0">--Select Category--</option>
                    {CategoryList.map((category, index) => {
                      return (
                        <option
                          value={category._id}
                          key={index + category}
                          className="AddProduct-Option"
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  <br></br>
                  <br></br>
                  <input
                    placeholder="Enter Product Description"
                    className="AddProduct-Inp"
                    type="text"
                    name="productDescription"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.productDescription}
                  />
                  <br></br>
                  {errors.productDescription &&
                    touched.productDescription &&
                    errors.productDescription}
                  <br></br>
                  <input
                    placeholder="Enter Product Price"
                    className="AddProduct-Inp"
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                  <br></br>
                  {errors.price && touched.price && errors.price}
                  <br></br>
                  <input
                    placeholder="Enter Product Discounted Price"
                    className="AddProduct-Inp"
                    type="number"
                    name="discountedPrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.discountedPrice}
                  />
                  <br></br>
                  {errors.discountedPrice &&
                    touched.discountedPrice &&
                    errors.discountedPrice}
                  <br></br>
                  <input
                    placeholder="Enter Image Url"
                    className="AddProduct-Inp"
                    type="text"
                    name="imgUrl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.imgUrl}
                  />
                  <br></br>
                  {errors.imgUrl && touched.imgUrl && errors.imgUrl}
                  <br></br>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="AddProduct-Btn1"
                    onClick={() => AddNewProduct(values)}
                  >
                    ADD PRODUCT
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
