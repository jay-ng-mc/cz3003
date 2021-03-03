import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading, IconButton, Link, FormControl, FormLabel, Input, Stack, Checkbox, Button} from "@chakra-ui/react";

export const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <HomePage />
        </ThemeProvider>
    );
}

const HomePage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='300px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <CharacterIcon />
                    <Header />
                    <HomeBox />
                </Box>
            </Box>
        </Flex>
    );
}

const CharacterIcon = () => {
    return (
        <Box my={3} textAlign='right'>
        <IconButton 
        aria-label="Change Character"
        isRound={true} 
        size='lg'/>
        </Box>
    )
}

const Header = () => {
    return (
        <Box textAlign='center'>
            <Heading>Sausage</Heading>
            <Heading>Party</Heading>

        </Box>
    )
}

const HomeBox = () => {
    return (
        <Box my={5} textAlign='left'>
            <form>
                <Button width='full' mt={5}>New Game</Button>
            </form>
        </Box>
    )
}