import { theme, CSSReset, Flex, Box, Image } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import LoginForm from '../components/StudentLogin'
import { NavBar } from "../components/NavBar";


const LoginPage: React.FC<{}> = ({}) => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <NavBar />
            <LoginBox />
        </ThemeProvider>
    );
}

const LoginHeader = () => {
    return (
        <Box textAlign='center'>
            <Image borderRadius="full" src={"images\\titleScreen.png"} alt="title" id="title" />
        </Box>
    )
}

const LoginBox = () => {
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

export default LoginPage