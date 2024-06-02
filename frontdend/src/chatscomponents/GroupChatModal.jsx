import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react";
// import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/common/CustomInput";
import CustomInuputWithForm from "../components/common/CustomInuputWithOutForm";
import { authUser } from "../components/Auth/auth";
import Axios from "axios";
import SingleChatUI from "./SingleChatNameUI";
import SingleSearchUserUI from "./SingleSearchUserUI";
import UserBadge from "./UserBadge";

const GroupChatModal = ({ children }) => {

    let initialState = {
        chatName: '',
        users: []
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [chatName, setChatName] = useState('');
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const { user, handleLogOut, chats, setChats } = authUser()

    const submitGroup = async (obj) => {
        if (!chatName) {
            await toast({
                title: 'Chat name is required',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        } else if (selectedUser?.length < 2) {
            await toast({
                title: 'More than 2 users required to create group',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        try {
            let url = '/api/chat/group'

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            let req = {
                name: chatName,
                users: JSON.stringify(selectedUser?.map(u => u._id))
            }
            let { data } = await Axios.post(url, req, config)


            await setChats([data, ...chats])

            await toast({
                title: 'Successfully created group chat!!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            await onClose()

        } catch (error) {
            await toast({
                title: 'Failed to create group chat!!',
                description: `${error.response.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }


    }

    const handleSelected = async (user) => {
        setSelectedUser([...selectedUser, user])

    }
    let groupChat = {
        chatName: {
            id: 'chatName',
            label: 'Group Name',
            isrequired: true,
            type: 'text'
        },
        user: {
            id: 'user',
            label: 'User',
            isrequired: true,
            type: 'text'

        }
    }

    const handleSearch = async (query) => {

        setSearch(query)
        let url = 'api/user'
        let username = query ? `?search=${query}` : ''
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        if (!query) {
            return;
        }
        setLoading(true)
        try {
            const { data } = await Axios.get(`${url}${username}`, config)
            setSearchResult(data)

        } catch (error) {
            await toast({
                title: 'Error occured!!!',
                description: "Failed to load search result",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setLoading(false)
    }

    const handleDelete = async (id) => {
        let tempUserList = selectedUser?.filter(obj => obj._id !== id)
        setSelectedUser(tempUserList)
    }

    return <>
        <span onClick={onOpen}>
            {children}
        </span>

        <Modal size={'sm'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={'3px'} bg={'gray.100'}>
                <ModalHeader borderRadius={'7px'} display={'flex'} alignItems={'center'} fontWeight={'700'} bg={'teal'} color={"white"} p={4} justifyContent={'center'} fontSize={'larger'} >
                    <Text >Create Group Chat</Text>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <VStack>
                        <CustomInuputWithForm field={groupChat.chatName} handleChange={setChatName} value={chatName} />
                        <CustomInuputWithForm field={groupChat.user} handleChange={handleSearch} value={search} />
                        <Box display={'flex'} w={'100%'} flexWrap={'wrap'} >
                            {
                                selectedUser?.map(user => {
                                    return <UserBadge key={user._id} user={user} handleDelete={handleDelete} />
                                })
                            }
                        </Box>
                        <div style={{ width: '100%' }}>
                            {
                                loading
                                    ?
                                    <Text color={'teal.600'} textAlign={'center'}  >Loading...</Text>
                                    :
                                    searchResult?.length > 0
                                        ?
                                        searchResult?.map(user => {
                                            return <SingleSearchUserUI handleClick={(e) => handleSelected(user)} key={user._id} user={user} />
                                        })
                                        :
                                        <Text color={'teal.600'} textAlign={'center'}  >No User Exist</Text>
                            }
                        </div>
                    </VStack>
                </ModalBody>

                <ModalFooter  >
                    <Button type="submit" onClick={() => submitGroup()} colorScheme='teal'  >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >

    </>
};

export default GroupChatModal;
