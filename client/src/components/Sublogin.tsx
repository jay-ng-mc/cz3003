import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import React from "react";
import {Formik, Form} from "formik";
import { useLoginMutation, useSubloginMutation} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
    
const SubloginForm = () => {
    const router = useRouter();
    const [,sublogin] = useSubloginMutation();
    return (
        <Box my={8} textAlign='left'>
            <Formik
                initialValues={{ username: '', password: ''}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await sublogin({username: values.username, password: values.password});
                    console.log(response);
                    if(response.data?.sublogin.errors){
                        setErrors(toErrorMap(response.data.sublogin.errors));
                    } else if (response.data?.sublogin.user) {
                        console.log(response.data?.sublogin.user)
                        //worked
                        // call some function passed in from outside sublogin to set the user
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormControl mt={4}>
                            <FormLabel>Login ID:</FormLabel>
                            <Input 
                                type="username"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            {errors.username && touched.username && errors.username}
                        </FormControl>
                            
                        <FormControl mt={4}>
                            <FormLabel>Password:</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                        </FormControl>
                        
                        <Button width='full' type="submit" isLoading={isSubmitting} backgroundColor="teal.300" mt={10}
                        bgImage="url('/images/sausage.png')" bgPosition='center' bgSize='430px 45px'>
                            Login
                        </Button>
                        
                    </Form>
                )}
            </Formik>
        </Box>
    )

}
    
export default withUrqlClient(createUrqlClient) (SubloginForm);