import React, {Component} from 'react'
import styles from '../board.module.css'

export default class shopTile extends Component {

    handleClick = () => {
        this.props.move(this.props.number)
    }

    render(){
        return(
            <div 
                onClick={this.props.move ? this.handleClick : null} 
                className={this.props.move ? styles.shopTileSelected : styles.shopTile}
            >
                {this.props.number}
            </div>
        )
    }
}