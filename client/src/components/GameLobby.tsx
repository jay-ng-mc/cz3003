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

let imageList = ["icons\\1.png","icons\\2.png","icons\\3.png","icons\\4.png","icons\\5.png", "icons\\6.png", "icons\\7.png", "icons\\8.png"]

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
                <Box p={4}>
                    <Box display="flex" flex-flexDirection="column">
                        <BackIcon />
                        <Header/>
                    </Box>
                    <Box>
                        <GameLobbyContent updateState={props.updateState} nextView={props.nextView} userName={userName} imageId={savedImageIdx}/>
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

const DispUsers = (props) => {
    const ImageId = (userName) => {
        var curImageId
        var [{data}] = useGetCharacterQuery({
            variables: {username: userName}
          });
          if (data?.getCharacter) {
                curImageId = data.getCharacter.characterId
          } else {
                curImageId = 1
          }
        return (
                curImageId
        );
    }

    var output = null

    if (props.num < props.userList.length){
        output = <Box w="100%" h="200" bg="gray.200" textAlign='right'>        
            <IconButton isDisabled={props.removeUser == null} aria-label="Delete Character" isRound={true} icon={<CloseIcon />} onClick={() => props.removeUser(props.num)}  size='md'/>&#8239;
            <Center><Image borderRadius="full" boxSize="30px" src={imageList[ImageId(props.userList[props.num])]} alt="Avatar" img id="Avatar" /></Center>
            <Center>{props.userList[props.num]}</Center>
        </Box>
    }
    else if (props.num == props.userList.length){
        output = 
        <Box w="100%" h="200" bg="gray.50" >
        <Center h="100px">
        <Popup addUser={props.addUser}/>
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

class GameLobbyContent extends React.Component<{userName, imageId}>{
    constructor(props){
        super(props)
        this.state = {
            users: [] // init with logged in user
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
    
    componentDidUpdate(){
        if (this.props.userName && this.state.users.indexOf(this.props.userName) == -1) {
            this.addUser(this.props.userName)
        }
    }

    render(){
        return(
            <Box my={5} textAlign='left'>
                <div>
                    <Grid templateColumns="repeat(4, 1fr)" gap={1}>
                        {/* <Box w="100%" h="200" bg="gray.200" textAlign='center'>        
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Center><br/><br/><Image borderRadius="full" boxSize="30px" src={imageList[this.props.imageId]} alt="Avatar" img id="Avatar" /></Center>
                            {this.props.userName}
                        </Box> */}
                        < DispUsers num={0} userList={this.state.users} addUser={this.addUser} removeUser={null}/>
                        < DispUsers num={1} userList={this.state.users} addUser={this.addUser} removeUser={this.removeUser} />
                        < DispUsers num={2} userList={this.state.users} addUser={this.addUser} removeUser={this.removeUser} />
                        < DispUsers num={3} userList={this.state.users} addUser={this.addUser} removeUser={this.removeUser} />
                        
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