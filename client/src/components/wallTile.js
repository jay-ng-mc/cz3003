import React, {Component} from 'react'
import styles from '../board/board.module.css'

export default class WallTile extends Component {

    render(){
        return(
            <div 
                onClick={this.props.move ? this.handleClick : null} 
                className={styles.wallTile}
            >
                {this.props.number}
            </div>
        )
    }
}