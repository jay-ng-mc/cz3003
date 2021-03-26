import React, {Component} from 'react'
import styles from '../components/board/board.module.css'

export default class tile extends Component {

    handleClick = () => {
        this.props.move(this.props.number)
    }

    render(){
        return(
            <div 
                onClick={this.props.move ? this.handleClick : null} 
                className={this.props.move ? styles.green : styles.redTile}
            >
                {this.props.number}
            </div>
        )
    }
}