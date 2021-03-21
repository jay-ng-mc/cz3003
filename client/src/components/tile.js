import React, {Component} from 'react'
import styles from '../board/board.module.css'
import Character from './Character'

export default class tile extends Component {

    state = {
        Redtile:[2,5]
    }

    handleClick = () => {
        this.props.move(this.props.number)
    }

    render(){
        return(
            <div 
                onClick={this.props.move ? this.handleClick : null} 
                className={this.props.move ? styles.green : 
                this.state.Redtile.includes(this.props.number) ? styles.redTile: styles.tile}
            >
                {this.props.number}
            </div>
        )
    }
}