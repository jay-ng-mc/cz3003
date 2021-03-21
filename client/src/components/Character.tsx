import React, {Component} from 'react'

export default class Character extends Component {
    state = {
        playerCoins: 5,
    };

    increaseCoins = () => {
        this.setState({ playerCoins: this.state.playerCoins + 1});
    }


    render(){
        console.log(this.props);
        return(
            <div>
                <span>Player 1 coins: {this.state.playerCoins}</span>
            </div>
        )
    }
}