import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading, IconButton, Link, FormControl, FormLabel, Input, Stack, Checkbox, Button} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

export const Home = () => {
    
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <HomePage />
        </ThemeProvider>
    );
}

const HomePage = () => {

    const isServer = () => typeof window ==="undefined";
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
    let body = null
    
    //data is loading
    if (fetching){

    // user not logged in
    } else if (!data?.me){
        body = (
            <>
                <Header/>
                <HomeBox/>
            </>
        )  
    // user is logged in
    } else {
        body = (
            <>
                <HeaderLogin/>
                <HomeBoxLogin/>
            </>
        )   
    }

    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='400px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    {/* <CharacterIcon /> */}
                    {body}
                </Box>
            </Box>
        </Flex>
    );
}

const Header = () => {
    return (
        <Box p={3} textAlign='center'>
            <Heading>Join</Heading>
            <Heading>Sausage Party</Heading>

        </Box>
    )
}

const HeaderLogin = () => {
    return (
        <Box p={3} textAlign='center'>
            <Heading>Welcome to</Heading>
            <Heading>Sausage Party</Heading>
        </Box>
    )
}

const HomeBox = () => {
    return (
        <Box my={5} textAlign='left'>
            <NextLink href={"/login"}>
                <Button width='full' backgroundColor="teal.300" mt={5}>Login</Button>
            </NextLink>
            <NextLink href={"/register"}>
                <Button width='full' backgroundColor="teal.300" mt={5}>Register</Button>
            </NextLink>
            <NextLink href={"/leaderboard"}>
                <Button width='full' backgroundColor="teal.300" mt={5}>Leaderboard</Button>
            </NextLink>
        </Box>
    )
}

const HomeBoxLogin = () => {
    return (
        <Box my={5} textAlign='left'>
            <NextLink href={"/question"}>
                <Button width='full' backgroundColor="teal.300" mt={5}>StartGame</Button>
            </NextLink>
        </Box>
    )
}