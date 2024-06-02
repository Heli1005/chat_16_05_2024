import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

const SingleSearchUserUI = ({ user, handleClick }) => {
  return <>
      <Box
          key={user?._id}
          onClick={() => handleClick(user?._id)}
          bg={'gray.200'}
          px={2}
          py={3}
          my={2}
          _hover={{
              color: 'white',
              background: 'teal.500',
          }}
          borderRadius={7}
          display={'flex'}
          justifyContent={'space-start'}
          alignItems={'center'}
          gap={2}
          color={'teal.600'}
          cursor={'pointer'}
      >
          <Avatar size={'sm'} cursor={"pointer"} name={user?.name} src={user?.profile} />
          <div>
              <Text
                  _hover={{
                      color: 'white',
                      background: 'teal.500',
                  }}
                  casing={'capitalize'}
                  fontWeight={'700'}>{user?.name}</Text>
              <Text
                  _hover={{
                      color: 'white',
                      background: 'teal.500',
                  }}
                  casing={'capitalize'}
                  fontWeight={'500'}
                  fontSize={'12px'}>{user?.email}</Text>
          </div>
      </Box>
  </>;
};

export default SingleSearchUserUI;
