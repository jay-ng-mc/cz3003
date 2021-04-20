import React, { useState, useRef } from 'react'
import Popup from 'reactjs-popup';
import Shop from './Shop'
import { Box } from '@chakra-ui/react'

const ShopController = (props) => {
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
                    <Shop closePopup={closeTooltip} increaseMustard={props.increaseMustard} 
                    increaseKetchup={props.increaseKetchup}/>
                </Popup>
            </Box>
        )
    } else {
        return(
            props.hostDiv
        )
    }
}

export default ShopController
