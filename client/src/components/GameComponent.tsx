import NextLink from "next/link";
import React from "react";
import BoardFunction from "./board/BoardComponent";
import GameLobby from "./GameLobby";
import PlayerResult from "./CurrentResults";

class GameComponent extends React.Component {
    constructor(props) {
        super(props)
        this.updateState = this.updateState.bind(this)
        this.nextView = this.nextView.bind(this)
    }

    state = {
        view: 'lobby',
        users: [],
        results:[]
    }

    updateState(stateFragment){
        this.setState({
            ...this.state,
            ...stateFragment
        })
    }

    nextView(){
        if (this.state.view == 'lobby'){
            this.setState({view: 'board'})
        } else if (this.state.view == 'board'){
            this.setState({view: 'result'})
        } else if (this.state.view == 'result') {
            this.setState({view: 'result'})
        } else {
            throw('Game next view out of bounds, check states in GameComponent')
        }
    }

    render() {
        if (this.state.view == 'lobby'){
            return(<GameLobby updateState={this.updateState} nextView={this.nextView}/>)
        } else if (this.state.view == 'board'){
            return(<BoardFunction gameState={this.state} updateState={this.updateState} nextView={this.nextView}/>)
        } else if (this.state.view == 'result') {
            return(<PlayerResult gameState={this.state}/>)
        } else {
            throw('Game view out of bounds, check states in GameComponent')
        }
    }
}

export default GameComponent