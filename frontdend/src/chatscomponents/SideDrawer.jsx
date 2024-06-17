import { Button, } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useMemo, useState } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { authUser } from "../components/Auth/auth";
import ProfileModal from "./ProfileModal";
import ChatListLoading from "./ChatListLoading";
import Axios from "axios";
import SearchedChatList from "./SearchedChatList";
import { getUserName } from "../config/ChatLogic";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";



const SideDrawer = (props) => {

    const toast = useToast()
    const { user, handleLogOut, notificationList, setNotificationList, setSelectedChat } = authUser()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchlist, setSearchlist] = useState([]);

    const finalChatList = useMemo(() => searchlist, [searchlist])

    const handleSearch = async () => {

        setLoading(true)
        try {
            let url = 'api/user'
            let username = search ? `?search=${search}` : ''
            let config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            if (search) {
                const { data } = await Axios.get(`${url}${username}`, config)
                setSearchlist(data)
            }
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
        <Box
            display="flex"
            alignItems={"center"}
            bg={'white'}
            justifyContent={'space-between'}
            p={"5px 10px "}
            borderWidth={"5px"}
            w={"100%"}
        >
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}  >
                    <i className="fas fa-search"></i>
                    <Text display={{ base: "none", md: "flex" }} px={4}>
                        Search User
                    </Text>
                </Button>
            </Tooltip>
            <Text fontWeight={'900'} color={'teal.600'} casing={'uppercase'} letterSpacing={'5px'} fontSize={'2xl'}>Chit Chat</Text>
            <div>
                <Menu >
                    <MenuButton mx={3}>
                        <NotificationBadge
                            count={notificationList?.length}
                            effect={Effect.SCALE}
                        />
                        <BellIcon color={'teal.600'} fontSize={'2xl'} mr={2} />
                    </MenuButton>
                    <MenuList px={2}>
                        {
                            notificationList?.length ?
                                notificationList?.map(notification => {
                                    return <MenuItem key={notification._id}
                                        onClick={() => {
                                            let temp = notificationList.filter(obj => obj._id !== notification._id)
                                            setNotificationList(temp)
                                            setSelectedChat(notification.chat)
                                        }}
                                    >
                                        {
                                            notification.chat?.isGroupChat
                                                ?
                                                `New message in ${notification.chat?.chatName}`
                                                :
                                                `New message from ${getUserName(notification.chat?.users)}`
                                        }
                                    </MenuItem>
                                })
                                :
                                <MenuItem  >No new message...</MenuItem>
                        }
                    </MenuList>
                </Menu>
                <Menu >
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
                        <Avatar size={'sm'} cursor={"pointer"} name={user.name} src={user.profile} />
                    </MenuButton>
                    <MenuList >
                        <ProfileModal user={user}>
                            <MenuItem>My profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider color={'teal.600'} />
                        <MenuItem onClick={() => handleLogOut()}>Log Out</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton color={'white'} mt={2} fontWeight={'900'} />
                <DrawerHeader bg={'teal.500'} color={'white'} p={3} m={1}>Search Users</DrawerHeader>
                <DrawerBody w={'100%'} px={2} >
                    <Box display={'flex'} gap={2} justifyContent={'space-between'}>
                        <Input focusBorderColor={'teal.500'} onChange={(e) => setSearch(e.target.value)} borderWidth={'0.5px'} placeholder='Search here...' />
                        <Tooltip hasArrow bg={'teal'} px={2} py={2} borderRadius={7} label={`${!search ? 'Enter something in input to search' : 'Search'}`}>
                            <Button variant={'solid'} isDisabled={!search} colorScheme={'teal'} onClick={() => handleSearch()}>Go</Button>
                        </Tooltip>
                    </Box>
                    {
                        loading
                            ?
                            <ChatListLoading />
                            :
                            finalChatList?.length > 0
                                ?
                                <SearchedChatList userList={finalChatList} onClose={onClose} />
                                :
                                <Box mt={8} textAlign={'center'} >
                                    <Text color={'teal.600'} fontSize={'xl'} fontWeight={'600'}>No chat found...</Text>
                                </Box>
                    }
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>;
};

export default SideDrawer;
