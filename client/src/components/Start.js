  
import React, {Component} from 'react'

export default class Start extends Component{

    handleClick = () => {
        this.props.startGame(this.props.number)
    }

    render(){
        return(
            <div onClick={this.props.didStart ? null : this.handleClick} className={this.props.didStart ? "tile" : "start"}>
                Start
            </div>
        )
    }
}