  
import React, {Component} from 'react'
import styles from '../board/board.module.css'

export default class start extends Component{

    handleClick = () => {
        this.props.startGame(this.props.number)
    }

    render(){
        return(
            <div
            onClick={this.props.didStart ? null : this.handleClick} 
            className={this.props.didStart ? styles.tile : styles.start}>
                Start
            </div>
        )
    }
}