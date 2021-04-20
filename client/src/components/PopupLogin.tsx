import React, { useState, useRef } from 'react'
import Popup from 'reactjs-popup';
import { Box } from '@chakra-ui/react';
import Sublogin from './Sublogin';

const PopupLogin = (props) => {
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
                    <Sublogin closePopup={closeTooltip}/>
                </Popup>
            </Box>
        )
    } else {
        return(
            props.hostDiv
        )
    }
}

export default PopupLogin