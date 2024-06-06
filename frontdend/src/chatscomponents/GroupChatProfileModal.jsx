import { Box, IconButton, Modal, ModalBody, ModalContent, ModalOverlay, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomInuputWithForm from "../components/common/CustomInuputWithOutForm";
import { authUser } from "../components/Auth/auth";
import CustomInputGroup from "../components/common/CustomInputGroup";
import  Axios  from "axios";

const GroupChatProfileModal = ({ children, fetchAgain, setFetchAgain }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [chatName, setChatName] = useState("");
    const { user, selectedChat, setSelectedChat } = authUser()
    const [groupRenameLoading, setGroupRenameLoading] = useState(false);
    const toast = useToast()
    // console.log("selectedChat", selectedChat.chatName);
   
    

    let chatObj={
        chatName:{
            id: 'chatName',
            label: 'Group Name',
            isrequired: true,
            type: 'text',
            disabled: false
        }
    }
    
    useEffect(()=>{
        console.log("usefe......", selectedChat.chatName);
        setChatName(selectedChat.chatName)
        return()=>{
            setChatName('')

        }
    }, [selectedChat])

    const renameGroup=async()=>{
       await setGroupRenameLoading(true)
       
        try {
            let url ='/api/chat/group/rename'
            let config ={
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            }
            let req={
                chatId:selectedChat._id,
                chatName
            }
            const { data } = await Axios.put(url,req ,config)
           await setFetchAgain(!fetchAgain)
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
            <ModalContent p={'3px'} h={'60%'} bg={'gray.100'}>
                <ModalBody h={'100%'} p={4} >
                    <Box display={'block'} h={'100%'} alignItems={'center'} >
                        <Box display={'flex'} mb={3} justifyContent={'center'}>
                            {/* <Image src={user.profile} textAlign={'center'} boxSize={'200px'} border={'2px solid white'} p={0} borderRadius={'full'} shadow={'3px 3px 7px black'} /> */}
                        </Box>
                        <div>

                            <VStack>
                                <CustomInputGroup value={chatName} onClick={renameGroup} loading={groupRenameLoading} handleChange={setChatName} field={chatObj.chatName} />
~                            </VStack>
                        </div>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>;
};

export default GroupChatProfileModal;
