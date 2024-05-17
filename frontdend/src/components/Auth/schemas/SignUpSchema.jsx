import * as Yup from "yup";

export const SignUpSchema=Yup.object(
    {
        name: Yup.string().min(2,'Name must be at least 2 characters').max(25).required('Required'),
        email: Yup.string().email().required('Required'),
        password:Yup.string().min(6).required('Required'),
        confirmPassword: Yup.string().min(6).oneOf([Yup.ref('password'), null], 'Not matched').required('Required'),
        profile: Yup.string(),
    }
)