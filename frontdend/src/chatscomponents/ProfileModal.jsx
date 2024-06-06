import { Box, Button, Icon, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import React from "react";
import CustomInput from "../components/common/CustomInput";
import { Form, Formik } from "formik";

const ProfileModal = ({ user, children }) => {
    

    let initialState = {
        name: user.name || 'ok',
        email: user.email || '',
        loading: false
    }
    const { isOpen, onOpen, onClose } = useDisclosure()

    let profileObj = {
        name: {
            id: 'name',
            label: 'Name',
            isrequired: true,
            type: 'text',
            disabled: true
        },
        email: {
            id: 'email',
            label: 'Email',
            isrequired: true,
            type: 'text',
            disabled: true
        },
        password: {
            id: 'password',
            label: 'Password',
            isrequired: true,
            type: 'password',
            disabled: true
        },
        confirmPassword: {
            id: 'confirmPassword',
            label: 'Confirm Password',
            isrequired: true,
            type: 'password',
            disabled: true
        }
    }

    const handleRegister = () => {

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
                            <Image src={user.profile} textAlign={'center'} boxSize={'200px'} border={'2px solid white'} p={0} borderRadius={'full'} shadow={'3px 3px 7px black'} />
                        </Box>
                        <div>
                            <Formik
                                initialValues={initialState}
                                onSubmit={(values, actions) => {
                                    let tempObj = { ...values }
                                    handleRegister(tempObj)
                                }}
                            >
                                {
                                    ({ values }) => (

                                        <Form>
                                            <VStack>
                                                <CustomInput field={profileObj.name} />
                                                <CustomInput field={profileObj.email} />
                                            </VStack>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </Box>
                </ModalBody> 
            </ModalContent>
        </Modal>
    </>;
};

export default ProfileModal;
