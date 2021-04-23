import React, {Component} from 'react'
import styles from '../board.module.css'
import PopupController from '../../PopupController'

export default class tile extends Component {

    handleClick = () => {
        this.props.move(this.props.number)
    }

    tileDiv = () => (
        <div
            onClick={this.props.move ? this.handleClick : null} 
            className={this.props.move ? styles.green : styles.blueTile}
        >
            {this.props.number}
        </div>
    )

    render(){
        if (this.props.movesLeft == 1) {
            return(
                // this.tileDiv()
                <PopupController hostDiv={this.tileDiv} enable={true} handleClick={this.handleClick} answerQuestion={this.props.answerQuestion}
                updateQuestion={this.props.updateQuestion} random={this.props.random}/>
                // <Popup trigger={this.tileDiv} modal>
                //     <Box>
                //         <Questions />
                //     </Box>
                // </Popup>
            )
        } else {
            return(
                this.tileDiv()
            )
        }
    }
}