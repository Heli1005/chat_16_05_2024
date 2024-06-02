import { Button, FormControl, FormLabel, Image, Input, VStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomInput from "../common/CustomInput"
import { Formik, Form } from 'formik';
import { SignUpSchema } from "./schemas/SignUpSchema";
import CustomFileUpload from "../common/CustomFileUpload";
import signin from "../../assets/signup.svg";
import Axios from "axios";

let initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  profile: '',
  imageId: '',
  signupLoading: false
}

const SignUp = (props) => {

  const toast = useToast()

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
      accept: 'image/*',
      allow: 'image'
    }
  }
  const handleRegister = async (req) => {

    try {
      delete req['signupLoading']
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      let res = await Axios.post('/api/user', {
        ...req, config
      })
      console.log("res", res);


      await toast({
        title: 'User created successfully',
        description: "We've created your account for you.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      await props.setTabIndex(0)
    } catch (error) {
      console.log("error", error);

      await toast({
        // title:`${}`,
        title: `${error.response.data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return <>
    <Image src={signin} h={'150px'} w={'150px'} mx={'auto'} my={'5'} border={'3px solid white'} p={0} borderRadius={'80%'} shadow={'3px 3px 7px black'} />

    <Formik
      initialValues={initialState}
      validationSchema={SignUpSchema}
      onSubmit={(values, actions) => {

        let tempObj = { ...values }
        handleRegister(tempObj)

      }}
    >
      {
        ({ setFieldValue, values }) => (

          <Form>
            <VStack>
              <CustomInput field={signUpObject.name} />
              <CustomInput field={signUpObject.email} />
              <CustomInput field={signUpObject.password} />
              <CustomInput field={signUpObject.confirmPassword} />
              <CustomFileUpload field={signUpObject.profile} setFieldValue={setFieldValue} />
              <Button type="submit" bg="teal.600" isLoading={values['signupLoading'] || false}
                color="white"
                _hover={{ bg: 'teal.700' }} mt={4} w={'100%'}>Register</Button>
            </VStack>
          </Form>
        )
      }
    </Formik>
  </>;
};

export default SignUp;
