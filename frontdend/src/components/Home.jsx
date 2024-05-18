import React, { useState } from "react";
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";


const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return <>
    <Container maxW={'xl'} centerContent d="flex" alignContent={'center'} >
      <Box d={'flex'} w={'100%'} p={3} justifyContent={'center'} bg={'white'} mt={10} borderRadius={'md'} shadow={'6px 7px 10px black'} >
        <Text textAlign={'center'} casing={'uppercase'} letterSpacing={'5px'} fontWeight={'900'} fontSize={'larger'}>
          Chit Chat
        </Text>
      </Box>
      <Box mt={3} p={3} bg={'gray.100'} d={'flex'} w={'100%'} borderRadius={'md'} shadow={'6px 7px 10px black'}>
        <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant='solid-rounded' w={'100%'} colorScheme='teal' >
          <TabList w={'100%'} d={'flex'}  justifyContent={'center'} rowGap={10}>
            <Tab borderRadius={'md'} w={'50%'}>Login</Tab>
            <Tab borderRadius={'md'} w={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Login  setTabIndex={setTabIndex} />
            </TabPanel>
            <TabPanel>
             <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  </>;
};

export default Home;
