import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React from "react";

const ConfirmationModal = ({ children, desc, handleSubmit,loading ,id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleConfirm=async()=>{
        await handleSubmit(id)
        await onClose()
    }

    return <>
        {
            children
                ?
                <span onClick={onOpen} >{children}</span>
                :
                <IconButton display={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
        }
        <Modal size={'sm'} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent pb={2} p={'5px'} bg={'gray.200'}>
                <ModalBody h={'100%'} p={5} >
                    <Box display={'block'} h={'100%'} alignItems={'center'} >
                        <Box display={'flex'} mb={5} justifyContent={'center'}>
                            <Text fontSize={'20px'} casing={'capitalize'} color={'red.600'} fontWeight={'600'} px={3} textAlign={'center'}  >
                                {desc}
                            </Text>
                        </Box>
                        <Box
                            display={'flex'}
                            gap={4}
                            justifyContent={'center'}
                        >
                            <Button isLoading={loading} color={'white'} _hover={{ bg: 'teal.700', m: '1px' }} bg={'teal.500'} onClick={()=>handleConfirm()} >
                                Confirm
                            </Button>
                            <Button bg="gray.300" _hover={{ bg: 'gray.400', m: '1px' }} color={'black'} onClick={() => onClose()} >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>;
};

export default ConfirmationModal;
