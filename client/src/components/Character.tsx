import React, {Component} from 'react'


export default class Character extends Component {

    
    render(){
        return(
            <div>
                <span>Player {this.props.character.characterId} coins: {this.props.character.playerCoins}</span>
                <button
                onClick={() => this.props.decreaseCoins(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    Decrease
                </button>
                <button
                onClick={() => this.props.increaseCoins(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    Increase
                </button>
            </div>
        );
    }
}