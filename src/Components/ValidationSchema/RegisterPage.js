import * as yup from 'yup'

const passwordRule = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,16}$/;

export const RegisterSchema = yup.object().shape({
    firstname: yup.string().required("Required"),
    lastname: yup.string().required("Required"),
    email: yup.string().email("Enter Valid E-Mail").required("Required"),
    password: yup.string().min(5).matches(passwordRule,{message: "Please Create Strong Password"}).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password Must Match").required("Required"),
    // gender: yup.string().required("Required"),
    address: yup.string().required("Required"),
    phoneNumber: yup.string().required("A radio option is required"),
    company: yup.string().required("Required")
})