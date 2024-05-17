import React from "react";
import { Formik, Form } from 'formik';
import { LoginSchema } from "./schemas/LoginSchema";
import { Button, Text, VStack, Link } from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";
import { Link as RouterLink } from "react-router-dom";


let initialState = {
  email: '',
  password: '',
}

const Login = (props) => {
  
  let signUpObject = {
    email: {
      id: 'email',
      label: 'Email',
      isrequired: true,
      type: 'text'
    },
    password: {
      id: 'password',
      label: 'Password',
      isrequired: true,
      type: 'password'
    },
  }
  
  return <>
    <Formik
      initialValues={initialState}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        console.log("values", values);

      }}
    >
      <Form>
        <VStack>
          <CustomInput field={signUpObject.email} />
          <CustomInput field={signUpObject.password} />
          <Button type="submit" bg="teal.600"
            color="white"
            _hover={{ bg: 'teal.700' }} mt={4} w={'100%'}>Login</Button>
          <Text textAlign={'end'} w={'100%'} mt={5}>
            {`Don't have account? `}
            <Link onClick={() => props.setTabIndex(1)} color="teal.500">
              Sign up
            </Link>
          
          </Text>
        </VStack>
      </Form>
    </Formik>
  </>;
};

export default Login;
