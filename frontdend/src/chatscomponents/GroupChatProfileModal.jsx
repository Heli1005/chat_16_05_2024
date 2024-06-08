import { Box, Button, Divider, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { authUser } from "../components/Auth/auth";
import CustomInputGroup from "../components/common/CustomInputGroup";
import Axios from "axios";
import { DeleteIcon, SpinnerIcon } from "@chakra-ui/icons";
import ConfirmationModal from "../components/common/ConfirmationModal";
import CustomInuputWithForm from "../components/common/CustomInuputWithOutForm";
import SingleSearchUserUI from "./SingleSearchUserUI";

const GroupChatProfileModal = ({ children, toggleFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [chatName, setChatName] = useState("");
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const { user, selectedChat, setSelectedChat } = authUser()
    const [groupRenameLoading, setGroupRenameLoading] = useState(false);
    const [addRemoveUserLoading, setAddRemoveUserLoading] = useState();

    const toast = useToast()
    console.log("selectedChat", selectedChat);

    const addLoader = async (key, val) => {
        let temp = { ...addRemoveUserLoading }
        if (val) {
            temp[key] = val
        } else {
            delete temp[key]
        }
        await setAddRemoveUserLoading(temp)
    }

    let chatObj = {
        chatName: {
            id: 'chatName',
            label: 'Group Name',
            isrequired: true,
            type: 'text',
            disabled: false
        }
    }

    useEffect(() => {
        setChatName(selectedChat.chatName)
        return () => {
            setChatName('')
        }
    }, [selectedChat])

    const handleAddDeleteUser = async (id, action = 'remove') => {
        await addLoader(action, true)
        try {
            let req = {
                chatId: selectedChat._id,
                userId: id
            }
            let url = `/api/chat/group/${action}`
            let config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            let { data } = await Axios.put(url, req, config)
            await setSelectedChat(data)
            await toggleFetchAgain()
            await setSearchResult([])
            if(user._id===id &&action==='remove'){
                await onClose()
            }

        } catch (error) {
            await toast({
                title: 'Error occured!!!',
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        await addLoader(action, false)
    }

    const renameGroup = async () => {
        await setGroupRenameLoading(true)

        try {
            let url = '/api/chat/group/rename'
            let config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
            let req = {
                chatId: selectedChat._id,
                chatName
            }
            const { data } = await Axios.put(url, req, config)
            await toggleFetchAgain()
            await setSelectedChat(data)
        } catch (error) {
            await toast({
                title: 'Error occured!!!',
                description: `${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        await setGroupRenameLoading(false)
    }

    let groupChat = {

        user: {
            id: 'user',
            label: 'User',
            placeHolder: "Search user and Add..",
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
            let usrlist = selectedChat.users
            let tempdata = data.filter(obj => !usrlist.some(obj2 => obj2._id === obj._id)) || []
            await setSearchResult(tempdata)

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

    return <>
        {
            children
                ?
                <span onClick={onOpen} >{children}</span>
                :
                <IconButton display={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
        }
        <Modal size={'md'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent overflowY={'auto'} p={'3px'} h={'60%'} bg={'gray.100'}>
                <ModalBody h={'100%'} p={4} >
                    <Box display={'block'} h={'100%'} alignItems={'center'} >
                        <Box display={'flex'} mb={3} justifyContent={'center'}>
                            {/* <Image src={user.profile} textAlign={'center'} boxSize={'200px'} border={'2px solid white'} p={0} borderRadius={'full'} shadow={'3px 3px 7px black'} /> */}
                        </Box>
                        <div>
                            <VStack >
                                <CustomInputGroup value={chatName} onClick={renameGroup} loading={groupRenameLoading} handleChange={setChatName} field={chatObj.chatName} />

                                <CustomInuputWithForm field={groupChat.user} handleChange={handleSearch} value={search} />
                                <div style={{ width: '100%' }}>
                                    {
                                        loading
                                            ?
                                            <Text color={'teal.600'} textAlign={'center'}  >Loading...</Text>
                                            :
                                            searchResult?.length > 0
                                                ?
                                                searchResult?.map(user => {
                                                    return <SingleSearchUserUI handleClick={(e) => handleAddDeleteUser(user, 'add')} key={user._id} user={user} />
                                                })
                                                :
                                                <Box bg={'white'} p={2} borderRadius={'7px'} >
                                                    <Text color={'teal.600'} textAlign={'center'}  >No User Exist</Text>
                                                </Box>
                                    }
                                </div>
                                <Divider my={4} borderColor="gray.300" />
                                <Box
                                    bg={'gray.200'}
                                    w={'100%'}
                                    borderRadius={'7px'}
                                    p={1}
                                >
                                    <Text ml={2} color={'gray.500'} fontSize={'12px'} >{`Members (${selectedChat?.users?.length})`}</Text>
                                    {
                                        selectedChat?.users?.map(usr => {
                                            return <Box
                                                key={usr._id}
                                                bg={'white'}
                                                my={2}
                                                mx={1}
                                                px={3}
                                                py={2}
                                                borderRadius={'7px'}
                                                display={'flex'}
                                                alignItems={'center'}
                                                justifyContent={'space-between'}
                                            >
                                                <Text casing={'capitalize'} color={'teal.500'}>
                                                    {usr.name}
                                                </Text>
                                                {
                                                    usr._id === user._id ?
                                                        <></>
                                                        :
                                                        <ConfirmationModal loading={addRemoveUserLoading?.remove} handleSubmit={handleAddDeleteUser} id={usr._id} desc={'Are you sure you want remove the person...'}  >
                                                            <DeleteIcon
                                                                bg={'red.500'}
                                                                borderRadius={'full'}
                                                                color={'white'}
                                                                p={1}
                                                                w={'25px'}
                                                                h={'25px'}
                                                                cursor={'pointer'}
                                                                _hover={{
                                                                    m: '1px',
                                                                    bg: 'red.600'
                                                                }}
                                                                // onClick={() => handleAddDeleteUser(usr._id)}
                                                                pl={1} />
                                                        </ConfirmationModal>
                                                }
                                            </Box>
                                        })
                                    }
                                </Box>
                                <Box
                                    display={'flex'}
                                    justifyContent={'end'}
                                    p={3}
                                    w={'100%'}
                                >
                                    <ConfirmationModal handleSubmit={handleAddDeleteUser} id={user._id} desc={'Are you sure you want leave group!!!'}>

                                        <Button _hover={{ bg: 'red.600', m: '1px' }} color={"white"} bg={'red.600'} p={2} >Leave Group</Button>
                                    </ConfirmationModal>
                                </Box>
                            </VStack>
                        </div>
                    </Box>
                </ModalBody>

            </ModalContent>
        </Modal>
    </>
}

export default GroupChatProfileModal;
