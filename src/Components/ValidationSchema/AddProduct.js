import * as yup from 'yup'

export const ProductSchema = yup.object().shape({
    productName: yup.string().required("Required"),
    productDescription: yup.string().required("Required"),
    price: yup.number().positive().required("Required"),
    discountedPrice: yup.number().positive().required("Required")
})