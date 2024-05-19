import React from "react";
import { Formik, Form } from 'formik';
import { LoginSchema } from "./schemas/LoginSchema";
import { Button, Text, VStack, Link, Image } from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";
import signin from "../../assets/signin.svg";

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
    <Image src={signin} h={'170px'} w={'170px'} mx={'auto'} my={'5'} border={'3px solid white'} p={2} borderRadius={'80%'} shadow={'3px 3px 7px black'} />
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
