import React, {Component} from 'react'
import styles from '../board.module.css'
import ShopController from '../../ShopController'

export default class shopTile extends Component {

    handleClick = () => {
        this.props.move(this.props.number)
    }

    tileDiv = () => (
        <div 
            onClick={this.props.move ? this.handleClick : null} 
            className={this.props.move ? styles.shopTileSelected : styles.shopTile}
        >
            {this.props.number}
        </div>
    )

    render(){
        return(
            <ShopController hostDiv={this.tileDiv} enable={true} handleClick={this.handleClick}
            increaseMustard={this.props.increaseMustard} increaseKetchup={this.props.increaseKetchup}/>
        )
    }
}