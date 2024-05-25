import { Avatar, Box, Text, useToast } from "@chakra-ui/react";
import Axios from "axios";
import React, { memo } from "react";
import { authUser } from "../components/Auth/auth";

const ChatList = ({ userList,onClose }) => {

    const [loading, setLoading] = useState(false);
    const toast=useToast()
    let { user, chat, setChat, selectedChat, setSelectedChat } = authUser()

    const accessChat = async (userId) => {
       try {
         setLoading(true)
         let url = 'api/user'
         let reqBody = {
             userId
         }
         let config = {
             headers: {
                 'Content-type': "application/json",
                 Authorization: `Bearer ${user.token}`
             }
         }
         const { data } = await Axios.post(url, reqBody, config)
         await setSelectedChat(data)
         await setLoading(false)
         await onClose()
       } catch (error) {
        await toast({
            title: 'Error occured!!!',
            description: `${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
       }

    }

    return <div >
        {
            userList?.map(user => {
                console.log("user", user);

                return <Box
                    key={user?._id}
                    onClick={() => accessChat(user?._id)}
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
                            // color={'teal.600'}
                            _hover={{
                                color: 'white',
                                background: 'teal.500',
                            }}
                            casing={'capitalize'}
                            fontWeight={'700'}>{user?.name}</Text>
                        <Text
                            // color={'teal.600'}
                            _hover={{
                                color: 'white',
                                background: 'teal.500',
                            }}
                            casing={'capitalize'}
                            fontWeight={'500'}
                            fontSize={'12px'}>{user?.email}</Text>
                    </div>
                </Box>
            })
        }

    </div>;
};

export default memo(ChatList);
