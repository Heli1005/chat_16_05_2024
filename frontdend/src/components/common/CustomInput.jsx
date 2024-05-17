import { FormControl, FormLabel, Input ,Text} from "@chakra-ui/react";
import React from "react";
import {  Field } from 'formik';

const CustomInput = ({ field }) => <Field component={FormField} field={field} />

export default CustomInput;

const FormField = ({ field, form }) => {
    
    const { handleChange, touched, errors, handleBlur } = form
    let isError = (errors && errors[field.id] && touched[field.id]) 
    let errorBorder = isError ? `red.500` : `teal.500`

    return <FormControl>
        {/* <FormLabel mb={0} >{field.label}</FormLabel> */}
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
            type={field.type||'text'}
            bg={'white'}
            h={'46px'}
            shadow={'3px 3px 7px gray'}
            name={field.id}
            onChange={handleChange}
            onBlur={handleBlur}
            my={2}
            borderColor={errorBorder}
            focusBorderColor={errorBorder}
            placeholder={`Enter ${field.label}`}
        />
    </FormControl>
}