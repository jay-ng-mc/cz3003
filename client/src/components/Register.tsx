import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading, FormControl, FormLabel, Input, Button} from "@chakra-ui/react";
import { Form } from "formik";

const Register = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <RegisterPage />
        </ThemeProvider>
    );
}

const RegisterPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <RegisterHeader />
                    <RegisterForm />
                </Box>
            </Box>
        </Flex>
    );
}

const RegisterHeader = () => {
    return (
        <Box textAlign='center'>
            <Heading>Sausage</Heading>
            <Heading>Party</Heading>
            <Heading>Account Registration</Heading>
        </Box>
    )
}

const RegisterForm = () => {
    return (
        <Box my={8} textAlign='left'>
            <Form>
                <FormControl>
                    <FormLabel>Enter E-mail:</FormLabel>
                    <Input type='email' placeholder='Enter your email' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Enter Username:</FormLabel>
                    <Input type='text' placeholder='Enter your username' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Enter Password:</FormLabel>
                    <Input type='password' placeholder='Enter your password' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Confirm password:</FormLabel>
                    <Input type='password' placeholder='Confirm your password' />
                </FormControl>

                <Button width='full' mt={10}>Confirm</Button>
            </Form>
        </Box>
    )
}

export default Register