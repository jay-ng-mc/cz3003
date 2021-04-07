import React from "react";
import {ThemeProvider, theme, CSSReset, Flex, Box, Heading, IconButton, Button, Image} from "@chakra-ui/react";
import { SettingsIcon } from '@chakra-ui/icons'
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

function HeaderAndBox (props) {
    //data is loading 
    // just do nothing, there's a race condition
    // if (props.fetching){
    //     return <div>Loading</div>
    // }
    // user is logged in
    if (props.me){
        return (
            <div>
                <HeaderLogin/>
                <HomeBoxLogin/>
            </div>
        )  
    // user is not logged in
    } else {
        return (
            <div>
                <Header/>
                <HomeBox/>
            </div>
        ) 
    }
}

const HomePage = () => {

    const isServer = () => typeof window ==="undefined";
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });

    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='400px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <CharacterIcon />
                    <HeaderAndBox fetching={fetching} me={data?.me}/>
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

const HomeBox = () => {
    return (
        <Box my={5} textAlign='left'>
            <NextLink href={"/login"}>
                <Button width='full' backgroundColor="teal.300" mt={5}>Login</Button>
            </NextLink>
            <NextLink href={"/register"}>
                <Button width='full' backgroundColor="teal.300" mt={5}>Register</Button>
            </NextLink>
        </Box>
    )
}

const CharacterIcon = () => {
    return (
        <Box my={3} textAlign='right'>
        <IconButton 
        aria-label="Change Character"
        isRound={true} 
        icon={<SettingsIcon />}
        size='lg'/>
        </Box>
    )
}

const HeaderLogin = () => {
    return (
        <Box textAlign='center'>
            <Image
            borderRadius="full"
            src={"images\\Title screen.png"}
            alt="Avatar"
            img id="Avatar"
            />
        </Box>
    )
}

const HomeBoxLogin = () => {
    return (
        <Box my={5} textAlign='left'>
            
            <NextLink href={"/lobby"}>
                <Button width='full' mt={5}>Start Game Lobby</Button>
            </NextLink>
        </Box>
    )
}