import React from "react"
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading, Link, FormControl, FormLabel, Input, Stack, Checkbox, Button} from "@chakra-ui/react"

const Login = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <LoginPage />
        </ThemeProvider>
    );
}

const LoginPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <LoginHeader />
                    <LoginForm />
                </Box>
            </Box>
        </Flex>
    );
}

const LoginHeader = () => {
    return (
        <Box textAlign='center'>
            <Heading>Sausage</Heading>
            <Heading>Party</Heading>

        </Box>
    )
}

const LoginForm = () => {
    return (
        <Box my={8} textAlign='left'>
            <form>
                <FormControl>
                    <FormLabel>Login ID</FormLabel>
                    <Input type='email' placeholder='Enter your login ID' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' placeholder='Enter your password' />
                </FormControl>

                <Stack isInline justifyContent='space-between' mt={4}>
                    <Box>
                        <Checkbox>Remember me?</Checkbox>
                    </Box>

                    <Box>
                        <Link>Forgot your password?</Link>
                    </Box>
                </Stack>

                <Button width='full' mt={5}>Login</Button>
                <Button width='full' mt={10}>Register</Button>
            </form>
        </Box>
    )
}

export default Login