import {ThemeProvider, theme, CSSReset, Flex, Box, IconButton, Center, Button, Image, Grid, Text } from "@chakra-ui/react";
import { SettingsIcon, CloseIcon, AddIcon, ArrowBackIcon } from '@chakra-ui/icons'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react"
import NextLink from "next/link";
import React from "react";

let imageList = ["images\\p0.png","images\\p1.png","images\\p2.png","images\\p3.png","images\\p4.png","images\\p5.png"]
var savedImageId = 1 //can pass in from DB
var savedImageId2 = 2 //can pass in from DB

const GameLobby = (props) => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CSSReset />
                <GameLobbyBox updateState={props.updateState} nextView={props.nextView} />
            </ThemeProvider> 
        </div>
    );
}

const GameLobbyBox = (props) => {
    return (
        <Flex minHeight='80vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} h="auto" w="60vw" borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4} display="flex" flex-flexDirection="row">
                    <Box flex='1' display="flex" flex-flexDirection="column">
                        <BackIcon />
                        <Header/>
                    </Box>
                    <Box flex='3'>
                        <GameLobbyContent updateState={props.updateState} nextView={props.nextView}/>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

const BackIcon = () => {
    return (
        <Box my={3} textAlign='left'>
        <IconButton 
        aria-label="Home"
        isRound={true} 
        icon={<ArrowBackIcon />}
        size='lg'/>
        </Box>
    )
}

const Header = () => {
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

function users(num : Number){
    let userCount: number = 3; //import from DB
    if (num <= userCount){
        var output = <Box w="100%" h="200" bg="gray.200" textAlign='center'>        
            <IconButton aria-label="Delete Character" isRound={true} icon={<CloseIcon />} size='md'/>&#8239;
            <IconButton aria-label="Change Character" isRound={true} icon={<SettingsIcon />} size='md'/>
            <Center><Image borderRadius="full" boxSize="30px" src={imageList[savedImageId2]} alt="Avatar" img id="Avatar" /></Center>
            <Text fontSize="md">IGN</Text>
            <Text fontSize="md">Username</Text>
        </Box>
    }
    else if (num == userCount + 1){
        var output = <Box w="100%" h="200" bg="gray.50" ><Center h="100px"><IconButton aria-label="New Character" isRound={true} icon={<AddIcon />} size='lg'/></Center></Box>   
    }
    else{}
    return output;
}

function GameLobbyContent(props){
    return(
        <Box my={5} textAlign='left'>
            <div>
                <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                    <Box w="100%" h="200" bg="gray.200" textAlign='center'>        
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <IconButton aria-label="Change Character" isRound={true} icon={<SettingsIcon />} size='md'/>
                        <Center><Image borderRadius="full" boxSize="30px" src={imageList[savedImageId]} alt="Avatar" img id="Avatar" /></Center>
                        <Text fontSize="md">IGN</Text>
                        <Text fontSize="md">Username</Text>
                    </Box>
                    { users(2) }
                    { users(3) }
                    { users(4) }
                </Grid>
                <Button onClick={() => {
                    props.updateState({users: ['test', 'test2']}) //add your user list here: users: userlist
                    props.nextView()
                }} width='full' mt={5}>New Game</Button>
            </div>
        </Box>
    ) 
}


export default GameLobby