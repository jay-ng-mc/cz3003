import React, {Component} from 'react'
import styles from '../board.module.css'

export default class SausageTile extends Component {

    handleClick = () => {
        this.props.move(this.props.number)
    }

    render(){
        return(
            <div 
                onClick={this.props.move ? this.handleClick : null} 
                className={this.props.move ? styles.green : styles.sausageTile}
            >
                {this.props.number}
            </div>
        )
    }
}