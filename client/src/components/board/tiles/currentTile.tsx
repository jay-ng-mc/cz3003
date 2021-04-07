import React, {Component} from 'react'
import styles from '../board.module.css'

export default class currentTile extends Component {

    render(){
        return(
            <div 
                onClick={this.props.move ? this.handleClick : null} 
                className={styles.currentTile}
            >
                {this.props.number}
            </div>
        )
    }
}