import React, {Component} from 'react'
import styles from '../board.module.css'

export default class start extends Component{

    render(){
        return(
            <div className={this.props.didStart ? styles.tile : styles.start}>
                Start
            </div>
        )
    }
}