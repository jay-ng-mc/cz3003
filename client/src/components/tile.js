import React, {Component} from 'react'

export default class Tile extends Component {

    handleClick = () => {
        this.props.move(this.props.number)
    }

    render(){
        return(
            <div 
                onClick={this.props.move ? this.handleClick : null} 
                className={this.props.move ? "selectable" : "tile"}
            >
                {this.props.number}
            </div>
        )
    }
}