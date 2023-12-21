import * as yup from 'yup'

export const EditProductSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    price: yup.number().positive().required("Required"),
    discountedPrice: yup.number().positive().lessThan(yup.ref('price'), 'Discount Price must be lower than MRP'),
    imgUrl: yup.string().required("Required")
})