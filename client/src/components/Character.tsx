import React, {Component} from 'react'


export default class Character extends Component {

    
    render(){
        return(
            <div>
                <span>Player {this.props.character.characterId} coins: {this.props.character.playerCoins}</span>
                <button
                onClick={() => this.props.increaseCoins(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    Test
                </button>
            </div>
        );
    }
}