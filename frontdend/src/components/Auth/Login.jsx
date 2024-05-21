import React from "react";
import { Formik, Form } from 'formik';
import { LoginSchema } from "./schemas/LoginSchema";
import { Button, Text, VStack, Link, Image, useToast } from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";
import signin from "../../assets/signin.svg";
import { Link as RouterLink } from "react-router-dom";
import Axios from "axios";
import useLocalStore from "../common/useLocalStore";
import { authUser } from "./auth";


let initialState = {
  email: '',
  password: '',
  loading: false

}

const Login = (props) => {

  const toast = useToast()
  const auth = authUser()
  const [user, setUser] = useLocalStore('user', {})

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

  const handleLogin = async (req) => {

    try {
      delete req['loading']
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      let res = await Axios.post('/api/user/login', {
        ...req, config
      })
      console.log("res", res);

      await toast({
        title: 'Login successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      // await setUser( res.data)
      await auth.handleLogin(res.data)

    } catch (error) {
      await toast({
        title: `${error.response.data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return <>
    <Image src={signin} h={'170px'} w={'170px'} mx={'auto'} my={'5'} border={'3px solid white'} p={2} borderRadius={'80%'} shadow={'3px 3px 7px black'} />
    <Formik
      initialValues={initialState}
      validationSchema={LoginSchema}
      onSubmit={async (values, actions) => {

        await actions.setFieldValue('loading', true)
        
        await handleLogin(values)
        await actions.setFieldValue('loading', false)
      }}
    >
      {
        ({ setFieldValue, values }) => (
          <Form>
            <VStack>
              <CustomInput field={signUpObject.email} />
              <CustomInput field={signUpObject.password} />
              <Button type="submit" bg="teal.600" isLoading={values['loading'] || false}
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
        )
      }

    </Formik>
  </>;
};

export default Login;
