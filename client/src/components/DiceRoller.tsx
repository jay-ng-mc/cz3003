
import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading} from "@chakra-ui/react";
import DiceApp from "./DiceApp"

export const DiceRoller = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <HomePage />
        </ThemeProvider>
    );
}

var a = 0

const HomePage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='300px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <Header />
                    <DiceBox />
                </Box>
            </Box>
        </Flex>
    );
}


const Header = () => {
    return (
        <Box textAlign='center'>
            <Heading>Roll your dice!</Heading>            
        </Box>
    )
}

const DiceBox = () => {
    return (
        <Box my={5} textAlign='center'>
        <DiceApp />
        </Box>
    )
}


