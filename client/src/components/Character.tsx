import React, {Component} from 'react'
import {Box} from "@chakra-ui/react";


export default class Character extends Component {

    
    render(){
        return(
            <div>
                <Box color="black" bg="green.300" px={4} fontSize="30px"> 
                    <b> Player  {this.props.character.characterId} </b>    
                </Box>
                <Box bg ="yellow" fontSize="25px" px={4}>
                     Coins: {this.props.character.playerCoins}  
                </Box>         
                
                <br></br>
                <Box as="button" style={ButtonStyle}  px={4} mr="10px"
                onClick={() => this.props.decreaseCoins(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    Decrease
                </Box>
                <Box as="button" style={ButtonStyle} px={4} mr="10px"
                onClick={() => this.props.increaseCoins(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    Increase
                </Box>
                <Box as="button" style={ButtonStyle} px={4} mr="10px"
                onClick={() => this.props.nextTurn(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    nextTurn
                </Box>
            </div>
        );
    }
}

const ButtonStyle = {
    backgroundColor: "tomato",
    color: "yellow",
    borderRadius: "10px",
    fontSize:"20px"
}