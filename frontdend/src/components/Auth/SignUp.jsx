import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import React from "react";
import CustomInput from "../common/CustomInput"
import { Formik, Form } from 'formik';
import { SignUpSchema } from "./schemas/SignUpSchema";
import CustomFileUpload from "../common/CustomFileUpload";

let initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  profile: ''
}

const SignUp = (props) => {

  let signUpObject = {
    name: {
      id: 'name',
      label: 'Name',
      isrequired: true,
      type: 'text'
    },
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
    confirmPassword: {
      id: 'confirmPassword',
      label: 'Confirm Password',
      isrequired: true,
      type: 'password'
    },
    profile: {
      type: 'file',
      id: 'profile',
      label: 'Profile',
      isrequired: true,
      accept:'image/*',
      allow:'image'
    }
  }

  return <>
    <Formik
      initialValues={initialState}
      validationSchema={SignUpSchema}
      onSubmit={(values, actions) => {
        console.log("values", values);

      }}
    >
      <Form>
        <VStack>
          <CustomInput field={signUpObject.name} />
          <CustomInput field={signUpObject.email} />
          <CustomInput field={signUpObject.password} />
          <CustomInput field={signUpObject.confirmPassword} />
          <CustomFileUpload field={signUpObject.profile} />
          <Button type="submit" bg="teal.600"
            color="white"
            _hover={{ bg: 'teal.700' }} mt={4} w={'100%'}>Register</Button>
        </VStack>
      </Form>
    </Formik>
  </>;
};

export default SignUp;
