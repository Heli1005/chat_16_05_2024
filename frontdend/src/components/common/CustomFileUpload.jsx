import { Box, Button, FormControl, HStack, Image, Input, Text, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import Axios from "axios";
import { Field } from 'formik';
import CustomToolTip from "./CustomToolTip";

const CustomFileUpload = ({ field, setFieldValue, setsignupLoading }) => <Field component={FormField} field={field} setProfile={setFieldValue} setsignupLoading={setsignupLoading} />

export default CustomFileUpload;

const FormField = ({ field, form, setProfile, setsignupLoading }) => {

    const toast = useToast()

    const inputRef = useRef(null);
    const { touched, errors, handleBlur, values } = form
    let isError = (errors && errors[field.id] && touched[field.id])
    let errorBorder = isError ? `red.500` : `teal.500`

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    const handleRemoveImage = async () => {
        await setProfile('signupLoading', true);
        await handleDeleteUploadedImage()
        await setProfile(field.id, '');
        await setProfile('imageId', '');
        await setProfile('signupLoading', false);


    }

    const handleFileChange = async (event, setProfileObj) => {
        await setProfile('signupLoading', true);

        const file = event.target.files[0];
        if (file) {
            let uploadedImageObj = await handleUpload(file) || null

            if (uploadedImageObj) {
                setProfileObj(field.id, uploadedImageObj.secure_url);// URL.createObjectURL(file)
                setProfileObj('imageId', uploadedImageObj.public_id);// URL.createObjectURL(file)
            } else {
                toast({
                    title: `'Something went wrong please try after some time'`,
                    description: "We've created your account for you.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: 'Select proper image',
                description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        await setProfile('signupLoading', false);
    };

    const handleUpload = async (image) => {

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await Axios.post('/api/uploadimage', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data.result
        } catch (error) {
            toast({
                title: `Error uploading image: ${error}`,
                description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return null
        }
    };

    const handleDeleteUploadedImage = async () => {
        try {
            const response = await Axios.delete(`/api/uploadimage/delete`, {
                data: { public_id: values['imageId'] }
            });
            toast({
                title: `${response.data.message}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            return null
        } catch (error) {
            toast({
                title: `Error uploading image : ${error}`,
                description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return null
        }
    }

    return <>
        <FormControl>
            {
                isError
                    ?
                    <Text color="red.600">{errors[field.id]}</Text>
                    :
                    <></>
            }
            <Input
                id={field.id}
                accept={field.accept}
                onChange={(event) => handleFileChange(event, setProfile)}
                type={field.type || 'text'}
                bg={'white'}
                h={'46px'}
                ref={inputRef}
                display={'none'}
                shadow={'3px 3px 7px gray'}
                name={field.id}
                onBlur={handleBlur}
                my={2}
                borderColor={errorBorder}
                focusBorderColor={errorBorder}
                placeholder={`Enter ${field.label}`}
            />

            <Button bg={'white'} variant='outline' shadow={'3px 3px 7px gray'} borderColor={errorBorder} size="xl" w={'100%'} pl={1} py={1} pr={1} onClick={handleButtonClick}>
                <HStack w={'100%'} d={'flex'} justifyContent={'space-between'}  >
                    <Text fontSize="lg" bg={'teal.600'} color={'white'} fontWeight={'400'} mx={0} px={4} py={4} borderRadius={5}>
                        {` Upload ${field.label}`}
                    </Text>
                    {
                        (values[field.id]) &&
                            field.allow === 'image'
                            ?
                            (
                                <Box position="relative" display="inline-block" >
                                    <Image
                                        src={values[field.id]}
                                        alt={values[field.id]}
                                        maxH="55px"
                                        mx="auto"
                                        borderRadius="md"
                                        onClick={e => {
                                            e.stopPropagation()
                                        }}
                                    />
                                    <CustomToolTip title={`Remove ${field.label}`}  >
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
                            <Text fontSize="lg" color="teal.500">
                                {values[field.id]}
                            </Text>
                    }
                </HStack>
            </Button>
        </FormControl>
    </>
}