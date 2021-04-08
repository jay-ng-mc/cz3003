import React, { useState, useRef } from 'react'
import Popup from 'reactjs-popup';
import Questions from './Questions'
import { Box } from '@chakra-ui/react'

const PopupController = (props) => {
    // const [open, setOpen] = useState(false);
    // const closeModal = () => {
    //     setOpen(false)
    // };

    const ref = useRef();
    const closeTooltip = () => ref.current.close();
    
    if (props.enable) {
        return(
            <Box>
                <Popup
                    trigger={props.hostDiv}
                    modal
                    ref={ref}
                    closeOnDocumentClick
                    onClose={props.handleClick}
                >
                    <Questions closePopup={closeTooltip} answerQuestion={props.answerQuestion}/>
                </Popup>
            </Box>
        )
    } else {
        return(
            props.hostDiv
        )
    }
}

export default PopupController
