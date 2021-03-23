import React, {Component} from 'react'
import Board from './board'

export default class Character extends Component {
    
    props = {
        playerCoins: this.props.playerCoins,
    };

    increaseCoins = () => {
        this.props.increaseCoins()
    }

    render(){
        console.log(this.props);
        return(
            <div>
                <span>Player 1 coins: {this.props.playerCoins}</span>
                <button
                onClick={this.increaseCoins}
                className="btn btn-secondary btn-sm"
                >
                    Test
                </button>
            </div>
        )
    }
}