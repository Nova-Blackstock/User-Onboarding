import * as yup from 'yup'
import { isValidElement } from 'react'

const formSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, "Usernames must be at least 3 characters.")
        .required("Username is Required"),
    email: yup
        .string()
        .email("Must be a valid email address.")
        .required("Must include email address."),
    password: yup
        .string()
            .min(10, "Passwords must use at least 10 characters."),
    // term: yup
    //     .boolean()
    //         .oneOf(['accept'], "Agreement required")
    //         .required('Must agree to terms of Service')
})

export default formSchema