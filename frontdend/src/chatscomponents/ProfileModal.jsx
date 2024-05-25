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
        <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={'3px'} bg={'gray.100'}>
                <ModalHeader borderRadius={'7px'} display={'flex'} alignItems={'center'} fontWeight={'700'} bg={'teal'} color={"white"} p={4} justifyContent={'center'} fontSize={'larger'} >
                    <Text >My Profile</Text>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <Box display={'flex'} gap={'5px'} justifyContent={'space-between'}>

                        <Image borderr src={user.profile} boxSize={'200px'} border={'2px solid white'} p={0} borderRadius={'full'} shadow={'3px 3px 7px black'} />
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

                <ModalFooter my={3} >
                    {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button> */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>;
};

export default ProfileModal;
