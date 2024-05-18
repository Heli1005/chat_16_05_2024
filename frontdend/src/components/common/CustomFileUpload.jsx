

import { Box, Button, FormControl, FormLabel, HStack, IconButton, Image, Input, Text, VStack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Field } from 'formik';
import CustomToolTip from "./CustomToolTip";

const CustomFileUpload = ({ field }) => <Field component={FormField} field={field} />

export default CustomFileUpload;

const FormField = ({ field, form }) => {
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    const { handleChange, touched, errors, handleBlur } = form
    let isError = (errors && errors[field.id] && touched[field.id])
    let errorBorder = isError ? `red.500` : `teal.500`
    const handleButtonClick = () => {
        inputRef.current.click();
    };
    const handleRemoveImage = () => {
        setFileName('');
        setFileUrl('');
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileUrl(URL.createObjectURL(file));
        }
    };
    return <FormControl>
        {
            isError
                ?
                <>
                    <Text color="red.600">{errors[field.id]}</Text>
                </>
                :
                <></>
        }
        <Input
            id={field.id}
            accept={field.accept}
            onChange={handleFileChange}
            type={field.type || 'text'}
            bg={'white'}
            h={'46px'}
            ref={inputRef}
            display={'none'}
            shadow={'3px 3px 7px gray'}
            name={field.id}
            // onChange={handleChange}
            onBlur={handleBlur}
            my={2}
            borderColor={errorBorder}
            focusBorderColor={errorBorder}
            placeholder={`Enter ${field.label}`}
        />

        <Button bg={'white'} variant='outline' shadow={'3px 3px 7px gray'} borderColor={errorBorder} size="xl" w={'100%'} pl={1} py={1} pr={1} onClick={handleButtonClick}>
            <HStack w={'100%'} d={'flex'} justifyContent={'space-between'}  >
                <Text fontSize="lg" bg={'teal.500'} color={'white'} fontWeight={'400'} mx={0} px={4} py={4} borderRadius={5}>

                    Upload Profile
                </Text>
                {
                    (fileName) &&
                        field.allow === 'image'
                        ?
                        (
                            <Box position="relative" display="inline-block" >
                                <Image
                                    src={fileUrl}
                                    alt={fileName}
                                    maxH="55px"
                                    mx="auto"
                                    borderRadius="md"
                                />
                                <CustomToolTip
                                    title='Remove Profile'

                                >
                                    <Text
                                        top={"-2"}
                                        right={"-2"}
                                        position={'absolute'}
                                        fontSize={'22px'}
                                        color={'red'}
                                        bg={'whitesmoke'}
                                        borderRadius={'50%'}
                                        className="material-icons"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveImage()
                                        }}
                                    >
                                        cancel
                                    </Text>
                                </CustomToolTip>

                            </Box>
                        )
                        :
                        (
                            <Text fontSize="lg" color="teal.500">
                                {fileName}
                            </Text>
                        )
                }
            </HStack>
        </Button>
    </FormControl>
}