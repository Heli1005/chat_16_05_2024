import { Avatar, Box, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { authUser } from "../components/Auth/auth";
import  Axios  from "axios";

const SearchedChatList = ({ userList, onClose }) => {
    console.log("chat list called...");

    const [loading, setLoading] = useState(false);
    const toast = useToast()
    let { user, chats, setChats, selectedChat, setSelectedChat } = authUser()

    const accessChat = async (userId) => {
        try {
            setLoading(true)
            let url = 'api/chat'
            let reqBody = {
                userId
            }
            let config = {
                headers: {
                    'Content-type': "application/json",
                    'Authorization': `Bearer ${user.token}`
                }
            }
            const { data } = await Axios.post(url, reqBody, config)
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            await setSelectedChat(data)
            await onClose()
            await setLoading(false)
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
            })
        }
        <>
            {
                loading
                    ?
                    <Spinner color='teal.500' />
                    :
                    <></>
            }
        </>
    </div>;
};

export default SearchedChatList;
