import {ThemeProvider, theme, CSSReset, Flex, Box, IconButton, Center, Button, Image, Grid, Text } from "@chakra-ui/react";
import { CloseIcon, AddIcon, ArrowBackIcon } from '@chakra-ui/icons'
import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react"
import NextLink from "next/link";
import React, { Component }  from "react";
import Modal from 'react-awesome-modal';
import Sublogin from './Sublogin';
import { useMeQuery, useGetCharacterQuery } from "../generated/graphql";

let imageList = ["images\\p0.png","images\\p1.png","images\\p2.png","images\\p3.png","images\\p4.png","images\\p5.png"]
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
        const isServer = () => typeof window ==="undefined";
        const getMe = () => {
          const [{data, fetching}] = useMeQuery({
            pause: isServer(),
          });
          return data
        }
        var meData = getMe()
        var userName
        if (meData) {
          userName = meData.me.username
        }
        var savedImageIdx = 1
        var [{data}] = useGetCharacterQuery({
            variables: {username: userName}
          });
          if (data?.getCharacter) {
            savedImageIdx = data.getCharacter.characterId
          } else {
              savedImageIdx = 1
          }
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
                        <GameLobbyContent updateState={props.updateState} nextView={props.nextView} username={userName} imageId={savedImageIdx}/>
                    </Box>
                </Box>
            </Box>
        </Flex>
    );
}

const BackIcon = () => {
    return (
        <Box my={3} textAlign='left'>
        <NextLink href={"/"}>
        <IconButton 
        aria-label="Home"
        isRound={true} 
        icon={<ArrowBackIcon />}
        size='lg'/>
        </NextLink>
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

/*var [{data}] = useGetCharacterQuery({
    variables: {username: userList[num]}
  });
  if (data?.getCharacter) {
    savedImageId2 = data.getCharacter.characterId
  } else {
      savedImageId2 = 2
  }
*/
//not sure where to put get image list

function dispUsers(num: Number, userList : any, addUser: any, removeUser: any){
    if (num < userList.length){
        var output = <Box w="100%" h="200" bg="gray.200" textAlign='right'>        
            <IconButton aria-label="Delete Character" isRound={true} icon={<CloseIcon />} onClick={() => removeUser(num)}  size='md'/>&#8239;
            <Center><Image borderRadius="full" boxSize="30px" src={imageList[savedImageId2]} alt="Avatar" img id="Avatar" /></Center>
            <Center>{userList[num]}</Center>
        </Box>
    }
    else if (num == userList.length){
        var output = 
        <Box w="100%" h="200" bg="gray.50" >
        <Center h="100px">
        <Popup addUser={addUser}/>
        </Center>
    </Box>   
    }
    else{}
    return output;
}

class Popup extends Component<{addUser}> {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <Box>
                <br/><br/><br/><IconButton onClick={() => this.openModal()} aria-label="New Character" isRound={true} icon={<AddIcon />} size='lg'/>   
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    
                        <Box borderWidth={1} px={4} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                        <Sublogin addUser={this.props.addUser} closeModal={() => this.closeModal()}/>
                        <Button href="javascript:void(0);" onClick={() => this.closeModal()}>Close</Button>
                        </Box>
                   
                </Modal>
            </Box>
        );
    }
}

class GameLobbyContent extends React.Component<{username, imageId}>{
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this)
        this.removeUser = this.removeUser.bind(this)
    }
    addUser(newUser){
        this.setState({
            users: [...this.state.users, newUser]
        })
        console.log(this.state)
    }
    removeUser(indexNum){
        this.setState({
            ...this.state.users.splice(indexNum,1)
        })
    } 

    render(){
        return(
            <Box my={5} textAlign='left'>
                <div>
                    <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                        <Box w="100%" h="200" bg="gray.200" textAlign='center'>        
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Center><br/><br/><Image borderRadius="full" boxSize="30px" src={imageList[this.props.imageId]} alt="Avatar" img id="Avatar" /></Center>
                            {this.props.username}
                        </Box>
                        { dispUsers(0, this.state.users, this.addUser, this.removeUser) }
                        { dispUsers(1, this.state.users, this.addUser, this.removeUser) }
                        { dispUsers(2, this.state.users, this.addUser, this.removeUser) }
                        
                    </Grid>
                    <Button onClick={() => {
                        this.props.updateState({users: this.state.users}) 
                        this.props.nextView()
                    }} width='full' mt={5}>New Game</Button>
                </div>
            </Box>
        ) 
    }
}


export default GameLobby